
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/public/home/home.component').then(
        (m) => m.HomeComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/public/products/products.component').then(
        (m) => m.ProductsComponent,
      ),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./features/public/products/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent,
      ),
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./features/public/about-us/about-us.component').then(
        (m) => m.AboutUsComponent,
      ),
  },
  {
    path: 'contact-us',
    loadComponent: () =>
      import('./features/public/contact-us/contact-us.component').then(
        (m) => m.ContactUsComponent,
      ),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./features/public/privacy-policy/privacy-policy.component').then(
        (m) => m.PrivacyPolicyComponent,
      ),
  },
  {
    path: 'customer',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['customer'] },
    loadChildren: () =>
      import('./features/customer/customer.routes').then(
        (m) => m.customerRoutes,
      ),
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'manager', 'staff'] },
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.adminRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
