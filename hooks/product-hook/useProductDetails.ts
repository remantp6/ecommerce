import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/apiClient";
import { Product } from "@/types/product";
import { ApiResponse } from "@/types/api";

export function useProductDetails(id: string) {
  return useQuery<ApiResponse<Product>, Error>({
    queryKey: ["product-details", id],
    queryFn: () =>
      apiClient.get<ApiResponse<Product>>(`/public/randomproducts/${id}`),
  });
}
