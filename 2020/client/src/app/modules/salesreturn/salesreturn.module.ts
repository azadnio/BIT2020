import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppCommonModule } from '../common/common.module';

import { NewSalesreturnComponent } from './new-salesreturn/new-salesreturn.component';
import { ViewSalesreturnComponent } from './view-salesreturn/view-salesreturn.component';
import { SalesreturnAdminDashboardComponent } from './salesreturn-admin-dashboard/salesreturn-admin-dashboard.component';
import { ModalViewComponent } from './view-salesreturn/modal-view/modal-view.component';
import { RouteViewComponent } from './view-salesreturn/route-view/route-view.component';

const routes: Routes = [
  { path: '', component: SalesreturnAdminDashboardComponent },
  { path: 'new', component: NewSalesreturnComponent },
  { path: ':id', component: RouteViewComponent },
  { path: ':id/edit', component: NewSalesreturnComponent },
];

@NgModule({
  declarations: [NewSalesreturnComponent, ViewSalesreturnComponent, SalesreturnAdminDashboardComponent, ModalViewComponent, RouteViewComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SalesreturnModule { }
