import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent as CustomerAccountHomeComponent } from './customer-account-home/customer-account-home.component';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './customer-account-home/orders/orders.component';
import { PaymentsComponent } from './customer-account-home/payments/payments.component';
import { ChequesComponent } from './customer-account-home/cheques/cheques.component';
import { InvoicesComponent } from './customer-account-home/invoices/invoices.component';
import { SalesandreturnsComponent } from './customer-account-home/salesreturns/salesreturns.component';
import { LedgerComponent } from './customer-account-home/ledger/ledger.component';
import { ProfileComponent } from './customer-account-home/profile/profile.component';
import { HomeComponent } from './customer-account-home/home/home.component';
import { AppCommonModule } from '../common/common.module';
import { ViewOrderComponent } from './customer-account-home/orders/view-order/view-order.component';
import { ViewPaymentComponent } from './customer-account-home/payments/view-payment/view-payment.component';
import { ViewChequeComponent } from './customer-account-home/cheques/view-cheque/view-cheque.component';
import { ViewInvoiceComponent } from './customer-account-home/invoices/view-invoice/view-invoice.component';
import { ViewSalesreturnComponent } from './customer-account-home/salesreturns/view-salesreturn/view-salesreturn.component';

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
