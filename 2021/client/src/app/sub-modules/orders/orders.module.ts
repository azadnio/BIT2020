import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ViewOrderComponent } from './home/view-order/view-order.component';
import { RouteViewComponent as OrdersRouteViewComponent } from './home/view-order/route-view/route-view.component';
import { ModalViewComponent } from './home/view-order/modal-view/modal-view.component';
import { OrdersListComponent } from './home/orders-list/orders-list.component';
import { AppCommonModule } from '../common/common.module';
import { ROUTES, RouterModule } from '@angular/router';

const admin = true;

function routesFactory() {

  if (admin) 
    return [
      {
        path : '', component: HomeComponent, children: [
          { path: '', component: OrdersListComponent },
          { path: ':id', component: OrdersRouteViewComponent }
        ]
      }
    ];

  return [
    
  ]
}


@NgModule({
  declarations: [
    HomeComponent,
    ViewOrderComponent,
    OrdersRouteViewComponent,
    ModalViewComponent,
    OrdersListComponent
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
export class OrdersModule { }
