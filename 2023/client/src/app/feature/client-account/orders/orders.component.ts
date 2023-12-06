import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();


export interface IOrderDashboard {

  id: number
  date:  Date,
  customer: string
  amount: number
  status: number
  invoiceNo: number
  comments: string
  customerId: number
}

let LIST2: IOrderDashboard[] = [];

for (let index = 1; index <= 100; index++)
    LIST2.push({
        id: index,
        customer: 'customer ' + index,
        date: new Date(),
        amount: 10 * index,
        customerId: index,
        status: index % 3,
        invoiceNo: index * 100 + 1,
        comments: 'this is a comment' + index        
    });

export const DASHBORAD_ORDER_LIST = LIST2;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass']
})
export class OrdersComponent implements OnInit {


  status = [
    {value: 'all', viewValue: 'All'},
    {value: 'processing', viewValue: 'Processing'},
    {value: 'withhold', viewValue: 'With Hold'},
    {value: 'new', viewValue: 'New'},
    {value: 'shipped', viewValue: 'Shipped'},
  ];

  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });

  displayedColumns: string[] = ['id', 'date', 'customer', 'amount', 'status', 'invoiceNo', 'commands'];

  dataSource = new MatTableDataSource<IOrderDashboard>(DASHBORAD_ORDER_LIST);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchId: any;

  constructor() { }

  public performSearch() {
    console.log("performing search");
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  searchById() {
    console.log(this.searchId)
  }

  view(id: any){

    // return this.dialog.open(ModalViewComponent, {
    //   data: { id }
    // });
  }
  
}
