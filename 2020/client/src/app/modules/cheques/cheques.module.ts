import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewChequeComponent } from './new-cheque/new-cheque.component';
import { ChequesAdminDashboardComponent } from './cheques-admin-dashboard/cheques-admin-dashboard.component';
import { ViewChequeComponent } from './view-cheque/view-cheque.component';
import { ModalViewComponent } from './view-cheque/modal-view/modal-view.component';
import { RouteViewComponent } from './view-cheque/route-view/route-view.component';
import { AppCommonModule } from '../common/common.module';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: ChequesAdminDashboardComponent },
  { path: 'new', component: NewChequeComponent },
  { path: ':id', component: RouteViewComponent },
  { path: ':id/edit', component: NewChequeComponent },
];


@NgModule({
  declarations: [NewChequeComponent, ChequesAdminDashboardComponent, ViewChequeComponent, ModalViewComponent, RouteViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppCommonModule
  ]
})
export class ChequesModule { }
