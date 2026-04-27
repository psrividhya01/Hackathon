import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, CategoryRequest } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategorieService {
  private apiUrl = 'http://localhost:5000/api/categories';

  categories = signal<Category[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  getAll() {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<Category[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.categories.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }

  getById(id: number) {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  create(payload: CategoryRequest) {
    return this.http.post<Category>(this.apiUrl, payload);
  }

  update(id: number, payload: CategoryRequest) {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
