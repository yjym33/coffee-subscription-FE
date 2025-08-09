import { useQuery } from "@tanstack/react-query";
import api from "@/lib/services/api";
import { coffeeProducts } from "@/data/coffee-products";

// 제품 리스트를 가져오는 기본 쿼리 함수
// - 서버 API가 준비되지 않았을 경우 로컬 목 데이터로 폴백합니다.
const fetchProducts = async () => {
  try {
    const { data } = await api.get("/products");
    return data;
  } catch {
    return coffeeProducts;
  }
};

export function useProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Example of a specific product query
export function useProductQuery(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      // 간단한 API 지연 시뮬레이션 및 로컬 데이터 조회
      await new Promise((resolve) => setTimeout(resolve, 300));
      return coffeeProducts.find((product) => product.id === id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
