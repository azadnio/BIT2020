import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminProfileComponent } from './admin-profile/admin-profile.component'
import { ItemsDashboardComponent } from 'src/app/index/items-dashboard/items-dashboard.component';
import {MatIconModule} from '@angular/material/icon';
import { AdminCustomersDashboardComponent } from './admin-customers-dashboard/admin-customers-dashboard.component';
import { AdminOrdersDashboardComponent } from './admin-orders-dashboard/admin-orders-dashboard.component';
import { AdminInvoicesDashboardComponent } from './admin-invoices-dashboard/admin-invoices-dashboard.component';
import { AdminPaymentsDashboardComponent } from './admin-payments-dashboard/admin-payments-dashboard.component';
import { AdminAccountsDashboardComponent } from './admin-accounts-dashboard/admin-accounts-dashboard.component';
import { AdminChequesDashboardComponent } from './admin-cheques-dashboard/admin-cheques-dashboard.component';
import { AdminSalesReturnsDashboardComponent } from './admin-sales-returns-dashboard/admin-sales-returns-dashboard.component';
import { AdminReportsDashboardComponent } from './admin-reports-dashboard/admin-reports-dashboard.component';
import {AdminItemsDashboardComponent} from './admin-items-dashboard/admin-items-dashboard.component';
import {AdminSettingsComponent} from './admin-settings/admin-settings.component';


const routes: Routes = [
  { path: '', component: AdminDashboardComponent, children:[
    {path:'', component: AdminHomeComponent},
    { path: 'items', component: AdminItemsDashboardComponent },
    { path: 'customers', component: AdminCustomersDashboardComponent },
    { path: 'orders', component: AdminOrdersDashboardComponent },
    { path: 'payments', component: AdminPaymentsDashboardComponent },
    { path: 'accounts', component: AdminAccountsDashboardComponent },
    { path: 'cheques', component: AdminChequesDashboardComponent },
    { path: 'salesreturns', component: AdminSalesReturnsDashboardComponent },
    { path: 'reports', component: AdminReportsDashboardComponent },
    { path: 'invoices', component: AdminInvoicesDashboardComponent },
    { path: 'settings', component: AdminSettingsComponent },
    { path: 'profile', component: AdminProfileComponent },
  {
    path: 'items', component: ItemsDashboardComponent,
    loadChildren: () => import('../modules/items/items.module').then(m => m.ItemsModule)
  }
  ] }
  
];


@NgModule({
  declarations: [
    AdminDashboardComponent,
     AdminHomeComponent, 
     AdminCustomersDashboardComponent, 
     AdminOrdersDashboardComponent, 
     AdminInvoicesDashboardComponent, 
     AdminPaymentsDashboardComponent, 
     AdminAccountsDashboardComponent, 
     AdminChequesDashboardComponent, 
     AdminSalesReturnsDashboardComponent, 
     AdminReportsDashboardComponent,
     AdminItemsDashboardComponent
    ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule
  ]
})
export class AdminModule { }
