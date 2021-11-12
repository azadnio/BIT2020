import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterParams } from 'src/app/common.classes';
import { UtilsService } from 'src/app/utils.service';
import { Location } from '@angular/common';
import { DASHBORAD_ORDER_LIST, IOrderDashboard } from '../../../../../../interfaces/orders.interface';

@Component({
  selector: 'app-orders-admin-dashboard',
  templateUrl: './orders-admin-dashboard.component.html',
  styleUrls: ['./orders-admin-dashboard.component.scss']
})
export class OrdersAdminDashboardComponent implements OnInit {


  displayedColumns: string[] = ['id', 'date', 'customer', 'amount', 'status', 'invoiceNo', 'commands'];

  dataSource = new MatTableDataSource<IOrderDashboard>(DASHBORAD_ORDER_LIST);

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
