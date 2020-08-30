import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { IndexComponent } from './index/index.component';
import { ItemsDashboardComponent } from './index/items-dashboard/items-dashboard.component';
import { AccountDashboardComponent } from './index/account-dashboard/account-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PagenotfoundComponent,
    IndexComponent,
    ItemsDashboardComponent,
    AccountDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
