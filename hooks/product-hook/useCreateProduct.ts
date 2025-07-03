import { apiClient } from "@/lib/api/apiClient";
import { ApiResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// hook to create a new product
export function useCreateProduct() {
  return useMutation<ApiResponse<unknown>, Error, FormData>({
    mutationFn: (formData) => {
      return apiClient.post<FormData, ApiResponse<unknown>>(
        "/ecommerce/products",
        formData
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong. Please try again.");
    },
  });
}
