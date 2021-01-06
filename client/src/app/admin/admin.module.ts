
import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminProfileComponent } from './admin-profile/admin-profile.component'
// import { ItemsDashboardComponent } from 'src/app/index/items-dashboard/items-dashboard.component';


import { AdminAccountsDashboardComponent } from './admin-accounts-dashboard/admin-accounts-dashboard.component';
// import { AdminItemsDashboardComponent } from './admin-items-dashboard/admin-items-dashboard.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';

//custom modules
import { AppCommonModule } from '../modules/common/common.module';

const routes: Routes = [
  {
    path: '', component: AdminDashboardComponent, children: [
      { path: '', component: AdminHomeComponent },
      // { path: 'items', component: AdminItemsDashboardComponent },

      //load relavent modules for routes
      // TO DO add router guard // canLoad: [AuthGuard]
      { path: 'customers', loadChildren: () => import('src/app/modules/cutomer/cutomer.module').then(m => m.CustomerModule) },
      { path: 'payments', loadChildren: () => import('src/app/modules/payments/payments.module').then(m => m.PaymentsModule) },
      { path: 'invoices', loadChildren: () => import('src/app/modules/invoice/invoice.module').then(m => m.InvoiceModule) },
      { path: 'orders', loadChildren: () => import('src/app/modules/order/order.module').then(m => m.OrderModule) },
      { path: 'cheques', loadChildren: () => import('src/app/modules/cheques/cheques.module').then(m => m.ChequesModule) },
      { path: 'salesreturns', loadChildren: () => import('src/app/modules/salesreturn/salesreturn.module').then(m => m.SalesreturnModule) },
      { path: 'reports', loadChildren: () => import('src/app/modules/reports/reports.module').then(m => m.ReportsModule) },
      { path: 'items', loadChildren: () => import('src/app/modules/items/items.module').then(m => m.ItemsModule) },

      { path: 'accounts', component: AdminAccountsDashboardComponent },
      { path: 'settings', component: AdminSettingsComponent },
      { path: 'profile', component: AdminProfileComponent },
      // {
      //   path: 'items', component: ItemsDashboardComponent,
      //   loadChildren: () => import('../modules/items/items.module').then(m => m.ItemsModule)
      // }
    ]
  }

];


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminHomeComponent,
    AdminAccountsDashboardComponent,
    // AdminItemsDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppCommonModule
  ]
})
export class AdminModule { }
