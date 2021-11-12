import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppCommonModule } from '../common/common.module';

import { OrdersAdminDashboardComponent } from './orders-admin-dashboard/orders-admin-dashboard.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { ModalViewComponent } from './view-order/modal-view/modal-view.component';
import { RouteViewComponent } from './view-order/route-view/route-view.component';

const routes: Routes = [
  { path: '', component: OrdersAdminDashboardComponent },
  { path: 'new', component: NewOrderComponent },
  { path: ':id', component: RouteViewComponent },
  { path: ':id/edit', component: NewOrderComponent },
];

@NgModule({
  declarations: [OrdersAdminDashboardComponent, NewOrderComponent, ViewOrderComponent, ModalViewComponent, RouteViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppCommonModule
  ]
})
export class OrderModule { }
