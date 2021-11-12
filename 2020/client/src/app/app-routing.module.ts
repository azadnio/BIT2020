import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component'
import { IndexComponent } from './index/index.component';
import { ItemsDashboardComponent } from './index/items-dashboard/items-dashboard.component';
import { LoginComponent } from './index/login/login.component';

// const routes: Routes = [
//   {
//     path: '', component: IndexComponent,
//     children: [
//       { path: '', component: HomeComponent },
//       {
//         path: 'items', component: ItemsDashboardComponent,
//         loadChildren: () => import('./modules/items/items.module').then(m => m.ItemsModule)
//       },
//       {
//         path: 'account', component: AccountDashboardComponent,
//         loadChildren: () => import('./modules/accounts/accounts.module').then(m => m.AccountsModule)
//       }
//     ]
//   },
//   { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
//   { path: 'login', component: LoginComponent },
//   { path: '', redirectTo: '/', pathMatch: 'full' }, // redirect to `home-component`
//   { path: '**', component: PagenotfoundComponent },  // Wildcard route for a 404 page
// ];

const routes: Routes = [  
  {
    path: '',
    component: HomeComponent,
    // loadChildren: () => import('./modules/items/items.module').then(m => m.ItemsModule)
  },

  {
    path: 'account', loadChildren: () => import('./modules/customer-account/customer-account.module').then(m => m.CustomerAccountsModule)
  },

  {
    path: 'items', component: ItemsDashboardComponent,
    loadChildren: () => import('./modules/items/items.module').then(m => m.ItemsModule)
  },

  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },

  { path: 'login', component: LoginComponent },

  { path: '', redirectTo: '/', pathMatch: 'full' }, // redirect to `home-component`
  
  { path: '**', component: PagenotfoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }