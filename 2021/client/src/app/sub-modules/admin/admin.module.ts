import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin-index/home/home.component';
import { AppCommonModule } from '../common/common.module';

const routes: Routes = [
  { path: '', component: AdminIndexComponent, children:[
    { path: '', component: HomeComponent }
  ] },
];

@NgModule({
  declarations: [
    AdminIndexComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
