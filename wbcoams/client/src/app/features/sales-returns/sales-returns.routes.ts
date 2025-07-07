import { Routes } from '@angular/router';

export const salesReturnsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./sales-returns-list/sales-returns-list.component').then(m => m.SalesReturnsListComponent)
  }
];
