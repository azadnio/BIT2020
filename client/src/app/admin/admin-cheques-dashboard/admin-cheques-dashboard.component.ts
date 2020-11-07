import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterParams } from 'src/app/common.classes';
import { UtilsService } from 'src/app/utils.service';
import { ChequeStatus } from 'src/app/common.enum';
import { DASHBORAD_CHEQUE_LIST, IDashboardCheque } from '../../../../../interfaces/cheques.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-cheques-dashboard',
  templateUrl: './admin-cheques-dashboard.component.html',
  styleUrls: ['./admin-cheques-dashboard.component.scss']
})
export class AdminChequesDashboardComponent implements OnInit {

  displayedColumns: string[] = ['id', 'number', 'date', 'amount', 'customer', 'status', 'paymentId', 'commands'];

  dataSource = new MatTableDataSource<IDashboardCheque>(DASHBORAD_CHEQUE_LIST);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  chequeStatuses = ChequeStatus;

  filterParams: FilterParams;
  filterForm;
  chequeNumber;
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
    console.log(this.chequeNumber)
  }

}
