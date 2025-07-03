"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/cart-hook/useCart";
import CartSkeleton from "@/components/skeletons/CartSkeleton";
import { OrderSummary } from "@/components/OrderSummary";

export default function CartPage() {
  const {
    cart,
    isLoading,
    isError,
    error,
    incrementCartItem,
    isIncrementing,
    decrementCartItem,
    isDecrementing,
    removeCartItem,
    isRemoving,
    clearCart,
    isClearing,
    refetchCart,
  } = useCart();

  // Functions to increase cart item quantity
  const handleIncrement = (productId: string, currentQuantity: number) => {
    incrementCartItem(productId, currentQuantity);
  };

  // Functions to decrease cart item quantity
  const handleDecrement = (productId: string, currentQuantity: number) => {
    decrementCartItem(productId, currentQuantity);
  };

  // Function to remove an item from the cart
  const handleRemoveItem = (productId: string) => {
    removeCartItem(productId);
  };

  // Function to clear the entire cart
  const handleClearCart = () => {
    clearCart();
  };

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (isError) {
    return (
      <div className="max-w-[80%] mx-auto mt-[30px] px-4 py-8 text-center border-[1px] border-destructive rounded-lg">
        <p className="text-destructive">
          Error loading cart: {error?.message || "Unknown error"}
        </p>
        <Button onClick={() => refetchCart()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">
          Looks like you haven&apos;t added any items to your cart yet.
        </p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const totalPrice = cart.cartTotal;
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <Button
          variant="outline"
          onClick={handleClearCart}
          disabled={isClearing}
          className="cursor-pointer"
        >
          {isClearing ? "Clearing..." : "Clear Cart"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <Card key={item.product._id}>
              <div className="flex justify-end pe-4 pt-2">
                <button
                  onClick={() => handleRemoveItem(item.product._id)}
                  disabled={isRemoving}
                  className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 sm:w-20 sm:h-20 flex-shrink-0 mx-auto sm:mx-0">
                    <Image
                      src={item.product.mainImage.url || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-md"
                      sizes="80px"
                    />
                  </div>

                  {/* Product Info and Controls */}
                  <div className="flex flex-col flex-1 ms-4 space-y-2 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center w-full">
                    {/* Product name & price */}
                    <div className="flex flex-col min-w-0 sm:max-w-xs">
                      <h3 className="font-semibold text-base sm:text-lg truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-xl font-bold text-primary sm:text-2xl">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity controls and total */}
                    <div className="flex items-center justify-between sm:justify-end space-x-2 mt-2 sm:mt-0">
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={item.quantity <= 1 || isDecrementing}
                        onClick={() =>
                          handleDecrement(item.product._id, item.quantity)
                        }
                        aria-label="Decrease quantity"
                        className="cursor-pointer"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={
                          item.quantity >= item.product.stock || isIncrementing
                        }
                        onClick={() =>
                          handleIncrement(item.product._id, item.quantity)
                        }
                        aria-label="Increase quantity"
                        className="cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>

                      <p className="font-semibold text-lg ml-4 min-w-fit">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <OrderSummary itemCount={totalPrice} totalPrice={itemCount} />
      </div>
    </div>
  );
}
