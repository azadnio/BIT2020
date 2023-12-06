import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ISalesReturnDashboard, DASHBORAD_SALESRETURN } from '../../../../../../interfaces/invoices.interface';

@Component({
  selector: 'app-sales-return',
  templateUrl: './sales-return.component.html',
  styleUrls: ['./sales-return.component.sass']
})
export class SalesReturnComponent implements OnInit {

  displayedColumns: string[] = ['#', 'id', 'date', 'amount', 'createdby', 'commands'];
  dataSource = new MatTableDataSource<ISalesReturnDashboard>(DASHBORAD_SALESRETURN);
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
