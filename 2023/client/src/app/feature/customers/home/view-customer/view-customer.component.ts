import { Component, Input, OnInit } from '@angular/core';
import { ICustomer, DASHBORAD_CUSTOMER_LIST } from '../../../../../../../interfaces/customer.interface';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.sass']
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

