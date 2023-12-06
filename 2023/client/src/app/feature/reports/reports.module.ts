import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ROUTES, RouterModule } from '@angular/router';
import { AppCommonModule } from 'src/app/core/common/common.module';
import { AccountsComponent } from './home/accounts/accounts.component';
import { ChequesComponent } from './home/cheques/cheques.component';
import { CustomerComponent } from './home/customer/customer.component';
import { OtherComponent } from './home/other/other.component';
import { PaymentsComponent } from './home/payments/payments.component';
import { SalesComponent } from './home/sales/sales.component';

const admin = true;

function routesFactory() {

  if (admin) 
    return [
      {
        path: '', component: HomeComponent,
        children: [
          { path: '', redirectTo: 'sales', pathMatch: 'full' },
          { path: 'sales', component: SalesComponent },
          { path: 'customer', component: CustomerComponent },
          { path: 'payments', component: PaymentsComponent },
          { path: 'accounts', component: AccountsComponent },
          { path: 'cheques', component: ChequesComponent },
          { path: 'other', component: OtherComponent }
        ]
      }
    ];

  return [
    
  ]
}

@NgModule({
  declarations: [
    HomeComponent,
    AccountsComponent,
    ChequesComponent,
    CustomerComponent,
    OtherComponent,
    PaymentsComponent,
    SalesComponent
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
export class ReportsModule { }
