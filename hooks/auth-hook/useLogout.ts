import { apiClient } from "@/lib/api/apiClient";
import { LogoutResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useLogout() {
  return useMutation({
    mutationFn: () => apiClient.post<undefined, LogoutResponse>("users/logout"),
    onSuccess: (res: LogoutResponse) => {
      const message = res.message || "Logout successful!";
      sessionStorage.clear();
      window.location.href = "/";
      toast.success(message);
    },
    onError: (error: Error) => {
      const message =
        error.message || "Something went wrong. Please try again.";
      toast.error(message);
    },
  });
}
