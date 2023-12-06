import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChItemsComponent } from './ch-items/ch-items.component';
import { ItemsHomeComponent } from './items-home/items-home.component';
import { CategoryComponent } from './items-home/category/category.component';
import { GeneralViewItemComponent } from './items-home/general-view-item/general-view-item.component';
import { NewItemComponent } from './items-home/new-item/new-item.component';
import { Routes, ROUTES, RouterModule } from '@angular/router';
import { AppCommonModule } from 'src/app/core/common/common.module';

const routes: Routes = [
  { path: '', component: ItemsHomeComponent, data: { breadcrumb: 'Category' },
    children: [
      { path: ':categoryId', component: CategoryComponent },
      { path: ':categoryId/:itemId', component: GeneralViewItemComponent }
    ]
  },
];

const admin = true;

function routesFactory() {

  if (admin) 
    return [
      { path: '', component: ItemsHomeComponent, data: { breadcrumb: 'Category' },
        children: [
          { path: 'new', component: NewItemComponent },
          { path: ':categoryId', component: CategoryComponent },
          { path: ':categoryId/:itemId', component: GeneralViewItemComponent },
          
        ]
    }];
    
  return [
    { path: '', component: ItemsHomeComponent, data: { breadcrumb: 'Category' },
      children: [
        { path: ':categoryId', component: CategoryComponent },
        { path: ':categoryId/:itemId', component: GeneralViewItemComponent }
      ]
  }]
}

@NgModule({
  declarations: [
    ChItemsComponent,
    ItemsHomeComponent,
    CategoryComponent,
    GeneralViewItemComponent,
    NewItemComponent
  ],
  providers: [{
    provide: ROUTES,
    useFactory: routesFactory,
    multi: true,
    deps: []
  }],
  imports: [
    CommonModule,  
    AppCommonModule,  
    RouterModule.forChild([])
  ],
  exports:[ChItemsComponent]
})
export class ItemsModule { }
