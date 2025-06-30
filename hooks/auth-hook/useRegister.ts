import { apiClient } from "@/lib/api/apiClient";
import { ApiResponse } from "@/types/api";
import { RegisterPayloadTypes } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useRegister() {
  return useMutation<ApiResponse<void>, Error, RegisterPayloadTypes>({
    mutationFn: (payload: RegisterPayloadTypes) =>
      apiClient.post<RegisterPayloadTypes, ApiResponse<void>>(
        "/users/register",
        {
          ...payload,
        }
      ),
    onError: (error: Error) => {
      const message =
        error.message || "Something went wrong. Please try again.";
      toast.error(message);
    },
  });
}
