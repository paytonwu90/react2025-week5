import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../contexts/Auth";

function ProtectedRoute() {
  const { isAuth, isAuthLoading } = useAuthContext();

  // 當還在驗證 Token 時，顯示 Loading
  if (isAuthLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // 如果驗證完成且未登入，強制導向登入頁
  // replace 屬性會取代當前的歷史紀錄，讓使用者回上一頁時不會回到原本無權限的後台頁面
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // 驗證通過，渲染子路由內容 (Outlet)
  return <Outlet />;
}

export default ProtectedRoute;
