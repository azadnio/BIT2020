import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from 'src/app/common.enum';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public customerForm: FormGroup;
  public customerstatuses = [Status.active, Status.deleted];

  constructor(
    private formBuilder: FormBuilder,
    public utils: UtilsService
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

  submit() {
    console.log('submit form')
  }
}
