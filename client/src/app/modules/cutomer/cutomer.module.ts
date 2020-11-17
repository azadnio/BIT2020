import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { MatModule} from'../mat.module';
import { CustomerViewComponent } from './customer-view/customer-view.component';



@NgModule({
  declarations: [CustomerComponent, CustomerViewComponent],
  imports: [
    CommonModule,
    MatModule
    
  ]
})
export class CustomerModule { }
