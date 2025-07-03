"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useProductDetails } from "@/hooks/product-hook/useProductDetails";
import { useCart } from "@/hooks/cart-hook/useCart";
import ProductDetailsSkeleton from "@/components/skeletons/ProductDetailsSkeleton";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";

export default function ProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const { username } = useUserStore();
  const isAuthenticated = !!username;
  const {
    data: productData,
    isLoading,
    isError,
    error,
    refetch,
  } = useProductDetails(id as string);

  const { cart, addCartItem, incrementCartItem, isAdding, isIncrementing } =
    useCart();

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (isError) {
    return (
      <div className="max-w-[80%] mx-auto mt-[30px] px-4 py-8 text-center border-[1px] border-destructive rounded-lg">
        <p className="text-destructive">
          Error loading product: {error?.message || "Unknown error"}
        </p>
        <div className="mt-4 space-x-4">
          <Button onClick={() => refetch()}>Retry</Button>
          <Button asChild variant="outline">
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!productData?.data) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-destructive">Product not found</p>
          <Button asChild className="mt-4">
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const product = productData.data;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to your cart");
      return;
    }
    const cartItem = cart?.items.find(
      (item) => item.product._id === product._id
    );

    if (cartItem) {
      // If item exists, increment quantity
      incrementCartItem(product._id, cartItem.quantity);
    } else {
      // If item doesn't exist, add new item
      addCartItem(product._id);
    }

    router.push("/cart");
  };

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
              src={product.mainImage.url}
              alt={product.name}
              width={600}
              height={600}
              className="object-cover w-full h-full"
              priority
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
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold">${product.price}</span>
            <Badge
              variant={product.stock > 0 ? "default" : "destructive"}
              className="text-sm"
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </Badge>
          </div>

          <Button
            disabled={product.stock === 0 || isAdding || isIncrementing}
            size="lg"
            className="w-full cursor-pointer"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {isAdding || isIncrementing ? "Adding..." : "Add to Cart"}
          </Button>

          <Card>
            <CardContent className="px-6">
              <h3 className="font-semibold mb-2">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span>{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stock:</span>
                  <span>{product.stock} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Product ID:</span>
                  <span className="font-mono text-xs">{product._id}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
