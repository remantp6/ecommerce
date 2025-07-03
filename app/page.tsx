"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserStore } from "@/store/userStore";
import { Shield, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { username } = useUserStore();
  const isAuthenticated = !!username;
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to Our Store
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover amazing products at great prices. Shop with confidence and
          enjoy fast delivery.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/products">Shop Now</Link>
          </Button>
          {!isAuthenticated && (
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/register">Get Started</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardHeader className="text-center">
            <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-primary" />
            <CardTitle>Wide Selection</CardTitle>
            <CardDescription>
              Browse through thousands of products across multiple categories
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
            <CardTitle>Secure Shopping</CardTitle>
            <CardDescription>
              Your data is protected with industry-standard security measures
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Truck className="h-12 w-12 mx-auto mb-4 text-primary" />
            <CardTitle>Fast Delivery</CardTitle>
            <CardDescription>
              Quick and reliable shipping to get your orders to you fast
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="text-center bg-muted rounded-lg p-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
        <p className="text-muted-foreground mb-6">
          Join thousands of satisfied customers and discover your next favorite
          product.
        </p>
        <Button size="lg" asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    </main>
  );
}
