import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DASHBORAD_ORDER_LIST, IOrderDashboard } from '../../../../../interfaces/orders.interface';

@Component({
  selector: 'app-admin-orders-dashboard',
  templateUrl: './admin-orders-dashboard.component.html',
  styleUrls: ['./admin-orders-dashboard.component.scss']
})
export class AdminOrdersDashboardComponent implements OnInit {

  constructor() { }

  id: number
  date: string
  customer: string
  amount: number
  status: number
  invoiceNo: number

  displayedColumns: string[] = ['id', 'date', 'customer', 'amount', 'status', 'invoiceNo', 'commands'];

  dataSource = new MatTableDataSource<IOrderDashboard>(DASHBORAD_ORDER_LIST);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

}
