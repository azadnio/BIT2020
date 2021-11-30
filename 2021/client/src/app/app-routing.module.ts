import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './index/about/about.component';
import { ContactComponent } from './index/contact/contact.component';
import { HomeComponent } from './index/home/home.component';
import { IndexComponent } from './index/index.component';
import { OrderCartComponent } from './index/order-cart/order-cart.component';
import { PrivacyPolicyComponent } from './index/privacy-policy/privacy-policy.component';
import { SalesReturnsDescComponent } from './index/sales-returns-desc/sales-returns-desc.component';
import { TermsandConditionComponent } from './index/termsand-condition/termsand-condition.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: '', component: IndexComponent,
    children: [
      { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
      { path: 'about', component: AboutComponent, data: { breadcrumb: 'About' } },
      { path: 'contact', component: ContactComponent, data: { breadcrumb: 'Contact' } },
      { path: 'login', component: LoginComponent, data: { breadcrumb: 'Login' } },
      { path: 'privacypolicy', component: PrivacyPolicyComponent, data: { breadcrumb: 'Privacy Policy' } },
      { path: 'salesandreturn', component: SalesReturnsDescComponent, data: { breadcrumb: 'Sales And Return' } },
      { path: 'termsandcondition', component: TermsandConditionComponent, data: { breadcrumb: 'Terms And Condtions' } },
      { path: 'cart', component: OrderCartComponent, data: { breadcrumb: 'Order Cart' } },
      { path: 'items', loadChildren: () => import('./sub-modules/items/items.module').then(m => m.ItemsModule), data: { breadcrumb: 'Items' } },
    ]
  },
  { path: 'admin', loadChildren: () => import('./sub-modules/admin/admin.module').then(m => m.AdminModule) },  
  { path: '', redirectTo: '/', pathMatch: 'full' }, // redirect to `home-component`
  { path: '**', component: PagenotfoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
