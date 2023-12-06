import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterParams } from 'src/app/core/common/common.classes';
import { OrderStatus } from 'src/app/core/common/common.enum';
import { IOrderDashboard, DASHBORAD_ORDER_LIST } from 'src/app/feature/client-account/orders/orders.component';
import { UtilsService } from 'src/app/utils.service';
import { ModalViewComponent } from '../view-order/modal-view/modal-view.component';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.sass']
})
export class OrdersListComponent  implements OnInit {

  displayedColumns: string[] = ['id', 'date', 'customer', 'amount', 'status', 'invoiceNo', 'commands'];

  dataSource = new MatTableDataSource<IOrderDashboard>(DASHBORAD_ORDER_LIST);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filterParams: FilterParams;
  filterForm: any;
  searchId: any;
  subscriptions: Subscription[];
  orderStatuses: any [];

  test: any;

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

    this.orderStatuses = this.utils.convertEnumToArray(OrderStatus, this.utils.oderStatusString);
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