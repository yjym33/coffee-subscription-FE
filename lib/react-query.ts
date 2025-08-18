"use client";

import { QueryClient } from "@tanstack/react-query";

/**
 * React Query 공통 설정
 * QueryProvider와 단독 인스턴스에서 동일한 설정을 사용합니다.
 */
export const defaultQueryOptions = {
  queries: {
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  },
} as const;

/**
 * 공통 설정을 사용하는 QueryClient 팩토리
 */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: defaultQueryOptions,
  });
}

/**
 * 단독 QueryClient 인스턴스가 필요한 경우를 위한 인스턴스.
 * 일반적으로는 `components/providers/query-provider.tsx`를 사용하세요.
 */
export const queryClient = createQueryClient();
