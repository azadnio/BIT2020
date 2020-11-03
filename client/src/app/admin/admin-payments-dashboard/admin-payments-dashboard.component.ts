import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DASHBORAD_PAYMENTS_LIST, IPaymentsDashboard } from '../../../../../interfaces/customer.interface';
import { AdminFilterList } from 'src/app/common.classes';

@Component({
  selector: 'app-admin-payments-dashboard',
  templateUrl: './admin-payments-dashboard.component.html',
  styleUrls: ['./admin-payments-dashboard.component.scss']
})
export class AdminPaymentsDashboardComponent implements OnInit {

  displayedColumns: string[] = ['id', 'date', 'customer', 'paymentType', 'addedBy', 'comment', 'commands'];

  dataSource = new MatTableDataSource<IPaymentsDashboard>(DASHBORAD_PAYMENTS_LIST);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  filterForm;

  constructor(
    // private formBuilder: FormBuilder
  ){

    // this.filterForm = this.formBuilder.group(new AdminFilterList());
  }

  filter(value){
    console.log(value)
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

}
