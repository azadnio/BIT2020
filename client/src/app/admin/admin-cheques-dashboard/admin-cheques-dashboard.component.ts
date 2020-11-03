import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DASHBORAD_CHEQUE_LIST, IDashboardCheque } from '../../../../../interfaces/cheques.interface';

@Component({
  selector: 'app-admin-cheques-dashboard',
  templateUrl: './admin-cheques-dashboard.component.html',
  styleUrls: ['./admin-cheques-dashboard.component.scss']
})
export class AdminChequesDashboardComponent implements OnInit {

  displayedColumns: string[] = ['id', 'number', 'date', 'amount', 'customer', 'status', 'paymentId', 'commands'];

  dataSource = new MatTableDataSource<IDashboardCheque>(DASHBORAD_CHEQUE_LIST);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

}
