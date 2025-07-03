import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/apiClient";
import { Product } from "@/types/product";
import { ApiResponse } from "@/types/api";

// This hook fetches the details of a specific product by its ID
export function useProductDetails(id: string) {
  return useQuery<ApiResponse<Product>, Error>({
    queryKey: ["product-details", id],
    queryFn: () =>
      apiClient.get<ApiResponse<Product>>(`/ecommerce/products/${id}`),
  });
}
