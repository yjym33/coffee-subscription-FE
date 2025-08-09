"use client";

/**
 * 단독 QueryClient 인스턴스가 필요한 경우를 위한 팩토리.
 * 일반적으로는 `components/providers/query-provider.tsx`를 사용하세요.
 */
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});
