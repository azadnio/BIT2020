import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCommonModule } from '../common/common.module';
import { InvoicesAdminDashboardComponent } from './invoices-admin-dashboard/invoices-admin-dashboard.component';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { ModalViewComponent } from './view-invoice/modal-view/modal-view.component';
import { RouteViewComponent } from './view-invoice/route-view/route-view.component';

@NgModule({
  declarations: [
    InvoicesAdminDashboardComponent,
    NewInvoiceComponent,
    ViewInvoiceComponent,
    ModalViewComponent,
    RouteViewComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule
  ]
})
export class InvoiceModule { }
