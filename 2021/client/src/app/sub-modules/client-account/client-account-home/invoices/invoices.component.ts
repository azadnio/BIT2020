import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DASHBORAD_INVOICE_LIST, IInvoiceDashboard } from '../../../../../../../interfaces/invoices.interface';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  displayedColumns: string[] = ['#', 'id', 'date', 'amount', 'createdby', 'commands'];
  dataSource = new MatTableDataSource<IInvoiceDashboard>(DASHBORAD_INVOICE_LIST);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    
  }
  
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  view(id: number) {
    
  }

}
