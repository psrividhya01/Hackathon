import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductVariant, ProductVariantRequest } from '../models/product-variant.model';

@Injectable({ providedIn: 'root' })
export class VariantService {
  private apiUrl = 'http://localhost:5064/api/variants';

  variants = signal<ProductVariant[]>([]);
  selectedVariant = signal<ProductVariant | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  getAll(productId?: number) {
    this.loading.set(true);
    this.error.set(null);

    let params = new HttpParams();
    if (productId) params = params.set('productId', productId);

    this.http.get<ProductVariant[]>(this.apiUrl, { params }).subscribe({
      next: (data) => {
        this.variants.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }

  getById(id: number) {
    return this.http.get<ProductVariant>(`${this.apiUrl}/${id}`);
  }

  getByProduct(productId: number) {
    let params = new HttpParams().set('productId', productId);
    return this.http.get<ProductVariant[]>(this.apiUrl, { params });
  }

  create(payload: ProductVariantRequest) {
    return this.http.post<ProductVariant>(this.apiUrl, payload);
  }

  update(id: number, payload: ProductVariantRequest) {
    return this.http.put<ProductVariant>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

