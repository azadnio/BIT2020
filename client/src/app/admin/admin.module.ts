
import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminProfileComponent } from './admin-profile/admin-profile.component'
import { ItemsDashboardComponent } from 'src/app/index/items-dashboard/items-dashboard.component';

import { AdminOrdersDashboardComponent } from './admin-orders-dashboard/admin-orders-dashboard.component';
import { AdminPaymentsDashboardComponent } from './admin-payments-dashboard/admin-payments-dashboard.component';
import { AdminAccountsDashboardComponent } from './admin-accounts-dashboard/admin-accounts-dashboard.component';
import { AdminChequesDashboardComponent } from './admin-cheques-dashboard/admin-cheques-dashboard.component';
import { AdminSalesReturnsDashboardComponent } from './admin-sales-returns-dashboard/admin-sales-returns-dashboard.component';
import { AdminReportsDashboardComponent } from './admin-reports-dashboard/admin-reports-dashboard.component';
import { AdminItemsDashboardComponent } from './admin-items-dashboard/admin-items-dashboard.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';

import { CustomerModule } from 'src/app/modules/cutomer/cutomer.module';
import { InvoiceModule } from 'src/app/modules/invoice/invoice.module';
import { CustomerAdminDashboardComponent } from '../modules/cutomer/customers-admin-dashboard/customers-admin-dashboard.component';
import { InvoicesAdminDashboardComponent } from '../modules/invoice/invoices-admin-dashboard/invoices-admin-dashboard.component';
import { RouteViewComponent as CustomerRouteViewComponent} from '../modules/cutomer/view-customer/route-view/route-view.component';
import { RouteViewComponent as InvoiceRouteViewComponent } from '../modules/invoice/view-invoice/route-view/route-view.component';
import { NewCustomerComponent } from '../modules/cutomer/new-customer/new-customer.component';
import { AppCommonModule } from '../modules/common/common.module';
import { NewInvoiceComponent } from '../modules/invoice/new-invoice/new-invoice.component';
import { ViewInvoiceComponent } from '../modules/invoice/view-invoice/view-invoice.component';

const routes: Routes = [
  {
    path: '', component: AdminDashboardComponent, children: [
      { path: '', component: AdminHomeComponent },
      { path: 'items', component: AdminItemsDashboardComponent },

      //cutomer related routes
      { path: 'customers', component: CustomerAdminDashboardComponent },
      { path: 'customers/new', component: NewCustomerComponent },
      { path: 'customers/:id', component: CustomerRouteViewComponent },
      { path: 'customers/:id/edit', component: NewCustomerComponent },

      { path: 'orders', component: AdminOrdersDashboardComponent },
      { path: 'payments', component: AdminPaymentsDashboardComponent },
      { path: 'accounts', component: AdminAccountsDashboardComponent },
      { path: 'cheques', component: AdminChequesDashboardComponent },
      { path: 'salesreturns', component: AdminSalesReturnsDashboardComponent },
      { path: 'reports', component: AdminReportsDashboardComponent },

      //invoice related routes
      { path: 'invoices', component: InvoicesAdminDashboardComponent},
      { path: 'invoices/new', component: NewInvoiceComponent },
      { path: 'invoices/:id', component: InvoiceRouteViewComponent },
      { path: 'invoices/:id/edit', component: NewInvoiceComponent },

      { path: 'settings', component: AdminSettingsComponent },
      { path: 'profile', component: AdminProfileComponent },
      {
        path: 'items', component: ItemsDashboardComponent,
        loadChildren: () => import('../modules/items/items.module').then(m => m.ItemsModule)
      }
    ]
  }

];


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminHomeComponent,
    AdminOrdersDashboardComponent,
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

    AppCommonModule,
    CustomerModule,
    InvoiceModule
  ]
})
export class AdminModule { }
