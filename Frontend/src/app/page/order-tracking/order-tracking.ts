import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {
  steps = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];

  constructor(public orderService: OrderService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.orderService.getOrderById(+id);
  }

  stepIndex(status: string): number {
    return this.steps.indexOf(status);
  }
}