import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand, BrandRequest } from '../models/brand.model';

@Injectable({ providedIn: 'root' })
export class BrandService {
  private apiUrl = 'http://localhost:5000/api/brands';

  brands = signal<Brand[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  getAll() {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<Brand[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.brands.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }

  getById(id: number) {
    return this.http.get<Brand>(`${this.apiUrl}/${id}`);
  }

  create(payload: BrandRequest) {
    return this.http.post<Brand>(this.apiUrl, payload);
  }

  update(id: number, payload: BrandRequest) {
    return this.http.put<Brand>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
