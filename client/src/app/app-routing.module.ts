import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component'
import { IndexComponent } from './index/index.component';
import { ItemsDashboardComponent } from './index/items-dashboard/items-dashboard.component';
import { AccountDashboardComponent } from './index/account-dashboard/account-dashboard.component';

const routes: Routes = [
  {
    path: '', component: IndexComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'items', component: ItemsDashboardComponent,
        loadChildren: () => import('./modules/items/items.module').then(m => m.ItemsModule)
      },
      { path: 'account', component: AccountDashboardComponent,
      loadChildren: () => import('./modules/accounts/accounts.module').then(m => m.AccountsModule) }
    ]
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '', redirectTo: '/', pathMatch: 'full' }, // redirect to `home-component`
  { path: '**', component: PagenotfoundComponent },  // Wildcard route for a 404 page
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
