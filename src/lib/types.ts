export type Grade = "S" | "A" | "B" | "C" | "D";
export type Role = "customer" | "seller" | "admin";

export interface Address {
  phone: string;
  city: string;
  postalCode: string;
  addressLine: string;
}

export interface BaseUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
}

export interface CustomerUser extends BaseUser {
  role: "customer";
  address: Address;
}

export interface SellerUser extends BaseUser {
  role: "seller";
  storeName: string;
  storeAddress: Address;
}

export interface AdminUser extends BaseUser {
  role: "admin";
}

export type User = CustomerUser | SellerUser | AdminUser;

export interface Product {
  id: string;
  sellerId: string;
  storeName: string;
  name: string;
  price: number; // rupiah
  grade: Grade;
  stock: number;
  imageUrl: string;
  description?: string;
  createdAt: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export type OrderStatus = "pending" | "done";

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  sellerId: string;
  storeName: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: number;
}