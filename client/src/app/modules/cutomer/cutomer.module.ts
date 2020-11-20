import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CustomerComponent } from './customer/customer.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { AppCommonModule } from '../common/common.module';
import { CustomerAdminDashboardComponent } from './customers-admin-dashboard/customers-admin-dashboard.component';
import { CustomerModalViewComponent } from './customer-modal-view/customer-modal-view.component'


@NgModule({
  declarations: [CustomerComponent, CustomerViewComponent, CustomerAdminDashboardComponent, CustomerModalViewComponent],
  imports: [
    CommonModule,
    RouterModule,
    AppCommonModule    
  ]
})
export class CustomerModule { }
