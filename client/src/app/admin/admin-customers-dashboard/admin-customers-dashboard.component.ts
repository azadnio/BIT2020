import { UtilsService } from './../../utils.service';
import { Subscription } from 'rxjs';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FilterParams } from 'src/app/common.classes';

import { DASHBORAD_CUSTOMER_LIST, ICustomerDashboard } from '../../../../../interfaces/customer.interface'
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-customers-dashboard',
  templateUrl: './admin-customers-dashboard.component.html',
  styleUrls: ['./admin-customers-dashboard.component.scss']
})
export class AdminCustomersDashboardComponent implements AfterViewInit {
  
  displayedColumns: string[] = ['id', 'name', 'city', 'phone', 'pedingChaeques', 'paymentBalance', 'lastPayment', 'status', 'commands'];

  dataSource = new MatTableDataSource<ICustomerDashboard>(DASHBORAD_CUSTOMER_LIST);

  @ViewChild(MatPaginator) paginator: MatPaginator;

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

  restFilter() {
    
    this.filterParams = new FilterParams();
  }

  filter() {
    console.log( this.filterParams);
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
