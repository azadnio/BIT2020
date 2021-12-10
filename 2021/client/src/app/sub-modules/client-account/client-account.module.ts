import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent as CustomerAccountHomeComponent } from './client-account-home/client-account-home.component';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './client-account-home/orders/orders.component';
import { PaymentsComponent } from './client-account-home/payments/payments.component';
import { ChequesComponent } from './client-account-home/cheques/cheques.component';
import { InvoicesComponent } from './client-account-home/invoices/invoices.component';
import { SalesandreturnsComponent } from './client-account-home/salesreturns/salesreturns.component';
import { LedgerComponent } from './client-account-home/ledger/ledger.component';
import { ProfileComponent } from './client-account-home/profile/profile.component';
import { HomeComponent } from './client-account-home/home/home.component';
import { AppCommonModule } from '../common/common.module';
import { ViewOrderComponent } from './client-account-home/orders/view-order/view-order.component';
import { ViewPaymentComponent } from './client-account-home/payments/view-payment/view-payment.component';
import { ViewChequeComponent } from './client-account-home/cheques/view-cheque/view-cheque.component';
import { ViewInvoiceComponent } from './client-account-home/invoices/view-invoice/view-invoice.component';
import { ViewSalesreturnComponent } from './client-account-home/salesreturns/view-salesreturn/view-salesreturn.component';

const routes: Routes = [
  { path: '', component: CustomerAccountHomeComponent, data: { breadcrumb: 'Account' },
    children: [
      { path: '', component: HomeComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'orders/:id', component: ViewOrderComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'payments/:id', component: ViewPaymentComponent },
      { path: 'cheques', component: ChequesComponent },
      { path: 'invoices', component: InvoicesComponent },
      { path: 'invoices/:id', component: ViewInvoiceComponent },
      { path: 'salesandreturns', component: SalesandreturnsComponent },
      { path: 'salesandreturns/:id', component: ViewSalesreturnComponent },
      { path: 'ledger', component: LedgerComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  },
];

@NgModule({
  declarations: [
    CustomerAccountHomeComponent,
    OrdersComponent,
    PaymentsComponent,
    ChequesComponent,
    InvoicesComponent,
    SalesandreturnsComponent,
    LedgerComponent,
    ProfileComponent,
    HomeComponent,
    ViewOrderComponent,
    ViewPaymentComponent,
    ViewChequeComponent,
    ViewInvoiceComponent,
    ViewSalesreturnComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerAccountModule { }
