import { ProductVariant } from './product-variant.model';

export interface CartItem {
  id: number;
  cartId: number;
  productVariantId: number;
  productVariant?: ProductVariant;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  cartItems: CartItem[];
}

export interface AddToCartRequest {
  productVariantId: number;
  quantity: number;
}

export interface UpdateCartRequest {
  quantity: number;
}