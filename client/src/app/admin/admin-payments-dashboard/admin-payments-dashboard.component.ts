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

    this.filterParams = new FilterParams();
    this.initFormBuilder();

    this.activatedRoute.queryParamMap
      .subscribe((queryParam: any) => {

        let params = queryParam.params as FilterParams;
        if (params) {

          this.filterParams = { ...this.filterParams, ...params };
          this.initFormBuilder();

          //load the list
        }          
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

  initFormBuilder() {

    this.filterForm = this.formBuilder.group({
      customerId: ''
    });
  }

  filter(value) {
    console.log(value, this.filterParams);
    let url = this.router.url.split('?');
    this.utils.setSearchURL(value, this.location, url[0], url[1])
  }

  new() {

    this.filterParams.customerId = 'test';
    this.filterParams.customerName = 'myname';
  }
}
