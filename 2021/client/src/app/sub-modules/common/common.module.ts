//angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//material components
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';

//custom common component
import { ReturnPageComponent } from './return-page.component';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';

//custom pipes
import {
  ChequeStatusesToStringPipe,
  CurrencyFormatPipe,
  DateFormatPipe,
  DateTimeFormatPipe,
  EntityStatusFormatPipe,
  OderStatusStringPipe,
  PaymentTypeStringPipe,
  PhoneNumberFormatPipe
} from '../../app.pipes'
import { HttpClientModule } from '@angular/common/http';

const customElements = [
  DateFormatPipe,
  DateTimeFormatPipe,
  CurrencyFormatPipe,
  PhoneNumberFormatPipe,
  PaymentTypeStringPipe,
  OderStatusStringPipe,
  ChequeStatusesToStringPipe,

  NotificationDialogComponent,
  ReturnPageComponent,
  EntityStatusFormatPipe
];

const angularModules = [
  FormsModule,
  RouterModule,
  HttpClientModule,
  ReactiveFormsModule
];

const matModules = [
  MatIconModule,
  MatRippleModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatMenuModule,
  MatDialogModule,
  MatDividerModule,
  MatListModule,
  MatTabsModule
];

@NgModule({
  declarations: customElements,
  imports: [
    CommonModule,
    ...angularModules,
    ...matModules
  ],
  exports: [
    MatIconModule,
    ...angularModules,
    ...matModules,
    ...customElements
  ]
})
export class AppCommonModule { }
