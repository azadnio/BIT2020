import { Routes } from '@angular/router';

export const customersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./customers-list/customers-list.component').then(m => m.CustomersListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./customer-form/customer-form.component').then(m => m.CustomerFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./customer-form/customer-form.component').then(m => m.CustomerFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./customer-detail/customer-detail.component').then(m => m.CustomerDetailComponent)
  }
];
