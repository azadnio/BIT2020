import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Status } from 'src/app/common.enum';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent implements OnInit {

  public invoiceForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public utils: UtilsService,
    private appService: AppService
  ) {

    // CustId: number
    // InoviceDate: Date
    // Discount: number
    // Remark: string
    // OrderId: number
    // Items: InvoiceItem[]

    //set invoice form fields
    this.invoiceForm = this.formBuilder.group({

      CustId: [''],
      InvoiceDate: [new Date, Validators.required],
      Discount: ['', Validators.pattern("^[0-9]*$")],
      Remark: [''],
      OrderId:[''],
      

      // Name: ['', Validators.minLength(4)],
      // Address: ['', Validators.minLength(3)],
      // City: ['', Validators.minLength(3)],
      // NIC: ['', [Validators.minLength(10), Validators.maxLength(12)]],
      // Email: ['', Validators.email],
      // Telephone: [''],
      // Mobile: [''],
      // CreditLimit: [''],
      // Password: [''],
      // Image: [''],
      // Status: Status.active
    });
  }

  ngOnInit(): void {
  }

  onSubmit() { 

    //submit the invoice
  }

  selectCustomer() {
    alert('select customer')
  }
}
