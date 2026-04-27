import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Order,
  PlaceOrderRequest,
  UpdateOrderStatusRequest
} from '../models';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'http://localhost:5000/api/orders';

  // User orders
  myOrders = signal<Order[]>([]);
  selectedOrder = signal<Order | null>(null);

  // Admin orders
  allOrders = signal<Order[]>([]);

  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  // ─── USER ───────────────────────────────────────────

  placeOrder(payload: PlaceOrderRequest) {
    return this.http.post<Order>(this.apiUrl, payload);
  }

  getMyOrders() {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<Order[]>(`${this.apiUrl}/my`).subscribe({
      next: (data) => {
        this.myOrders.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  getOrderById(id: number) {
    this.loading.set(true);
    this.http.get<Order>(`${this.apiUrl}/${id}`).subscribe({
      next: (data) => {
        this.selectedOrder.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  // ─── ADMIN ──────────────────────────────────────────

  getAllOrders() {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<Order[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.allOrders.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  updateStatus(id: number, payload: UpdateOrderStatusRequest) {
    return this.http.put(`${this.apiUrl}/${id}/status`, payload);
  }
}