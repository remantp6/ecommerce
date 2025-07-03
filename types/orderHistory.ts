// Define types for the order history response
export type OrderHistoryData = {
  orders: Order[];
  totalOrders: number;
  totalPages: number;
};

type Address = {
  _id: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  pincode: string;
  state: string;
};

type Customer = {
  _id: string;
  email: string;
  username: string;
};

export type Order = {
  _id: string;
  address: Address;
  createdAt: string;
  customer: Customer;
  discountedOrderPrice: number;
  isPaymentDone: boolean;
  orderPrice: number;
  paymentId: string;
  paymentProvider: string;
  status: string;
  totalOrderItems: number;
};
