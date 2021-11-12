import { OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterParams } from 'src/app/common.classes';
import { OrderStatus } from 'src/app/common.enum';
import { UtilsService } from 'src/app/utils.service';
import { Location } from '@angular/common';
import { DASHBORAD_PAYMENTS_LIST, IPaymentsDashboard } from '../../../../../../interfaces/customer.interface';

@Component({
  selector: 'app-payments-admin-dashboard',
  templateUrl: './payments-admin-dashboard.component.html',
  styleUrls: ['./payments-admin-dashboard.component.scss']
})
export class PaymentsAdminDashboardComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'date', 'customer', 'paymentType', 'addedBy', 'comment', 'commands'];

  dataSource = new MatTableDataSource<IPaymentsDashboard>(DASHBORAD_PAYMENTS_LIST);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  orderStatuses = OrderStatus

  filterParams: FilterParams;
  filterForm;
  searchId;
  subscriptions: Subscription[];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    public utils: UtilsService
  ) {

    this.subscriptions = [];
    this.filterParams = new FilterParams();

    let sub = this.activatedRoute.queryParamMap
      .subscribe((queryParam: any) => {

        let params = queryParam.params as FilterParams;
        if (params) {

          this.filterParams = { ...this.filterParams, ...params };


          //load the list
        }
      });

    this.subscriptions.push(sub);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {

    this.utils.unsubscribeSubscriptions(this.subscriptions);
  }

  view(id) {
    
  }

  restFilter() {

    this.filterParams = new FilterParams();
  }

  filter() {
    console.log(this.filterParams);
    let url = this.router.url.split('?');
    this.utils.setSearchURL(this.filterParams, this.location, url[0], url[1])
  }

  new() {

    this.filterParams.CustId = 'test';
    this.filterParams.CustName = 'myname';
  }

  searchById() {
    console.log(this.searchId)
  }

}

