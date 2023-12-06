import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { InvoicesListComponent } from './home/invoices-list/invoices-list.component';
import { NewInvoiceComponent } from './home/new-invoice/new-invoice.component';
import { ViewInvoiceComponent } from './home/view-invoice/view-invoice.component';
import { ModalViewComponent } from './home/view-invoice/modal-view/modal-view.component';
import { RouteViewComponent } from './home/view-invoice/route-view/route-view.component';
import { ROUTES, RouterModule } from '@angular/router';
import { AppCommonModule } from 'src/app/core/common/common.module';

const admin = true;

function routesFactory() {

  if (admin) 
    return [
      {
        path : '', component: HomeComponent, children: [
          { path: '', component: InvoicesListComponent },
          { path: 'new', component: NewInvoiceComponent },
          { path: ':id', component: RouteViewComponent },
          { path: ':id/edit', component: NewInvoiceComponent }
        ]
      }
    ];

  return [
    
  ]
}

@NgModule({
  declarations: [
    HomeComponent,
    InvoicesListComponent,
    NewInvoiceComponent,
    ViewInvoiceComponent,
    ModalViewComponent,
    RouteViewComponent
  ],
  providers: [{
    provide: ROUTES,
    useFactory: routesFactory,
    multi: true,
    deps: []
  }],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild([])
  ]
})
export class InvoicesModule { }
