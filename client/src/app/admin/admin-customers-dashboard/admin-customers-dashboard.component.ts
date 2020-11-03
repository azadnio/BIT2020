import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { DASHBORAD_CUSTOMER_LIST, ICustomerDashboard } from '../../../../../interfaces/customer.interface'

@Component({
  selector: 'app-admin-customers-dashboard',
  templateUrl: './admin-customers-dashboard.component.html',
  styleUrls: ['./admin-customers-dashboard.component.scss']
})
export class AdminCustomersDashboardComponent implements AfterViewInit {
  
  displayedColumns: string[] = ['id', 'name', 'city', 'phone', 'pedingChaeques', 'paymentBalance', 'status', 'commands'];

  dataSource = new MatTableDataSource<ICustomerDashboard>(DASHBORAD_CUSTOMER_LIST);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
