import { apiClient } from "@/lib/api/apiClient";
import { ApiResponse } from "@/types/api";
import { LoginPayloadTypes, LoginResponseTypes } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useLogin() {
  return useMutation<ApiResponse<LoginResponseTypes>, Error, LoginPayloadTypes>(
    {
      mutationFn: (payload: LoginPayloadTypes) =>
        apiClient.post<LoginPayloadTypes, ApiResponse<LoginResponseTypes>>(
          "/users/login",
          {
            ...payload,
          }
        ),
      onError: (error: Error) => {
        const message =
          error.message || "Something went wrong. Please try again.";
        toast.error(message);
      },
    }
  );
}
