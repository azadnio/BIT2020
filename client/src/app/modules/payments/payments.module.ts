import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../common/common.module';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsAdminDashboardComponent } from './payments-admin-dashboard/payments-admin-dashboard.component';
import { NewPaymentComponent } from './new-payment/new-payment.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';
import { ModalViewComponent } from './view-payment/modal-view/modal-view.component';
import { RouteViewComponent } from './view-payment/route-view/route-view.component';

const routes: Routes = [
  { path: '', component: PaymentsAdminDashboardComponent },
  { path: 'new', component: NewPaymentComponent },
  { path: ':id', component: RouteViewComponent },
  { path: ':id/edit', component: NewPaymentComponent },
];

@NgModule({
  declarations: [
    PaymentsAdminDashboardComponent,
    NewPaymentComponent,
    ViewPaymentComponent,
    ModalViewComponent,
    RouteViewComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PaymentsModule { }
