import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product, ProductRequest } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:5064/api/products';

  products = signal<Product[]>([]);
  selectedProduct = signal<Product | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  getAll(categoryId?: number, brandId?: number) {
    this.loading.set(true);
    this.error.set(null);

    let params = new HttpParams();
    if (categoryId) params = params.set('categoryId', categoryId);
    if (brandId) params = params.set('brandId', brandId);

    this.http.get<Product[]>(this.apiUrl, { params }).subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  getById(id: number) {
    this.loading.set(true);
    this.http.get<Product>(`${this.apiUrl}/${id}`).subscribe({
      next: (data) => {
        this.selectedProduct.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  create(payload: ProductRequest) {
    return this.http.post<Product>(this.apiUrl, payload);
  }

  update(id: number, payload: ProductRequest) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
