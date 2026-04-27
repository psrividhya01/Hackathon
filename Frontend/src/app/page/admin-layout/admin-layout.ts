import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  imports: [],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css'],
})
export class AdminLayoutComponent {
  menuItems = [
    { name: 'Categories', route: '/admin/categories' },
    { name: 'Brands', route: '/admin/brands' },
    { name: 'Products', route: '/admin/products' },
    { name: 'Variants', route: '/admin/variants' },
    { name: 'Inventory', route: '/admin/inventory' },
    { name: 'Orders', route: '/admin/orders' },
  ];
}
