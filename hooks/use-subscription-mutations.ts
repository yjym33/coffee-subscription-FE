/**
 * 구독 생성/수정/취소에 대한 React Query 변이 훅 모음
 * - 현재는 목 API로 동작하며, 실제 API 연동 시 `mutationFn`만 교체하면 됩니다.
 * - 성공 시 관련 캐시 키를 무효화하여 UI가 최신 상태를 반영하도록 합니다.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateSubscriptionData {
  productId: string;
  frequency: "weekly" | "biweekly" | "monthly";
  quantity: number;
}

interface UpdateSubscriptionData {
  id: string;
  frequency?: "weekly" | "biweekly" | "monthly";
  quantity?: number;
  status?: "active" | "paused" | "cancelled";
}

// Mock API functions
const createSubscription = async (data: CreateSubscriptionData) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    id: Math.random().toString(36).substr(2, 9),
    ...data,
    status: "active",
    createdAt: new Date().toISOString(),
  };
};

const updateSubscription = async (data: UpdateSubscriptionData) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    ...data,
    updatedAt: new Date().toISOString(),
  };
};

const cancelSubscription = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { id, status: "cancelled" };
};

export function useCreateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubscription,
    onSuccess: () => {
      // Invalidate and refetch subscriptions
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
}

export function useUpdateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSubscription,
    onSuccess: (data) => {
      // Update specific subscription in cache
      queryClient.invalidateQueries({ queryKey: ["subscription", data.id] });
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
}

export function useCancelSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelSubscription,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["subscription", data.id] });
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
}
