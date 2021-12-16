import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AccountsListComponent } from './home/accounts-list/accounts-list.component';
import { ViewComponent } from './home/view/view.component';
import { ROUTES, RouterModule } from '@angular/router';
import { AppCommonModule } from '../common/common.module';

const admin = true;

function routesFactory() {

  if (admin) 
    return [
      {
        path : '', component: HomeComponent, children: [
          { path: '', component: AccountsListComponent },
          { path: ':id', component: ViewComponent }
        ]
      }
    ];

  return [
    
  ]
}

@NgModule({
  declarations: [
    HomeComponent,
    AccountsListComponent,
    ViewComponent
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
export class AccountsModule { }
