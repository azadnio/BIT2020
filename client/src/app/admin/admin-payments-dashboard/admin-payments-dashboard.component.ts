import { UtilsService } from './../../utils.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DASHBORAD_PAYMENTS_LIST, IPaymentsDashboard } from '../../../../../interfaces/customer.interface';
import { FilterParams } from 'src/app/common.classes';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-payments-dashboard',
  templateUrl: './admin-payments-dashboard.component.html',
  styleUrls: ['./admin-payments-dashboard.component.scss']
})
export class AdminPaymentsDashboardComponent implements OnInit {

  displayedColumns: string[] = ['id', 'date', 'customer', 'paymentType', 'addedBy', 'comment', 'commands'];

  dataSource = new MatTableDataSource<IPaymentsDashboard>(DASHBORAD_PAYMENTS_LIST);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  filterParams: FilterParams;
  filterForm;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private utils: UtilsService
  ) {

   this.filterParams = new FilterParams()

    this.filterForm = this.formBuilder.group(this.filterParams);

    this.activatedRoute.queryParamMap
      .subscribe((params) => {

        // let custId = params['custId'];

        // this.location.go(`${this.route.url}?custId=${custId}` );
        console.log('query params', params)
      }
      );
  }

  filter(value) {
    console.log(value)
  }

  new() {

    this.filterParams.customerId = 'test';
    this.filterParams.customerName = 'myname';

    this.utils.setSearchURL(this.filterParams, this.location, this.router.url.split('?')[0] );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

}
