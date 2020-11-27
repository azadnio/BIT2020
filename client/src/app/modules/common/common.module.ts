//angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

//custom common component
import { ReturnPageComponent } from './return-page.component';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

//custom pipes
import { CurrencyFormatPipe, DateFormatPipe, DateTimeFormatPipe, EntityStatusFormatPipe, PhoneNumberFormatPipe } from './app.pipes'

const customElements = [
  DateFormatPipe,
  DateTimeFormatPipe,
  CurrencyFormatPipe,
  PhoneNumberFormatPipe,
  NotificationDialogComponent,
  ReturnPageComponent,
  EntityStatusFormatPipe
];

const matModules = [
  MatIconModule,
  MatRippleModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule,
  ReactiveFormsModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatMenuModule,
  MatDialogModule
];

@NgModule({
  declarations: customElements,
  imports: [
    CommonModule,    
    ...matModules
  ],
  exports:[
    MatIconModule,
    ...matModules,
    ...customElements
  ]
})
export class AppCommonModule { }
