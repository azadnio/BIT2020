import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterParams } from 'src/app/core/common/common.classes';
import { UtilsService } from 'src/app/utils.service';
import { ISalesReturnDashboard, DASHBORAD_SALESRETURN } from '../../../../../../../interfaces/invoices.interface';

@Component({
  selector: 'app-salesreturn-list',
  templateUrl: './salesreturn-list.component.html',
  styleUrls: ['./salesreturn-list.component.sass']
})
export class SalesreturnListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'date', 'customer', 'amount', 'createdBy', 'commands'];

  dataSource = new MatTableDataSource<ISalesReturnDashboard>(DASHBORAD_SALESRETURN);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filterParams: FilterParams;
  filterForm: any;
  searchId: any;
  subscriptions: Subscription[];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    // private location: Location,
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
    // this.utils.setSearchURL(this.filterParams, this.location, url[0], url[1])
  }

  new() {

    this.filterParams.CustId = 'test';
    this.filterParams.CustName = 'myname';
  }

  view(id: any) {
    alert('view sales return')
  }

  searchById() {
    console.log(this.searchId)
  }

}
