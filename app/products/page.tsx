"use client";

import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export const products = [
  {
    id: 1,
    name: "Classic Cotton Shorts",
    short_desc: "Soft and breathable shorts for summer.",
    long_desc:
      "Made with 100% cotton, these shorts are perfect for a relaxed summer day. Designed with both style and comfort in mind.",
    category: "men",
    sub_category: "short",
    image: "https://www.twtf.org.uk/wp-content/uploads/2024/01/dummy-image.jpg",
    price: "$45",
    stock: 10,
  },
  {
    id: 2,
    name: "Denim Jacket",
    short_desc: "Stylish denim jacket for all seasons.",
    long_desc:
      "Crafted from high-quality denim, this jacket combines fashion and function. Perfect for layering.",
    category: "women",
    sub_category: "jacket",
    image: "https://www.twtf.org.uk/wp-content/uploads/2024/01/dummy-image.jpg",
    price: "$45",
    stock: 5,
  },
  {
    id: 3,
    name: "Cargo Pants",
    short_desc: "Sturdy pants designed for active kids.",
    long_desc:
      "With multiple pockets and tough stitching, these cargo pants are ideal for play and adventure.",
    category: "kids",
    sub_category: "pant",
    image: "https://www.twtf.org.uk/wp-content/uploads/2024/01/dummy-image.jpg",
    price: "$55",
    stock: 0,
  },
  {
    id: 4,
    name: "Slim Fit T-shirt",
    short_desc: "Everyday wear with a snug fit.",
    long_desc:
      "This slim fit t-shirt offers a modern look without sacrificing comfort, made from premium cotton.",
    category: "men",
    sub_category: "tshirt",
    image: "https://www.twtf.org.uk/wp-content/uploads/2024/01/dummy-image.jpg",
    price: "$65",
    stock: 8,
  },
  {
    id: 5,
    name: "Linen Shorts",
    short_desc: "Perfect for warm weather.",
    long_desc:
      "These lightweight linen shorts are breathable and great for a casual yet classy summer outfit.",
    category: "women",
    sub_category: "short",
    image: "https://www.twtf.org.uk/wp-content/uploads/2024/01/dummy-image.jpg",
    price: "$35",
    stock: 12,
  },
  {
    id: 6,
    name: "Cotton t-shirt",
    short_desc: "Fun and colorful tee with cartoon prints.",
    long_desc:
      "A soft cotton t-shirt that keeps kids comfy while showing off their favorite characters.",
    category: "kids",
    sub_category: "tshirt",
    image: "https://www.twtf.org.uk/wp-content/uploads/2024/01/dummy-image.jpg",
    price: "$25",
    stock: 20,
  },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts =
    products?.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Products</h1>

        {/* Search */}
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
