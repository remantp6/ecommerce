export interface ProductListResponse {
  products: Product[];
  totalProducts: number;
}

export interface Product {
  _id: string;
  category: string;
  description: string;
  mainImage: {
    url: string;
  };
  name: string;
  price: number;
  stock: number;
}

export type Category = {
  _id: string;
  name: string;
};
