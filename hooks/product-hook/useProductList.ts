import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/apiClient";
import { ApiResponse } from "@/types/api";
import { ProductListResponse } from "@/types/product";

// This hook fetches a list of products from the API
export function useProductList() {
  return useQuery<ApiResponse<ProductListResponse>, Error>({
    queryKey: ["products"],
    queryFn: () =>
      apiClient.get<ApiResponse<ProductListResponse>>(
        "/ecommerce/products/?page=1&limit=10"
      ),
  });
}
