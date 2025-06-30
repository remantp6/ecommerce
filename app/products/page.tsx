"use client";

import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { useProductList } from "@/hooks/product-hook/useProductList";
import { Search } from "lucide-react";
import { useState } from "react";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: productsData, isLoading, isError, error } = useProductList();

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // Filter products based on search term
  // i have used map to transform the product data into the desired format
  // and filter to search by title or category
  const filteredProducts =
    productsData?.data.data
      ?.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((product) => ({
        id: product.id,
        name: product.title,
        short_desc: "",
        long_desc: "",
        category: product.category,
        sub_category: "",
        image: product.thumbnail,
        price: product.price,
        stock: 10, // placeholder value
      })) || [];

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
          <ProductCard key={product.id} product={product} />
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
