import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DASHBORAD_CHEQUE_LIST, IDashboardCheque } from '../../../../../../../interfaces/cheques.interface';


@Component({
  selector: 'app-cheques',
  templateUrl: './cheques.component.html',
  styleUrls: ['./cheques.component.scss']
})
export class ChequesComponent implements OnInit {

  displayedColumns: string[] = ['#', 'chequeno', 'date', 'amount', 'status', 'paymentid', 'commands'];
  dataSource = new MatTableDataSource<IDashboardCheque>(DASHBORAD_CHEQUE_LIST);
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
