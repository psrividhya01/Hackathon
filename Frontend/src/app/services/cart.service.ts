import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart, CartItem, AddToCartRequest, UpdateCartRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrl = 'http://localhost:5000/api/cart';

  cart = signal<Cart | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  // Computed signals
  readonly cartItems = computed(() => this.cart()?.cartItems ?? []);
  readonly cartCount = computed(() => this.cartItems().length);
  readonly cartTotal = computed(() =>
    this.cartItems().reduce((sum, item) => {
      const price = item.productVariant?.price ?? 0;
      return sum + price * item.quantity;
    }, 0)
  );

  constructor(private http: HttpClient) {}

  getCart() {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<Cart>(this.apiUrl).subscribe({
      next: (data) => {
        this.cart.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  addToCart(payload: AddToCartRequest) {
    return this.http.post<CartItem>(this.apiUrl, payload);
  }

  updateItem(itemId: number, payload: UpdateCartRequest) {
    return this.http.put<CartItem>(`${this.apiUrl}/${itemId}`, payload);
  }

  removeItem(itemId: number) {
    return this.http.delete(`${this.apiUrl}/${itemId}`);
  }

  // Local helper - refresh after any mutation
  refresh() {
    this.getCart();
  }
}