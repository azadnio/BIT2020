import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { MatModule} from'../mat.module';



@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    MatModule
    
  ]
})
export class CustomerModule { }
