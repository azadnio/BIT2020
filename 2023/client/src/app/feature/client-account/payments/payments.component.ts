import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterParams } from 'src/app/core/common/common.classes';
import { OrderStatus, PaymentType } from 'src/app/core/common/common.enum';
import { UtilsService } from 'src/app/utils.service';

export interface IPaymentDashboard {

  id: number
  date:  Date,
  customer: string
  amount: number
  paymentType : number
  invoiceNo: number
  comments: string
  customerId: number
}

let LIST2: IPaymentDashboard[] = [];

for (let index = 1; index <= 100; index++)
  LIST2.push({
      id: index,
      customer: 'customer ' + index,
      date: new Date(),
      amount: 10 * index,
      customerId: index,
      paymentType: index % 3,
      invoiceNo: index * 100 + 1,
      comments: 'this is a comment' + index        
  });

export const DASHBORAD_PAYMENTS_LIST = LIST2;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.sass']
})
export class PaymentsComponent implements OnInit {

  displayedColumns: string[] = ['#', 'id', 'date', 'amount', 'comments', 'commands'];
  dataSource = new MatTableDataSource<IPaymentDashboard>(DASHBORAD_PAYMENTS_LIST);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    
  }
  
  public performSearch() {
    console.log("performing search");
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  view(id: number) {
    
  }

}
