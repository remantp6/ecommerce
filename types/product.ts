export interface Product {
  category: string;
  id: number;
  images: string[];
  price: number;
  thumbnail: string;
  title: string;
}

export interface ProductListResponse {
  currentPageItems: number;
  data: Product[];
  limit: number;
  nextPage: boolean;
  page: number;
  previousPage: boolean;
  totalItems: number;
  totalPages: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  brand: string;
  category: string;
  discountPercentage: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
}
