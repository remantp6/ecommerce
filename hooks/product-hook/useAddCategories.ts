import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/apiClient";
import { ApiResponse } from "@/types/api";
import { toast } from "sonner";
import { Category } from "@/types/product";

type CreateCategoryPayload = {
  name: string;
};

// This hook is used to add a new category
export function useAddCategory() {
  return useMutation<
    ApiResponse<{ category: Category }>,
    Error,
    CreateCategoryPayload
  >({
    mutationFn: (payload) =>
      apiClient.post<
        CreateCategoryPayload,
        ApiResponse<{ category: Category }>
      >("/ecommerce/categories", payload),
    onError: (error) => {
      toast.error(error.message || "Failed to create category");
    },
  });
}
