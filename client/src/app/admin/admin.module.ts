
import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminProfileComponent } from './admin-profile/admin-profile.component'
import { ItemsDashboardComponent } from 'src/app/index/items-dashboard/items-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
// import { AdminCustomersDashboardComponent } from './admin-customers-dashboard/admin-customers-dashboard.component';
import { AdminOrdersDashboardComponent } from './admin-orders-dashboard/admin-orders-dashboard.component';
import { AdminInvoicesDashboardComponent } from './admin-invoices-dashboard/admin-invoices-dashboard.component';
import { AdminPaymentsDashboardComponent } from './admin-payments-dashboard/admin-payments-dashboard.component';
import { AdminAccountsDashboardComponent } from './admin-accounts-dashboard/admin-accounts-dashboard.component';
import { AdminChequesDashboardComponent } from './admin-cheques-dashboard/admin-cheques-dashboard.component';
import { AdminSalesReturnsDashboardComponent } from './admin-sales-returns-dashboard/admin-sales-returns-dashboard.component';
import { AdminReportsDashboardComponent } from './admin-reports-dashboard/admin-reports-dashboard.component';
import { AdminItemsDashboardComponent } from './admin-items-dashboard/admin-items-dashboard.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CustomerModule } from 'src/app/modules/cutomer/cutomer.module'
import { CustomerAdminDashboardComponent } from '../modules/cutomer/customers-admin-dashboard/customers-admin-dashboard.component';
import { RouteViewComponent as CustomerRouteViewComponent} from '../modules/cutomer/view-customer/route-view/route-view.component';
import { NewCustomerComponent } from '../modules/cutomer/new-customer/new-customer.component';

const routes: Routes = [
  {
    path: '', component: AdminDashboardComponent, children: [
      { path: '', component: AdminHomeComponent },
      { path: 'items', component: AdminItemsDashboardComponent },
      { path: 'customers', component: CustomerAdminDashboardComponent },
      { path: 'customers/new', component: NewCustomerComponent },
      { path: 'customers/:id', component: CustomerRouteViewComponent },
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
    ]
  }

];


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminHomeComponent,
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

    CustomerModule,

    MatIconModule,
    MatRippleModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ]
})
export class AdminModule { }
