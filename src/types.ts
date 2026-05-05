/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  rating: number;
  reviews: Review[];
  specs: Record<string, string>;
  features: string[];
  isFeatured?: boolean;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  orders: Order[];
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItem[];
  total: number;
  shippingAddress: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
