import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './index/home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AppCommonModule } from './sub-modules/common/common.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { AboutComponent } from './index/about/about.component';
import { ContactComponent } from './index/contact/contact.component';
import { PrivacyPolicyComponent } from './index/privacy-policy/privacy-policy.component';
import { SalesReturnsDescComponent } from './index/sales-returns-desc/sales-returns-desc.component';
import { TermsandConditionComponent } from './index/termsand-condition/termsand-condition.component';
import { OrderCartComponent } from './index/order-cart/order-cart.component';
import { ProfileComponent } from './index/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomeComponent,
    LoginComponent,
    PagenotfoundComponent,
    AboutComponent,
    ContactComponent,
    PrivacyPolicyComponent,
    SalesReturnsDescComponent,
    TermsandConditionComponent,
    OrderCartComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppCommonModule,
    AppRoutingModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
