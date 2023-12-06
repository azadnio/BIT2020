import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NewPaymentComponent } from './home/new-payment/new-payment.component';
import { PaymentsListComponent } from './home/payments-list/payments-list.component';
import { ViewPaymentComponent } from './home/view-payment/view-payment.component';
import { ModalViewComponent } from './home/view-payment/modal-view/modal-view.component';
import { RouteViewComponent } from './home/view-payment/route-view/route-view.component';
import { ROUTES, RouterModule } from '@angular/router';
import { AppCommonModule } from 'src/app/core/common/common.module';

const admin = true;

function routesFactory() {

  if (admin) 
    return [
      {
        path : '', component: HomeComponent, children: [
          { path: '', component: PaymentsListComponent },
          { path: 'new', component: NewPaymentComponent },
          { path: ':id', component: RouteViewComponent },
          { path: ':id/edit', component: NewPaymentComponent }
        ]
      }
    ];

  return [
    
  ]
}

@NgModule({
  declarations: [
    HomeComponent,
    NewPaymentComponent,
    PaymentsListComponent,
    ViewPaymentComponent,
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
export class PaymentsModule { }
