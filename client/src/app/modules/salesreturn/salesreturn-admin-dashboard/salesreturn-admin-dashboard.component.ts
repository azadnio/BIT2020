import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { DASHBORAD_INVOICE_LIST, DASHBORAD_SALESRETURN, IInvoiceDashboard, ISalesReturnDashboard } from '../../../../../../interfaces/invoices.interface';
import { MatPaginator } from '@angular/material/paginator';
import { FilterParams } from 'src/app/common.classes';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-salesreturn-admin-dashboard',
  templateUrl: './salesreturn-admin-dashboard.component.html',
  styleUrls: ['./salesreturn-admin-dashboard.component.scss']
})
export class SalesreturnAdminDashboardComponent implements OnInit, OnDestroy {


  id: number
  date: string
  customer: string
  amount: number
  status: number
  createdBy: string

  displayedColumns: string[] = ['id', 'date', 'customer', 'amount', 'createdBy', 'commands'];

  dataSource = new MatTableDataSource<ISalesReturnDashboard>(DASHBORAD_SALESRETURN);

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

    let url = this.router.url.split('?');
    this.utils.setSearchURL(this.filterParams, this.location, url[0], url[1])
  }

  new() {

    this.filterParams.CustId = 'test';
    this.filterParams.CustName = 'myname';
  }

  view(id) {
    alert('view sales return')
  }

  searchById() {
    console.log(this.searchId)
  }

}

