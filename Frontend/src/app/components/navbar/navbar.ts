import { Component, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth-service';
import { CartService } from '../services/cart-service';
import { WishlistService } from '../services/wishlist-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    public auth: AuthService,
    public cartService: CartService,
    public wishlistService: WishlistService,
  ) {}

  logout() {
    this.auth.logout();
  }
}
