import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { IndexComponent } from './index/index.component';
import { ItemsDashboardComponent } from './index/items-dashboard/items-dashboard.component';
import { LoginComponent } from './index/login/login.component';
import { AppCommonModule } from './modules/common/common.module';

@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent,
    PagenotfoundComponent,
    IndexComponent,
    ItemsDashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
