import { Component, Input, OnInit } from '@angular/core';
import { TransactionType } from 'src/app/sub-modules/common/common.enum';
// import { Customer } from '../../../../../../../classes/Customer.calss';
import { DASHBORAD_CUSTOMER_LIST,ICustomer } from '../../../../../../../interfaces/customer.interface';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {

  @Input() id: any;

  customer: ICustomer | any;

  constructor() {     
  }

  ngOnInit(): void {

    //load customer
    this.customer = DASHBORAD_CUSTOMER_LIST.find(el => el.Id == this.id) || {};
  }

}

