import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ItemsDashBoardComponent } from '../modules/items/items-dash-board/items-dash-board.component';
import { AccountsComponent } from './accounts/accounts.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'items', component: ItemsDashBoardComponent },
  { path: 'account', component: AccountsComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }, // redirect to `home-component`
  { path: '**', component: PagenotfoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
