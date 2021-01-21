import { IClientRouteElement } from './../common.interface';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  //routes other than home route, bind to this array
  links : IClientRouteElement [] = [
    { routePath: 'items', label: 'Items', matIcon: 'reorder' },
    { routePath: 'account', label: 'My Account', matIcon: 'menu_book' },
    { routePath: 'admin', label: 'Administration', matIcon: 'person' },
  ];
  activeLink = '';

  constructor() { }

  ngOnInit(): void {
  }

}
