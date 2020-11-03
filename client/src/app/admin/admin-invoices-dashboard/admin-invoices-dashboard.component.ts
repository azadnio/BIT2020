import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DASHBORAD_INVOICE_LIST, IInvoiceDashboard } from '../../../../../interfaces/invoices.interface'

@Component({
  selector: 'app-admin-invoices-dashboard',
  templateUrl: './admin-invoices-dashboard.component.html',
  styleUrls: ['./admin-invoices-dashboard.component.scss']
})
export class AdminInvoicesDashboardComponent implements OnInit {

  constructor() { }

  id: number
  date: string
  customer: string
  amount: number
  status: number
  createdBy: string

  displayedColumns: string[] = ['id', 'date', 'customer', 'amount', 'status', 'createdBy', 'commands'];

  dataSource = new MatTableDataSource<IInvoiceDashboard>(DASHBORAD_INVOICE_LIST);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

}
