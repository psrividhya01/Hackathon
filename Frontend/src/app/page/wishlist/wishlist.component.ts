import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  constructor(
    public wishlistService: WishlistService,
    public cartService: CartService,
  ) {}

  ngOnInit() {
    this.wishlistService.loadFromStorage();
  }

  removeItem(productId: number) {
    const product = this.wishlistService.items().find((p) => p.id === productId);
    if (product) {
      this.wishlistService.toggle(product);
    }
  }

  clearAll() {
    this.wishlistService.clear();
  }
}
