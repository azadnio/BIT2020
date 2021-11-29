import { Component, OnInit } from '@angular/core';
import { IClientRouteElement } from '../sub-modules/common/common.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  links : IClientRouteElement [] = [
    { routePath: 'about', label: 'Label', matIcon:''},
    { routePath: 'promotion', label: 'Promotions', matIcon:''},
    { routePath: 'contact', label: 'Contact', matIcon:''},
    { routePath: 'items', label: 'Items', matIcon: 'reorder' },
    { routePath: 'account', label: 'My Account', matIcon: 'menu_book' },
    { routePath: 'cart', label: 'Cart', matIcon:''},
    { routePath: 'profile', label: 'Profile', matIcon:''},
  ];
  activeLink = '';
  search = '';

  constructor() { }

  ngOnInit(): void {
  }

  searchItems(){
    console.log(this.search, 'searching...')
  }
}
