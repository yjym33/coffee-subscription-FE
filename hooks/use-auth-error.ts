import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthError } from "@/lib/services/api";
import { useAuthStore } from "@/store/auth-store";

/**
 * 인증 에러 발생 시 자동으로 로그아웃 및 로그인 페이지로 리다이렉트하는 훅
 * API 인터셉터에서 401 에러가 발생했을 때 호출됩니다.
 */
export function useAuthErrorHandler() {
  const router = useRouter();
  const { logout } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthError(() => {
      // 스토어에서 로그아웃 처리
      logout();

      // 로그인 페이지로 리다이렉트
      router.replace("/login");
    });

    return unsubscribe;
  }, [router, logout]);
}
