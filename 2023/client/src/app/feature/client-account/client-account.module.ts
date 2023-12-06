import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { PaymentsComponent } from './payments/payments.component';
import { ChequesComponent } from './cheques/cheques.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { SalesReturnComponent } from './sales-return/sales-return.component';
import { LedgerComponent } from './ledger/ledger.component';
import { ProfileComponent } from './profile/profile.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppCommonModule } from 'src/app/core/common/common.module';

const routes: Routes = [{
  path: '',
  component: IndexComponent,
  children: [
    { path: 'orders', component: OrdersComponent },
    { path: 'payments', component: PaymentsComponent },
    { path: 'cheques', component: ChequesComponent },
    { path: 'invoices', component: InvoicesComponent },
    { path: 'sales-return', component: SalesReturnComponent },
    { path: 'ledger', component: LedgerComponent },
    { path: 'profile', component: ProfileComponent }, 
    { path: '', redirectTo: 'orders', pathMatch: 'full' }
  ]
}];

@NgModule({
  declarations: [
    IndexComponent,
    OrdersComponent,
    PaymentsComponent,
    ChequesComponent,
    InvoicesComponent,
    SalesReturnComponent,
    LedgerComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    AppCommonModule
  ]
})
export class ClientAccountModule { }
