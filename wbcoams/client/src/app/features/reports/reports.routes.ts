import { Routes } from '@angular/router';

export const reportsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./reports-list/reports-list.component').then(m => m.ReportsListComponent)
  }
];
