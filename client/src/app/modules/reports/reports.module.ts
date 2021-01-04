import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../common/common.module';
import { Routes, RouterModule } from '@angular/router';

import { SalesComponent } from './sales/sales.component';
import { CustomerComponent } from './customer/customer.component';
import { PaymentsComponent } from './payments/payments.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ChequesComponent } from './cheques/cheques.component';
import { OtherComponent } from './other/other.component';
import { ReportsAdminDashboardComponent } from './reports-admin-dashboard/reports-admin-dashboard.component';

const routes: Routes = [
  {
    path: '', component: ReportsAdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'sales', pathMatch: 'full' },
      { path: 'sales', component: SalesComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'cheques', component: ChequesComponent },
      { path: 'other', component: OtherComponent }
    ]
  }
];

@NgModule({
  declarations: [SalesComponent, CustomerComponent, PaymentsComponent, AccountsComponent, ChequesComponent, OtherComponent, ReportsAdminDashboardComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReportsModule { }
