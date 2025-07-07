import { Routes } from '@angular/router';

export const ordersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./orders-list/orders-list.component').then(m => m.OrdersListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./order-form/order-form.component').then(m => m.OrderFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./order-form/order-form.component').then(m => m.OrderFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./order-detail/order-detail.component').then(m => m.OrderDetailComponent)
  }
];
