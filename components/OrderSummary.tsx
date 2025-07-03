import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

//define the props for the OrderSummary component
type OrderSummaryProps = {
  itemCount: number;
  totalPrice: number;
};

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  itemCount,
  totalPrice,
}) => {
  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal ({itemCount} items)</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex flex-col space-y-5">
            <Link href="/checkout">
              <Button className="w-full cursor-pointer" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" className="w-full cursor-pointer">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
