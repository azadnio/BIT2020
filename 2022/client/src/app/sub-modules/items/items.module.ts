import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsHomeComponent } from './items-home/items-home.component';
import { CategoryComponent } from './items-home/category/category.component';
import { Routes, RouterModule, ROUTES } from '@angular/router';
import { ChItemComponent } from './ch-item/ch-item.component';
import { GeneralViewItemComponent } from './items-home/general-view-item/general-view-item.component';
import { AppCommonModule } from '../common/common.module';
import { NewItemComponent } from './items-home/new-item/new-item.component';



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
    ItemsHomeComponent,
    CategoryComponent,
    ChItemComponent,
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
  exports: [
    ChItemComponent
  ]
})
export class ItemsModule { }
