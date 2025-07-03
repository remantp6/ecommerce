"use client";

import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { useProductList } from "@/hooks/product-hook/useProductList";
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductListSkeleton from "@/components/skeletons/ProductListSkeleton";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: productsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useProductList();

  // Filter products based on search term
  const filteredProducts =
    productsData?.data.products?.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (isLoading) {
    return <ProductListSkeleton />;
  }

  if (isError) {
    return (
      <div className="max-w-[80%] mx-auto mt-[30px] px-4 py-8 text-center border-[1px] border-destructive rounded-lg">
        <p className="text-destructive">
          Error loading products: {error?.message || "Unknown error"}
        </p>
        <Button onClick={() => refetch()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No products found</p>
        </div>
      )}
    </main>
  );
}
