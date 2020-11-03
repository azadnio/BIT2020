import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryItemsComponent } from './category-items/category-items.component';
import { ItemViewComponent } from './item-view/item-view.component';
import { Routes, RouterModule } from '@angular/router';
import { ChItemComponent } from './ch-item/ch-item.component';
import { FormControl } from '@angular/forms';

const routes: Routes = [
  // { 
  //   path: '', component: CategoryItemsComponent, 
  //   children: [
      { path: ':categoryId', component: CategoryItemsComponent },
      { path: ':categoryId/:itemId', component: ItemViewComponent }
  //   ] 
  // }  
];

@NgModule({
  declarations: [CategoryItemsComponent, ItemViewComponent, ChItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    // FormControl
  ]
})
export class ItemsModule { }
