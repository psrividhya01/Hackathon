import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  constructor(public cartService: CartService) {}

  ngOnInit() { this.cartService.getCart(); }

  updateQty(itemId: number, qty: number) {
    if (qty < 1) return;
    this.cartService.updateItem(itemId, { quantity: qty }).subscribe(() => {
      this.cartService.refresh();
    });
  }

  removeItem(itemId: number) {
    this.cartService.removeItem(itemId).subscribe(() => {
      this.cartService.refresh();
    });
  }
}