import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar';
import { ProductService } from '../../services/product.service';
import { VariantService } from '../../services/varient-service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { ProductVariant } from '../../models/product-variant.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  selectedVariant = signal<ProductVariant | null>(null);
  addedToCart = signal(false);
  quantity = signal(1);

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    public variantService: VariantService,
    public cartService: CartService,
    public wishlistService: WishlistService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getById(+id);
      this.variantService.getAll(+id);
    }
    this.wishlistService.loadFromStorage();
  }

  selectVariant(variant: ProductVariant) {
    this.selectedVariant.set(variant);
  }

  incrementQty() {
    this.quantity.update((q) => q + 1);
  }

  decrementQty() {
    this.quantity.update((q) => (q > 1 ? q - 1 : 1));
  }

  addToCart() {
    const variant = this.selectedVariant();
    if (!variant) return;

    this.cartService.addToCart({ productVariantId: variant.id, quantity: this.quantity() }).subscribe(() => {
      this.addedToCart.set(true);
      this.cartService.refresh();
      setTimeout(() => this.addedToCart.set(false), 2500);
    });
  }

  toggleWishlist() {
    const product = this.productService.selectedProduct();
    if (product) {
      this.wishlistService.toggle(product);
    }
  }

  isWishlisted(): boolean {
    const product = this.productService.selectedProduct();
    return product ? this.wishlistService.isWishlisted(product.id) : false;
  }
}
