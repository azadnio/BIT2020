import { IChildTabs } from './../../../interfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts-dashboard',
  templateUrl: './accounts-dashboard.component.html',
  styleUrls: ['./accounts-dashboard.component.scss']
})
export class AccountsDashboardComponent implements OnInit {

  tabs: IChildTabs [] = [
    {label : 'profile', path: 'profile' },
    {label : 'profile', path: 'profile' },
    {label : 'profile', path: 'profile' },
    {label : 'profile', path: 'profile' },
    {label : 'profile', path: 'profile' },
    {label : 'profile', path: 'profile' },
    {label : 'profile', path: 'profile' },
  ];

  { path: 'profile', component: ProfileComponent },
  { path: '', component: OrdersComponent },
  { path: 'cheques', component: ChequesComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'salesreturns', component: SalesReturnsComponent },
  { path: 'transactions', component: TransactionsComponent }

  constructor() { }

  ngOnInit(): void {
  }

}
