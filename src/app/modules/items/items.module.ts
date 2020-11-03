import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryItemsComponent } from './category-items/category-items.component';
import { ItemViewComponent } from './item-view/item-view.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: ':categoryId', component: CategoryItemsComponent },
  { path: ':categoryId/:itemId', component: ItemViewComponent }
];

@NgModule({
  declarations: [CategoryItemsComponent, ItemViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ItemsModule { }
