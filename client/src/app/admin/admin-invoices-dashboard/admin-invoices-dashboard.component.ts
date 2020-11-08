import { UtilsService } from 'src/app/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FilterParams } from './../../common.classes';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DASHBORAD_INVOICE_LIST, IInvoiceDashboard } from '../../../../../interfaces/invoices.interface'

import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-invoices-dashboard',
  templateUrl: './admin-invoices-dashboard.component.html',
  styleUrls: ['./admin-invoices-dashboard.component.scss']
})
export class AdminInvoicesDashboardComponent implements OnInit, OnDestroy {


  id: number
  date: string
  customer: string
  amount: number
  status: number
  createdBy: string

  displayedColumns: string[] = ['id', 'date', 'customer', 'amount', 'status', 'createdBy', 'commands'];

  dataSource = new MatTableDataSource<IInvoiceDashboard>(DASHBORAD_INVOICE_LIST);

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

  searchById() {
    console.log(this.searchId)
  }

}
