import { Routes } from '@angular/router';

export const invoicesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./invoices-list/invoices-list.component').then(m => m.InvoicesListComponent)
  }
];
