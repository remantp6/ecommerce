import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/apiClient";
import { ApiResponse } from "@/types/api";
import { Category } from "@/types/product";

// This hook fetches a list of categories from the API
export function useCategoriesList() {
  return useQuery<ApiResponse<{ categories: Category[] }>, Error>({
    queryKey: ["categories"],
    queryFn: () =>
      apiClient.get<ApiResponse<{ categories: Category[] }>>(
        "/ecommerce/categories"
      ),
  });
}
