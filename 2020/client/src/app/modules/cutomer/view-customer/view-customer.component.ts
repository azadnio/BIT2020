import { Component, Input, OnInit } from '@angular/core';
import { Customer } from '../../../../../../classes/Customer.calss'
import { DASHBORAD_CUSTOMER_LIST } from '../../../../../../interfaces/customer.interface';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {

  @Input() id;

  customer: Customer | any;

  constructor() { 
    
    // this.customer = new Customer();

    
  }

  ngOnInit(): void {

    //load customer
    this.customer = DASHBORAD_CUSTOMER_LIST.find(el => el.Id == this.id) || {}
  }

}
