
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryItemsComponent } from './category-items/category-items.component';
import { ItemViewComponent } from './item-view/item-view.component';
import { Routes, RouterModule } from '@angular/router';
import { ChItemComponent } from './ch-item/ch-item.component';
import { AppCommonModule } from '../common/common.module';
import { BrandItemsComponent } from './brand-items/brand-items.component';

const routes: Routes = [
  
  //show available categories
  { path: 'all', component: CategoryItemsComponent },
  
  //show available brands
  { path: 'brand', component: BrandItemsComponent },
  
  //show selected branded item
  { path: 'brand/:brandId', component: BrandItemsComponent },
  
  //show selected category item
  { path: ':categoryId/:itemId', component: CategoryItemsComponent },
  
  //route redirect
  { path: '', redirectTo: 'all', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    CategoryItemsComponent,
    ItemViewComponent,
    ChItemComponent,
    BrandItemsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppCommonModule
  ]
})
export class ItemsModule { }
