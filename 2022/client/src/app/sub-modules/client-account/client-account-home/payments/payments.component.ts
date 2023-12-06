import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DASHBORAD_PAYMENTS_LIST, IPaymentDashboard } from '../../../../../../../interfaces/payments.interface';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  displayedColumns: string[] = ['#', 'id', 'date', 'amount', 'comments', 'commands'];
  dataSource = new MatTableDataSource<IPaymentDashboard>(DASHBORAD_PAYMENTS_LIST);
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
