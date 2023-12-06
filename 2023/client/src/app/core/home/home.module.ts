import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { NavbarComponent } from './navbar/navbar.component';

import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HomeItemsComponent } from './route-components/home-items/home-items.component';
import { ItemsModule } from 'src/app/feature/items/items.module';
import { PromotionalItemsComponent } from './route-components/promotional-items/promotional-items.component';
import { AboutComponent } from './route-components/about/about.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { LoginModule } from '../login/login.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component';
import { AppCommonModule } from '../common/common.module';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [{
  path: '', component: IndexComponent, children: [
    { path: '', component: HomeItemsComponent },
    { path: 'promotions', component: PromotionalItemsComponent, data: { breadcrumb: 'Promotions' } },
    { path: 'about', component: AboutComponent, data: { breadcrumb: 'About us' } },
    { path: 'login', loadChildren: () => import('../login/login.module').then(m => m.LoginModule), data: { breadcrumb: 'About us' } },
    { path: 'cart', component: CartComponent, data: { breadcrumb: 'Cart' } },
    { path: 'account', loadChildren: () => import('../../feature/client-account/client-account.module').then(m => m.ClientAccountModule), data: { breadcrumb: 'My Account' } },

    { path: '**', component: NotFoundComponent }
  ]
}];


@NgModule({
  declarations: [
    IndexComponent,
    NavbarComponent,
    FooterComponent,
    HomeItemsComponent,
    PromotionalItemsComponent,
    AboutComponent,
    BreadcrumbComponent,
    NotFoundComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppCommonModule,
    MatIconModule,
    ItemsModule
  ]
})
export class HomeModule { }
