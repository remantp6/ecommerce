"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  mainImage: {
    url: string;
  };
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  const handleViewDetails = (id: string) => {
    console.log("View details for product ID:", id);
    router.push(`/products/${id}`);
  };

  return (
    <Card className="border-1 border-gray-200 pt-0 pb-2 md:pb-4 shadow-none">
      <Image
        src={
          product.mainImage.url ||
          "https://pics.craiyon.com/2023-12-04/RkicXp6zSCCjyyXKyqg7Uw.webp"
        }
        alt={product.name || "Product Image"}
        width={300}
        height={200}
        className="object-cover w-full h-[240px] md:h-[350px] group-hover:scale-105 transition-transform duration-200 rounded-tl-xl rounded-tr-xl"
      />
      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>
        <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">${product.price}</span>
          <Badge variant={product.stock > 0 ? "default" : "destructive"}>
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full cursor-pointer"
          onClick={() => handleViewDetails(product._id)}
        >
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
