import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AccountListComponent } from './home/account-list/account-list.component';
import { ViewComponent } from './home/view/view.component';
import { AppCommonModule } from 'src/app/core/common/common.module';
import { ROUTES, RouterModule } from '@angular/router';

const admin = true;

function routesFactory() {

  if (admin) 
    return [
      {
        path : '', component: HomeComponent, children: [
          { path: '', component: AccountListComponent },
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
    AccountListComponent,
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
