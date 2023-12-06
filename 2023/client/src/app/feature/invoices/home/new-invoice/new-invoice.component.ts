import { Component, OnInit } from '@angular/core';
import { IInovice } from '../../../../../../../interfaces/invoices.interface';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.sass']
})
export class NewInvoiceComponent implements OnInit {

  invoice: IInovice;

  constructor() { 
    this.invoice = <IInovice> {};
  }

  ngOnInit(): void {
  }

}