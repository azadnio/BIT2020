import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterParams } from 'src/app/core/common/common.classes';
import { UtilsService } from 'src/app/utils.service';
import { ICustomerDashboard, DASHBORAD_CUSTOMER_LIST } from '../../../../../../../interfaces/customer.interface';
import { ModalViewComponent } from '../view-customer/modal-view/modal-view.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.sass']
})
export class CustomerListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'city', 'phone', 'pedingChaeques', 'paymentBalance', 'lastPayment', 'status', 'commands'];

  dataSource = new MatTableDataSource<ICustomerDashboard>(DASHBORAD_CUSTOMER_LIST);

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
    public utils: UtilsService,
    public dialog: MatDialog
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
    // this.utils.setSearchURL(this.filterParams, this.location, url[0], url[1])
  }

  new() {

    this.filterParams.CustId = 'test';
    this.filterParams.CustName = 'myname';
  }

  searchById() {
    console.log(this.searchId)
  }

  view(id: any){

    return this.dialog.open(ModalViewComponent, {
      data: { id }
    });
  }

}