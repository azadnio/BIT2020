import { AppCommonModule } from '../common/common.module';
import { AccountsDashboardComponent } from './accounts-dashboard/accounts-dashboard.component';

import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentsComponent } from './payments/payments.component';
import { ChequesComponent } from './cheques/cheques.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { SalesReturnsComponent } from './sales-returns/sales-returns.component';
import { LedgerComponent } from './ledger/ledger.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsDashboardComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'cheques', component: ChequesComponent },
      { path: 'invoices', component: InvoicesComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'salesreturns', component: SalesReturnsComponent },
      { path: 'ledger', component: LedgerComponent }
    ]
  }
];


@NgModule({
  declarations: [
    AccountsDashboardComponent,
    ProfileComponent,
    OrdersComponent,
    PaymentsComponent,
    ChequesComponent,
    InvoicesComponent,
    SalesReturnsComponent,
    LedgerComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerAccountsModule {
}
