import { IChildTabs } from './../../../interfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts-dashboard',
  templateUrl: './accounts-dashboard.component.html',
  styleUrls: ['./accounts-dashboard.component.scss']
})
export class AccountsDashboardComponent implements OnInit {

  tabs: IChildTabs[] = [
    { label: 'Orders', path: 'orders' },
    { label: 'Payments', path: 'payments' },
    { label: 'Cheques', path: 'cheques' },
    { label: 'Invoices', path: 'invoices' },
    { label: 'Sales Returns', path: 'salesreturns' },
    { label: 'Ledger', path: 'ledger' },
    { label: 'profile', path: 'profile' },
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
