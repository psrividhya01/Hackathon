import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { OrderStatus } from '../../../models/order.model';

@Component({
  selector: 'app-admin-order-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css'],
})
export class OrderManagementComponent implements OnInit {
  statuses: OrderStatus[] = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  constructor(public orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getAllOrders();
  }

  updateStatus(id: number, status: string) {
    this.orderService.updateStatus(id, { status: status as OrderStatus }).subscribe(() => {
      this.orderService.getAllOrders();
    });
  }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      Pending: 'bg-warning text-dark',
      Confirmed: 'bg-primary',
      Processing: 'bg-info text-white',
      Shipped: 'bg-info text-white',
      Delivered: 'bg-success',
      Cancelled: 'bg-danger',
    };
    return `badge ${map[status] || 'bg-secondary'}`;
  }
}
