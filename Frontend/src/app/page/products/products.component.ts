import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar';
import { ProductService } from '../../services/product.service';
import { CategorieService } from '../../services/categorie-service';
import { BrandService } from '../../services/brand-service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  searchQuery = signal('');
  addedToCart = signal<number | null>(null);

  constructor(
    public productService: ProductService,
    public categoryService: CategorieService,
    public brandService: BrandService,
    public cartService: CartService,
    public wishlistService: WishlistService,
  ) {}

  ngOnInit() {
    this.productService.getAll();
    this.categoryService.getAll();
    this.cartService.getCart();
    this.wishlistService.loadFromStorage();
  }

  get filteredProducts(): Product[] {
    const q = this.searchQuery().toLowerCase();
    return this.productService.products().filter((p: Product) => p.name.toLowerCase().includes(q));
  }

  filterByCategory(categoryId: number) {
    this.productService.getAll(categoryId);
  }

  clearFilter() {
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
