import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './index/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AppCommonModule } from 'src/app/core/common/common.module';

const routes: Routes = [
  { path: '', component: IndexComponent, children:[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'items', loadChildren:() => import('../items/items.module').then(m => m.ItemsModule) },
    { path: 'customers', loadChildren:() => import('../customers/customers.module').then(m => m.CustomersModule) },
    { path: 'orders', loadChildren:() => import('../orders/orders.module').then(m => m.OrdersModule) },
    { path: 'invoices', loadChildren:() => import('../invoices/invoices.module').then(m => m.InvoicesModule) },
    { path: 'payments', loadChildren:() => import('../payments/payments.module').then(m => m.PaymentsModule) },
    { path: 'accounts', loadChildren:() => import('../accounts/accounts.module').then(m => m.AccountsModule) },
    { path: 'cheques', loadChildren:() => import('../cheques/cheques.module').then(m => m.ChequesModule) },
    { path: 'salesreturn', loadChildren:() => import('../salesreturn/salesreturn.module').then(m => m.SalesreturnModule) },
    { path: 'reports', loadChildren:() => import('../reports/reports.module').then(m => m.ReportsModule) }
  ] },
  // { path: '', redirectTo: '/',  }, 
];

@NgModule({
  declarations: [
    IndexComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
