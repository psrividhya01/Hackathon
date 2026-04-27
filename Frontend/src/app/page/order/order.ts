import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './order.html',
  styleUrls: ['./order.css']
})
export class OrderComponent implements OnInit {
  step = signal<1 | 2 | 3>(1);
  loading = signal(false);
  error = signal('');

  personalDetails = signal({
    name: '', email: '', phone: '', address: ''
  });

  paymentMethod = signal<'cod' | 'online'>('cod');

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() { this.cartService.getCart(); }

  nextStep() {
    if (this.step() === 1) {
      const d = this.personalDetails();
      if (!d.name || !d.email || !d.phone || !d.address) {
        this.error.set('Please fill in all personal details.');
        return;
      }
    }
    this.error.set('');
    this.step.update(s => (s < 3 ? (s + 1) as 1|2|3 : s));
  }

  prevStep() {
    this.step.update(s => (s > 1 ? (s - 1) as 1|2|3 : s));
  }

  updatePersonal(field: string, value: string) {
    this.personalDetails.update(d => ({ ...d, [field]: value }));
  }

  placeOrder() {
    this.loading.set(true);
    this.orderService.placeOrder({}).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/order-success']);
      },
      error: () => {
        this.error.set('Failed to place order. Please try again.');
        this.loading.set(false);
      }
    });
  }
}