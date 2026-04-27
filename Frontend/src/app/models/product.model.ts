import { Brand } from './brand.model';
import { Category } from './category.model';

export interface Product {
  id: number;
  name: string;
  brandId: number;
  brand?: Brand;
  categoryId: number;
  category?: Category;
}

export interface ProductRequest {
  name: string;
  brandId: number;
  categoryId: number;
}