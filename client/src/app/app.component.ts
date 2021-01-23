import { Component } from '@angular/core';
import { IClientRouteElement } from './common.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Capital Hardware';

  //routes other than home route, bind to this array
  links: IClientRouteElement[] = [
    { routePath: 'items', label: 'Items', matIcon: 'reorder' },
    { routePath: 'account', label: 'My Account', matIcon: 'menu_book' },
    { routePath: 'admin', label: 'Administration', matIcon: 'person' },
  ];
  activeLink = '';
}
