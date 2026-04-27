import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private _items = signal<Product[]>([]);

  readonly items = this._items.asReadonly();
  readonly count = computed(() => this._items().length);

  isWishlisted(productId: number): boolean {
    return this._items().some(p => p.id === productId);
  }

  toggle(product: Product): void {
    const exists = this.isWishlisted(product.id);
    if (exists) {
      this._items.update(items => items.filter(p => p.id !== product.id));
    } else {
      this._items.update(items => [...items, product]);
    }
    this.saveToStorage();
  }

  private saveToStorage(): void {
    localStorage.setItem('wishlist', JSON.stringify(this._items()));
  }

  loadFromStorage(): void {
    const stored = localStorage.getItem('wishlist');
    if (stored) this._items.set(JSON.parse(stored));
  }

  clear(): void {
    this._items.set([]);
    localStorage.removeItem('wishlist');
  }
}