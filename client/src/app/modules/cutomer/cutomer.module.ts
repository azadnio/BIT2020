import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppCommonModule } from '../common/common.module';
import { CustomerAdminDashboardComponent } from './customers-admin-dashboard/customers-admin-dashboard.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ModalViewComponent } from './view-customer/modal-view/modal-view.component';
import { RouteViewComponent } from './view-customer/route-view/route-view.component';
import { NewCustomerComponent } from './new-customer/new-customer.component'


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
    RouterModule,
    AppCommonModule
  ]
})
export class CustomerModule { }
