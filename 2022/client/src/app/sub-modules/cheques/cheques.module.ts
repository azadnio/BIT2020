import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ChequesListComponent } from './home/cheques-list/cheques-list.component';
import { ViewChequeComponent } from './home/view-cheque/view-cheque.component';
import { ModalViewComponent } from './home/view-cheque/modal-view/modal-view.component';
import { RouteViewComponent as ChequesRouteViewComponent } from './home/view-cheque/route-view/route-view.component';
import { ROUTES, RouterModule } from '@angular/router';
import { AppCommonModule } from '../common/common.module';

const admin = true;

function routesFactory() {

  if (admin) 
    return [
      {
        path : '', component: HomeComponent, children: [
          { path: '', component: ChequesListComponent },
          { path: ':id', component: ChequesRouteViewComponent }
        ]
      }
    ];

  return [
    
  ]
}

@NgModule({
  declarations: [
    HomeComponent,
    ChequesListComponent,
    ViewChequeComponent,
    ModalViewComponent,
    ChequesRouteViewComponent
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
export class ChequesModule { }
