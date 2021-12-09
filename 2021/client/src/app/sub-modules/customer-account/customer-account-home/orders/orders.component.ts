import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderStatus } from 'src/app/sub-modules/common/common.enum';
import { UtilsService } from 'src/app/utils.service';
import { DASHBORAD_ORDER_LIST, IOrderDashboard } from '../../../../../../../interfaces/orders.interface';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['#', 'id', 'date', 'amount', 'status', 'invoiceno', 'commands'];
  dataSource = new MatTableDataSource<IOrderDashboard>(DASHBORAD_ORDER_LIST);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  orderStatuses: any = [];
  selected: any;

  constructor(private utils: UtilsService) {
    
    this.orderStatuses = this.utils.convertEnumToArray(OrderStatus, this.utils.oderStatusString);
    console.log(this.orderStatuses);
  }
  
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    //set the filter to status column
    this.dataSource.filterPredicate = (data, filter: string) => data.status == Number(filter);

  }

  view(id: number) {
    
  }

  filter(){
    this.dataSource.filter = this.selected;
  }
}
