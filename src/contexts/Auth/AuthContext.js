import { createContext, useContext } from 'react';

export const AuthContext = createContext();

export function useAuthContext() {
  const context = useContext(AuthContext);
  // 如果 context 是 undefined，代表該組件不在 Provider 內
  if (!context) {
    throw new Error('useAuthContext 必須在 AuthProvider 內使用');
  }
  return context;
}