import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/apiClient";
import { ApiResponse } from "@/types/api";
import { OrderHistoryData } from "@/types/orderHistory";

// This hook fetches the order history of the user
export function useOrderHistory() {
  return useQuery<ApiResponse<OrderHistoryData>, Error>({
    queryKey: ["order-history"],
    queryFn: () =>
      apiClient.get<ApiResponse<OrderHistoryData>>(
        `/ecommerce/profile/my-orders`
      ),
  });
}
