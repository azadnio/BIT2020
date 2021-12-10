import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersListComponent } from './home/customers-list/customers-list.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes, ROUTES } from '@angular/router';
import { NewCustomerComponent } from './home/new-customer/new-customer.component';
import { ViewCustomerComponent } from './home/view-customer/view-customer.component';
import { AppCommonModule } from '../common/common.module';
import { ModalViewComponent } from './home/view-customer/modal-view/modal-view.component';
import { RouteViewComponent as CustomerRouteViewComponent } from './home/view-customer/route-view/route-view.component';

//to do add conditional routes
const admin = true;

function routesFactory() {

  if (admin) 
    return [
      {
        path : '', component: HomeComponent, children: [
          { path: '', component: CustomersListComponent },
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
    CustomersListComponent,
    HomeComponent,
    NewCustomerComponent,
    ViewCustomerComponent,
    ModalViewComponent,
    CustomerRouteViewComponent
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
