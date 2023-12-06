import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CustomerListComponent } from './home/customer-list/customer-list.component';
import { NewCustomerComponent } from './home/new-customer/new-customer.component';
import { ViewCustomerComponent } from './home/view-customer/view-customer.component';
import { ModalViewComponent } from './home/view-customer/modal-view/modal-view.component';
import { RouteViewComponent as CustomerRouteViewComponent, RouteViewComponent } from './home/view-customer/route-view/route-view.component';
import { ROUTES, RouterModule } from '@angular/router';
import { AppCommonModule } from 'src/app/core/common/common.module';

//to do add conditional routes
const admin = true;

function routesFactory() {

  if (admin) 
    return [
      {
        path : '', component: HomeComponent, children: [
          { path: '', component: CustomerListComponent },
          { path: 'new', component: NewCustomerComponent  },
          { path: ':id', component: CustomerRouteViewComponent },
          { path: ':id/edit', component: NewCustomerComponent }
        ]
      }
    ];

  return [
    
  ]
}

@NgModule({
  declarations: [
    HomeComponent,
    CustomerListComponent,
    NewCustomerComponent,
    ViewCustomerComponent,
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
export class CustomersModule { }
