import { Product } from './product.model';

export interface ProductVariant {
  id: number;
  productId: number;
  product?: Product;
  variantName: string;
  price: number;
}

export interface ProductVariantRequest {
  productId: number;
  variantName: string;
  price: number;
}