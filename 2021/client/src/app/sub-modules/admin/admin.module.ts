import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin-index/home/home.component';
import { AppCommonModule } from '../common/common.module';

const routes: Routes = [
  { path: '', component: AdminIndexComponent, children:[
    { path: 'home', component: HomeComponent },
    { path: 'customers', loadChildren:() => import('../customers/customers.module').then(m => m.CustomersModule) },
    { path: 'orders', loadChildren:() => import('../orders/orders.module').then(m => m.OrdersModule) }
  ] },
];

@NgModule({
  declarations: [
    AdminIndexComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
