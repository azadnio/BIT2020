import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsDashBoardComponent } from './items-dash-board/items-dash-board.component';
import { Routes, RouterModule } from '@angular/router';
import { ItemsCategoryComponent } from './items-category/items-category.component'
import { ItemsViewComponent } from './items-view/items-view.component'

const routes: Routes = [
  { 
    path: 'test', 
    component: ItemsCategoryComponent,
    children: [
      { path: ':categoryId', component: ItemsCategoryComponent },
      { path: ':categoryId/:itemId', component: ItemsViewComponent }
    ]
   },  
  // { path: '', redirectTo: '/', pathMatch: 'full' }, // redirect to `home-component`
];

@NgModule({
  declarations: [ItemsDashBoardComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [    
    ItemsDashBoardComponent
  ]
})
export class ItemsModule { }
