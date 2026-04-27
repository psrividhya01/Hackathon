import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './order-history.component.html'
})
export class OrderHistoryComponent implements OnInit {
  constructor(public orderService: OrderService) {}
  ngOnInit() { this.orderService.getMyOrders(); }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      Pending: 'bg-warning text-dark', Confirmed: 'bg-primary',
      Delivered: 'bg-success', Cancelled: 'bg-danger',
    };
    return `badge ${map[status] || 'bg-secondary'}`;
  }
}