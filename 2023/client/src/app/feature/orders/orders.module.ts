import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { OrdersListComponent } from './home/orders-list/orders-list.component';
import { ViewOrderComponent } from './home/view-order/view-order.component';
import { ModalViewComponent } from './home/view-order/modal-view/modal-view.component';
import { RouteViewComponent } from './home/view-order/route-view/route-view.component';
import { ROUTES, RouterModule } from '@angular/router';
import { AppCommonModule } from 'src/app/core/common/common.module';
const admin = true;

function routesFactory() {

  if (admin) 
    return [
      {
        path : '', component: HomeComponent, children: [
          { path: '', component: OrdersListComponent },
          { path: ':id', component: RouteViewComponent }
        ]
      }
    ];

  return [
    
  ]
}



@NgModule({
  declarations: [
    HomeComponent,
    OrdersListComponent,
    ViewOrderComponent,
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
export class OrdersModule { }
