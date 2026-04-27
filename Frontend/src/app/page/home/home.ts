import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar';
import { CategorieService } from '../../services/categorie-service';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-home',

  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public categoryService: CategorieService,
    public productService: ProductService,
    public cartService: CartService,
    public wishlistService: WishlistService,
    public auth: AuthService,
  ) {}

  ngOnInit() {
    this.categoryService.getAll();
    this.productService.getAll();
    this.cartService.getCart();
    this.wishlistService.loadFromStorage();
  }

  filterByCategory(categoryId: number) {
    this.productService.getAll(categoryId);
  }

  clearFilter() {
    this.productService.getAll();
  }

  addToCart(variantId: number) {
    this.cartService.addToCart({ productVariantId: variantId, quantity: 1 }).subscribe(() => {
      this.cartService.refresh();
    });
  }
}
