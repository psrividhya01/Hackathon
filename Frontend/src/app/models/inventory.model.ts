import { ProductVariant } from './product-variant.model';

export enum StockStatus {
  Available = 'Available',
  LowStock = 'LowStock',
  OutOfStock = 'OutOfStock'
}

export interface Inventory {
  id: number;
  productVariantId: number;
  productVariant?: ProductVariant;
  stock: number;
  stockStatus?: StockStatus;
}

export interface InventoryUpdateRequest {
  stock: number;
}