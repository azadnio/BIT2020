import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NewSalesreturnComponent } from './home/new-salesreturn/new-salesreturn.component';
import { ViewSalesreturnComponent } from './home/view-salesreturn/view-salesreturn.component';
import { ModalViewComponent } from './home/view-salesreturn/modal-view/modal-view.component';
import { RouteViewComponent as SalesreturnRouteViewComponent } from './home/view-salesreturn/route-view/route-view.component';
import { SalesreturnListComponent } from './home/salesreturn-list/salesreturn-list.component';
import { ROUTES, RouterModule } from '@angular/router';
import { AppCommonModule } from '../common/common.module';

const admin = true;

function routesFactory() {

  if (admin) 
    return [
      {
        path : '', component: HomeComponent, children: [
          { path: '', component: SalesreturnListComponent },
          { path: 'new', component: NewSalesreturnComponent  },
          { path: ':id', component: SalesreturnRouteViewComponent },
          { path: ':id/edit', component: NewSalesreturnComponent }
        ]
      }
    ];

  return [
    
  ]
}

@NgModule({
  declarations: [
    HomeComponent,
    NewSalesreturnComponent,
    ViewSalesreturnComponent,
    ModalViewComponent,
    SalesreturnRouteViewComponent,
    SalesreturnListComponent
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
export class SalesreturnModule { }
