/**
 * 장바구니 훅
 * - Zustand 스토어(`store/cart-store.ts`)를 커스텀 훅으로 래핑해 사용처에서 import 경로를 단순화합니다.
 */
import { useCartStore } from "@/store/cart-store";

export function useCart() {
  return useCartStore();
}
