import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { AppCommonModule } from '../common/common.module'


@NgModule({
  declarations: [CustomerComponent, CustomerViewComponent],
  imports: [
    CommonModule,
    AppCommonModule    
  ]
})
export class CustomerModule { }
