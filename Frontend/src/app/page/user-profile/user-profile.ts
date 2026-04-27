import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../services/auth-service';
import { OrderService } from '../services/order-service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  activeTab = signal<'profile' | 'orders'>('profile');

  constructor(
    public auth: AuthService,
    public orderService: OrderService,
  ) {}

  ngOnInit() {
    this.orderService.getMyOrders();
  }

  logout() {
    this.auth.logout();
  }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      Pending: 'bg-warning text-dark',
      Confirmed: 'bg-primary',
      Delivered: 'bg-success',
      Cancelled: 'bg-danger',
    };
    return `badge ${map[status] || 'bg-secondary'}`;
  }
}
