import { useState, useEffect } from "react";
import axios from "axios";
import { getCookieToken } from "@utils/cookie";
import { AuthContext } from "./AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE;

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // 驗證登入狀態的邏輯
  const checkAuth = async () => {
    const token = getCookieToken();
    
    // 如果連 token 都沒有，直接判定未登入
    if (!token) {
      setIsAuth(false);
      setIsAuthLoading(false);
      return;
    }

    try {
      axios.defaults.headers.common['Authorization'] = token;
      const response = await axios.post(`${API_BASE}/api/user/check`);
      
      if (response.data.success) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    } catch (error) {
      console.error("驗證失敗:", error.response?.data);
      setIsAuth(false);
    } finally {
      // 無論成功或失敗，最後都要結束 Loading 狀態
      setIsAuthLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, isAuthLoading, setIsAuth, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
