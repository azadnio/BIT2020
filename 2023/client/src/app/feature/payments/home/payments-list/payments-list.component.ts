import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterParams } from 'src/app/core/common/common.classes';
import { OrderStatus, PaymentType } from 'src/app/core/common/common.enum';
// import { IPaymentDashboard } from 'src/app/feature/client-account/payments/payments.component';
import { UtilsService } from 'src/app/utils.service';
import { DASHBORAD_PAYMENTS_LIST, IPaymentDashboard } from '../../../../../../../interfaces/payments.interface';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.sass']
})
export class PaymentsListComponent  implements OnInit {

  displayedColumns: string[] = ['id', 'date', 'customer', 'amount', 'paymentType', 'addedBy', 'comment', 'commands'];

  dataSource = new MatTableDataSource<IPaymentDashboard>(DASHBORAD_PAYMENTS_LIST);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  orderStatuses = OrderStatus

  filterParams: FilterParams;
  filterForm: any;
  searchId: any;
  subscriptions: Subscription[];
  paymentTypes: any [];

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
    this.paymentTypes = this.utils.convertEnumToArray(PaymentType, this.utils.paymentTypeString);

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {

    this.utils.unsubscribeSubscriptions(this.subscriptions);
  }

  view(id: any) {

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

}
