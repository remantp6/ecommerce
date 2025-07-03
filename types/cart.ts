export interface CartItemProduct {
  _id: string;
  category: string;
  //createdAt: string;
  description: string;
  mainImage: {
    url: string;
  };
  name: string;
  //owner: string;
  price: number;
  stock: number;
}

export interface CartItem {
  _id: string;
  product: CartItemProduct;
  quantity: number;
}

export interface CartResponse {
  _id: string;
  cartTotal: number;
  discountedTotal: number;
  items: CartItem[];
}

export interface ApiCartResponse {
  data: CartResponse;
  message: string;
  success: boolean;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface UpdateCartItemParams {
  productId: string;
  quantity: number;
}

// Add this to your existing cart types
export interface ClearCartResponse {
  message: string;
}
