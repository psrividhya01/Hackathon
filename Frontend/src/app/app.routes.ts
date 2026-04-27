import { authGuard, roleGuard, userGuard } from './guard/auth-guard-guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./page/login/login.component').then((m) => m.LoginComponent),
    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./page/register/register.component').then((m) => m.RegisterComponent),
    canActivate: [authGuard],
  },
  {
    path: 'home',
    loadComponent: () => import('./page/home/home').then((m) => m.HomeComponent),
    canActivate: [userGuard],
  },
  {
    path: 'menu',
    loadComponent: () => import('./page/menu/menu.component').then((m) => m.MenuComponent),
    canActivate: [userGuard],
  },
  {
    path: 'products',
    loadComponent: () => import('./page/products/products.component').then((m) => m.ProductsComponent),
    canActivate: [userGuard],
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./page/product-detail/product-detail.component').then((m) => m.ProductDetailComponent),
    canActivate: [userGuard],
  },
  {
    path: 'cart',
    loadComponent: () => import('./page/cart/cart').then((m) => m.CartComponent),
    canActivate: [userGuard],
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./page/wishlist/wishlist.component').then((m) => m.WishlistComponent),
    canActivate: [userGuard],
  },
  {
    path: 'order',
    loadComponent: () => import('./page/order/order').then((m) => m.OrderComponent),
    canActivate: [userGuard],
  },
  {
    path: 'order-success',
    loadComponent: () =>
      import('./page/order-success/order-success').then((m) => m.OrderSuccess),
    canActivate: [userGuard],
  },
  {
    path: 'order-history',
    loadComponent: () =>
      import('./page/order-history/order-history').then((m) => m.OrderHistoryComponent),
    canActivate: [userGuard],
  },
  {
    path: 'order-tracking/:id',
    loadComponent: () =>
      import('./page/order-tracking/order-tracking').then((m) => m.OrderTrackingComponent),
    canActivate: [userGuard],
  },
  {
    path: 'profile',
    loadComponent: () => import('./page/profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [userGuard],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./page/admin/admin-layout/admin-layout.component').then((m) => m.AdminLayoutComponent),
    canActivate: [roleGuard],
    children: [
      { path: '', redirectTo: 'categories', pathMatch: 'full' },
      {
        path: 'categories',
        loadComponent: () =>
          import('./page/admin/category/category.component').then((m) => m.CategoryComponent),
      },
      {
        path: 'brands',
        loadComponent: () => import('./page/admin/brand/brand.component').then((m) => m.BrandComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./page/admin/product/product.component').then((m) => m.ProductComponent),
      },
      {
        path: 'variants',
        loadComponent: () =>
          import('./page/admin/variant/variant.component').then((m) => m.VariantComponent),
      },
      {
        path: 'inventory',
        loadComponent: () =>
          import('./page/admin/inventory/inventory.component').then((m) => m.InventoryComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./page/admin/order-management/order-management.component').then(
            (m) => m.OrderManagementComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
