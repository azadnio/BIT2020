import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminProfileComponent } from './admin-profile/admin-profile.component'
import { ItemsDashboardComponent } from 'src/app/index/items-dashboard/items-dashboard.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'profile', component: AdminProfileComponent },
  {
    path: 'items', component: ItemsDashboardComponent,
    loadChildren: () => import('../modules/items/items.module').then(m => m.ItemsModule)
  }
];


@NgModule({
  declarations: [AdminDashboardComponent, AdminHomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
