import { ProductVariant } from './product-variant.model';

export interface OrderItem {
  id: number;
  orderId: number;
  productVariantId: number;
  productVariant?: ProductVariant;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  orderItems: OrderItem[];
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface PlaceOrderRequest {
  // backend pulls cart items automatically from userId
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
}