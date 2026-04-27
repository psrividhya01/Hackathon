import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inventory, InventoryUpdateRequest } from '../models/inventory.model';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private apiUrl = 'http://localhost:5000/api/inventory';

  inventory = signal<Inventory[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  getAll() {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<Inventory[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.inventory.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }

  getByVariantId(variantId: number) {
    return this.http.get<Inventory>(`${this.apiUrl}/${variantId}`);
  }

  update(variantId: number, payload: InventoryUpdateRequest) {
    return this.http.put<Inventory>(`${this.apiUrl}/${variantId}`, payload);
  }
}
