import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DASHBORAD_SALESRETURN, ISalesReturnDashboard } from '../../../../../../../interfaces/invoices.interface';

@Component({
  selector: 'app-salesandreturns',
  templateUrl: './salesreturns.component.html',
  styleUrls: ['./salesreturns.component.scss']
})
export class SalesandreturnsComponent implements OnInit {

  displayedColumns: string[] = ['#', 'id', 'date', 'amount', 'createdby', 'commands'];
  dataSource = new MatTableDataSource<ISalesReturnDashboard>(DASHBORAD_SALESRETURN);
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
