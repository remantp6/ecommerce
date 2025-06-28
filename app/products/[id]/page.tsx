"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { products } from "../page";
import React from "react";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-destructive">Product not found</p>
            <Button asChild className="mt-4">
              <Link href="/products">Back to Products</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/products">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.image}
              alt={product.name || "Product"}
              width={600}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {product.long_desc}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold">{product.price}</span>
            <Badge
              variant={product.stock > 0 ? "default" : "destructive"}
              className="text-sm"
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </Badge>
          </div>

          <Button
            disabled={product.stock === 0}
            size="lg"
            className="w-full cursor-pointer"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span>{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sub Category:</span>
                  <span>{product.sub_category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stock:</span>
                  <span>{product.stock} units</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
