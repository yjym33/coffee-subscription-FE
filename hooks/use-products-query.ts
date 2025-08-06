import { useQuery } from "@tanstack/react-query";
import { coffeeProducts } from "@/data/coffee-products";

// Mock API function
const fetchProducts = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return coffeeProducts;
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return coffeeProducts.find(product => product.id === id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}