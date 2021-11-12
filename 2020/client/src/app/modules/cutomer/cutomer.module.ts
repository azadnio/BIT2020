import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AppCommonModule } from '../common/common.module';
import { CustomerAdminDashboardComponent } from './customers-admin-dashboard/customers-admin-dashboard.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ModalViewComponent } from './view-customer/modal-view/modal-view.component';
import { RouteViewComponent } from './view-customer/route-view/route-view.component';
import { NewCustomerComponent } from './new-customer/new-customer.component'

const routes: Routes = [
  { path: '', component: CustomerAdminDashboardComponent },
  { path: 'new', component: NewCustomerComponent },
  { path: ':id', component: RouteViewComponent },
  { path: ':id/edit', component: NewCustomerComponent }
];



@NgModule({
  declarations: [
    CustomerAdminDashboardComponent,
    ViewCustomerComponent,
    ModalViewComponent,
    RouteViewComponent,
    NewCustomerComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CustomerModule { }
