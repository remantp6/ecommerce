import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/apiClient";
import {
  ApiCartResponse,
  ClearCartResponse,
  UpdateCartItemRequest,
} from "@/types/cart";
import { toast } from "sonner";
import { useTokenStore } from "@/store/tokenStore";

export function useCart() {
  const queryClient = useQueryClient();
  const accessToken = useTokenStore((state) => state.accessToken);

  // Fetch cart
  const fetchCart = () => {
    return apiClient.get<ApiCartResponse>("/ecommerce/cart");
  };

  // Update or add item
  const updateCartItem = (productId: string, quantity: number) => {
    return apiClient.post<UpdateCartItemRequest, ApiCartResponse>(
      `/ecommerce/cart/item/${productId}`,
      { quantity }
    );
  };

  // Remove item
  const removeCartItemApi = (productId: string) => {
    return apiClient.delete<ApiCartResponse>(
      `/ecommerce/cart/item/${productId}`
    );
  };

  // Clear entire cart
  const clearCartApi = () => {
    return apiClient.delete<ClearCartResponse>("/ecommerce/cart/clear");
  };

  // Query: get cart (only when token exists)
  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    enabled: !!accessToken, // Prevent fetch if not logged in
  });

  // Mutation to add item to cart (quantity = 1)
  const addMutation = useMutation({
    mutationFn: (productId: string) => updateCartItem(productId, 1),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item added to cart");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add item to cart");
    },
  });

  // Mutation to increment item quantity
  const incrementMutation = useMutation({
    mutationFn: ({
      productId,
      currentQuantity,
    }: {
      productId: string;
      currentQuantity: number;
    }) => updateCartItem(productId, currentQuantity + 1),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item quantity increased");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to increase quantity");
    },
  });

  // Mutation to decrement item quantity
  const decrementMutation = useMutation({
    mutationFn: ({
      productId,
      currentQuantity,
    }: {
      productId: string;
      currentQuantity: number;
    }) => {
      if (currentQuantity <= 1) {
        return removeCartItemApi(productId);
      }
      return updateCartItem(productId, currentQuantity - 1);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      if (variables.currentQuantity <= 1) {
        toast.success("Item removed from cart");
      } else {
        toast.success("Item quantity decreased");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to decrease quantity");
    },
  });

  // Mutation to remove an item from the cart
  const removeMutation = useMutation({
    mutationFn: removeCartItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item removed from cart");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove item");
    },
  });

  // Mutation to clear the entire cart
  const clearMutation = useMutation({
    mutationFn: clearCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Cart cleared successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to clear cart");
    },
  });

  return {
    // Cart state (only available when authenticated)
    cart: cartQuery.data?.data,
    isLoading: cartQuery.isLoading,
    isError: cartQuery.isError,
    error: cartQuery.error,
    refetchCart: cartQuery.refetch,

    // Mutation to add item to cart
    addCartItem: (productId: string) => addMutation.mutate(productId),
    isAdding: addMutation.isPending,

    // Mutation to increment item quantity
    incrementCartItem: (productId: string, currentQuantity: number) =>
      incrementMutation.mutate({ productId, currentQuantity }),
    isIncrementing: incrementMutation.isPending,

    // Mutation to decrement item quantity
    decrementCartItem: (productId: string, currentQuantity: number) =>
      decrementMutation.mutate({ productId, currentQuantity }),
    isDecrementing: decrementMutation.isPending,

    // Mutation to remove an item from the cart
    removeCartItem: (productId: string) => removeMutation.mutate(productId),
    isRemoving: removeMutation.isPending,

    // Mutation to clear the entire cart
    clearCart: () => clearMutation.mutate(),
    isClearing: clearMutation.isPending,
  };
}
