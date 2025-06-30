import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/apiClient";
import { ApiResponse } from "@/types/api";
import { ProductListResponse } from "@/types/product";

export function useProductList() {
  return useQuery<ApiResponse<ProductListResponse>, Error>({
    queryKey: ["products"],
    queryFn: () =>
      apiClient.get<ApiResponse<ProductListResponse>>("/public/randomproducts"),
  });
}
