import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  {
    path: 'customers',
    loadComponent: () =>
      import('./customers/customers.component').then(
        (m) => m.AdminCustomersComponent,
      ),
  },
  {
    path: 'customers/new',
    loadComponent: () =>
      import('./customers/add-customer/add-customer.component').then(
        (m) => m.AddCustomerComponent,
      ),
  },
  {
    path: 'customers/:id',
    loadComponent: () =>
      import('./customers/customer-detail/customer-detail.component').then(
        (m) => m.CustomerDetailComponent,
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./products/products.component').then(
        (m) => m.AdminProductsComponent,
      ),
  },
  {
    path: 'products/new',
    loadComponent: () =>
      import('./products/add-product/add-product.component').then(
        (m) => m.AddProductComponent,
      ),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./orders/orders.component').then((m) => m.OrdersComponent),
  },
  {
    path: 'orders/new',
    loadComponent: () =>
      import('./orders/add-order/add-order.component').then(
        (m) => m.AddOrderComponent,
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
    path: 'orders/:id/items/add',
    loadComponent: () =>
      import('./orders/add-item/add-item.component').then(
        (m) => m.AddItemComponent,
      ),
  },
  {
    path: 'invoices',
    loadComponent: () =>
      import('./invoices/invoices.component').then((m) => m.InvoicesComponent),
  },
  {
    path: 'payments',
    loadComponent: () =>
      import('./payments/payments.component').then(
        (m) => m.CustomerPaymentsComponent,
      ),
  },
  {
    path: 'payments/cheques/add',
    loadComponent: () =>
      import('./payments/add-cheque/add-cheque.component').then(
        (m) => m.AddChequeComponent,
      ),
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./reports/reports.component').then((m) => m.ReportsComponent),
  },
  {
    path: 'contact-messages',
    loadComponent: () =>
      import('./contact-messages/contact-messages.component').then((m) => m.ContactMessagesComponent),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./users/users.component').then((m) => m.UsersComponent),
  },
];
