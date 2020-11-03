import { MatButtonModule } from '@angular/material/button';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentsComponent } from './payments/payments.component';
import { ChequesComponent } from './cheques/cheques.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { SalesReturnsComponent } from './sales-returns/sales-returns.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'cheques', component: ChequesComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'salesreturns', component: SalesReturnsComponent },
  { path: 'transactions', component: TransactionsComponent }
];


@NgModule({
  declarations: [
    ProfileComponent,
    OrdersComponent,
    PaymentsComponent,
    ChequesComponent,
    InvoicesComponent,
    SalesReturnsComponent,
    TransactionsComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule
  ]
})
export class AccountsModule {
}
