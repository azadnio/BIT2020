import { Routes } from '@angular/router';

export const customerRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.CustomerDashboardComponent,
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then(
        (m) => m.CustomerProfileComponent,
      ),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./orders/orders.component').then(
        (m) => m.CustomerOrdersComponent,
      ),
  },
  {
    path: 'orders/:id',
    loadComponent: () =>
      import('./orders/order-detail/order-detail.component').then(
        (m) => m.OrderDetailComponent,
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'payments',
    loadComponent: () =>
      import('./payments/payments.component').then((m) => m.PaymentsComponent),
  },
  {
    path: 'invoices',
    loadComponent: () =>
      import('./invoices/invoices.component').then((m) => m.InvoicesComponent),
  },
  {
    path: 'invoices/:id',
    loadComponent: () =>
      import('./invoices/invoice-detail/invoice-detail.component').then(
        (m) => m.InvoiceDetailComponent,
      ),
  },
];
