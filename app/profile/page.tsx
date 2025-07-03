"use client";

import { User, Mail, Calendar, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/store/userStore";
import { useOrderHistory } from "@/hooks/order-history-hook/useOrderHistory";
import { Button } from "@/components/ui/button";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";

export default function ProfilePage() {
  const { username, role, email } = useUserStore();
  const {
    data: orderHistoryData,
    isLoading,
    isError,
    error,
    refetch: refetchOrderHistory,
  } = useOrderHistory();

  // Loading state
  if (isLoading) {
    return <ProfileSkeleton />;
  }

  // Error state
  if (isError) {
    return (
      <div className="max-w-[80%] mx-auto mt-[30px] px-4 py-8 text-center border-[1px] border-destructive rounded-lg">
        <p className="text-destructive">
          Error loading order history: {error?.message || "Unknown error"}
        </p>
        <Button onClick={() => refetchOrderHistory()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "default";
      case "shipped":
        return "secondary";
      case "processing":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{username}</h3>
                  <p className="text-muted-foreground">{role}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Member since January 2024</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order History */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Order History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {orderHistoryData?.data &&
              orderHistoryData?.data?.orders.length > 0 ? (
                <div className="space-y-4">
                  {orderHistoryData?.data?.orders?.map((order) => (
                    <Card
                      key={order._id}
                      className="border-l-4 border-l-primary/20"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">
                              ORD-{order._id.slice(-4).toUpperCase()}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                            <p className="font-semibold mt-1">
                              {formatPrice(order.orderPrice)}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Items</span>
                            <span>{order.totalOrderItems}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Payment Method</span>
                            <span>{order.paymentProvider}</span>
                          </div>
                          {order.address && (
                            <div className="text-sm">
                              <p className="font-medium mt-2">
                                Shipping Address:
                              </p>
                              <p>{order.address.addressLine1}</p>
                              <p>{order.address.addressLine2}</p>
                              <p>
                                {order.address.city}, {order.address.state}{" "}
                                {order.address.pincode}
                              </p>
                              <p>{order.address.country}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No orders yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
