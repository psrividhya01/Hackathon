import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { BrandService } from '../services/brand.service';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
import { Product } from '../models';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  searchQuery = signal('');
  selectedCategory = signal<number | undefined>(undefined);
  selectedBrand = signal<number | undefined>(undefined);
  addedToCart = signal<number | null>(null);

  constructor(
    public productService: ProductService,
    public categoryService: CategoryService,
    public brandService: BrandService,
    public cartService: CartService,
    public wishlistService: WishlistService
  ) {}

  ngOnInit() {
    this.productService.getAll();
    this.categoryService.getAll();
    this.brandService.getAll();
    this.cartService.getCart();
    this.wishlistService.loadFromStorage();
  }

  get filteredProducts(): Product[] {
    const q = this.searchQuery().toLowerCase();
    return this.productService.products().filter(p =>
      p.name.toLowerCase().includes(q)
    );
  }

  applyFilter() {
    this.productService.getAll(this.selectedCategory(), this.selectedBrand());
  }

  resetFilter() {
    this.selectedCategory.set(undefined);
    this.selectedBrand.set(undefined);
    this.searchQuery.set('');
    this.productService.getAll();
  }

  addToCart(variantId: number, productId: number) {
    this.cartService.addToCart({ productVariantId: variantId, quantity: 1 }).subscribe(() => {
      this.addedToCart.set(productId);
      this.cartService.refresh();
      setTimeout(() => this.addedToCart.set(null), 2000);
    });
  }
}