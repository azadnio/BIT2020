import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from 'src/app/common.enum';
import { UtilsService } from 'src/app/utils.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {

  public customerForm: FormGroup;
  public customerstatuses = [Status.active, Status.deleted];

  constructor(
    private formBuilder: FormBuilder,
    public utils: UtilsService,
    private appService: AppService,
    // prrivate customerService: CustomerService //DISSERTATION
  ) {

    //set customer form fields
    this.customerForm = this.formBuilder.group({
      Name: ['', Validators.minLength(4)],
      Address: ['', Validators.minLength(3)],
      City: ['', Validators.minLength(3)],
      NIC: ['', [Validators.minLength(10), Validators.maxLength(12)]],
      Email: ['', Validators.email],
      Telephone: [''],
      Mobile: [''],
      CreditLimit: [''],
      Password: [''],
      Image: [''],
      Status: Status.active
    });
  }

  ngOnInit(): void {
  }

  // onSubmit(values) { //DISSERTATION
    onSubmit() {
    
    //DISSERTATION
    // this.customerService.createNewCustomer(values).then(e =>{
    //   this.appService.showSuccessMessage('Customer Successfully created')
    // });
  }

}
