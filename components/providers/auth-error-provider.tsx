"use client";

import { useAuthErrorHandler } from "@/hooks/use-auth-error";

interface AuthErrorProviderProps {
  children: React.ReactNode;
}

/**
 * 인증 에러 처리를 위한 전역 프로바이더
 * API에서 401 에러가 발생했을 때 자동으로 로그아웃 및 리다이렉트를 처리합니다.
 */
export function AuthErrorProvider({ children }: AuthErrorProviderProps) {
  useAuthErrorHandler();

  return <>{children}</>;
}
