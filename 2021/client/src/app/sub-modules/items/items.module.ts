import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsHomeComponent } from './items-home/items-home.component';
import { CategoryComponent } from './items-home/category/category.component';
import { Routes, RouterModule } from '@angular/router';
import { ChItemComponent } from './ch-item/ch-item.component';
import { GeneralViewItemComponent } from './items-home/general-view-item/general-view-item.component';



const routes: Routes = [
  { path: '', component: ItemsHomeComponent, data: { breadcrumb: 'Category' },
    children: [
      { path: ':categoryId', component: CategoryComponent },
      { path: ':categoryId/:itemId', component: GeneralViewItemComponent }
    ]
  },
];

@NgModule({
  declarations: [
    ItemsHomeComponent,
    CategoryComponent,
    ChItemComponent,
    GeneralViewItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ItemsModule { }
