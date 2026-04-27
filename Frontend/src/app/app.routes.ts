import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { userGuard } from './guards/user.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then((m) => m.RegisterComponent),
    canActivate: [authGuard],
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
    canActivate: [userGuard],
  },
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.component').then((m) => m.MenuComponent),
    canActivate: [userGuard],
  },
  {
    path: 'products',
    loadComponent: () => import('./products/products.component').then((m) => m.ProductsComponent),
    canActivate: [userGuard],
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./product-detail/product-detail.component').then((m) => m.ProductDetailComponent),
    canActivate: [userGuard],
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.component').then((m) => m.CartComponent),
    canActivate: [userGuard],
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./wishlist/wishlist.component').then((m) => m.WishlistComponent),
    canActivate: [userGuard],
  },
  {
    path: 'order',
    loadComponent: () => import('./order/order.component').then((m) => m.OrderComponent),
    canActivate: [userGuard],
  },
  {
    path: 'order-success',
    loadComponent: () =>
      import('./order-success/order-success.component').then((m) => m.OrderSuccessComponent),
    canActivate: [userGuard],
  },
  {
    path: 'order-history',
    loadComponent: () =>
      import('./order-history/order-history.component').then((m) => m.OrderHistoryComponent),
    canActivate: [userGuard],
  },
  {
    path: 'order-tracking/:id',
    loadComponent: () =>
      import('./order-tracking/order-tracking.component').then((m) => m.OrderTrackingComponent),
    canActivate: [userGuard],
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [userGuard],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin-layout/admin-layout.component').then((m) => m.AdminLayoutComponent),
    canActivate: [roleGuard],
    children: [
      { path: '', redirectTo: 'categories', pathMatch: 'full' },
      {
        path: 'categories',
        loadComponent: () =>
          import('./admin/category/category.component').then((m) => m.CategoryComponent),
      },
      {
        path: 'brands',
        loadComponent: () => import('./admin/brand/brand.component').then((m) => m.BrandComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./admin/product/product.component').then((m) => m.ProductComponent),
      },
      {
        path: 'variants',
        loadComponent: () =>
          import('./admin/variant/variant.component').then((m) => m.VariantComponent),
      },
      {
        path: 'inventory',
        loadComponent: () =>
          import('./admin/inventory/inventory.component').then((m) => m.InventoryComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./admin/order-management/order-management.component').then(
            (m) => m.OrderManagementComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
