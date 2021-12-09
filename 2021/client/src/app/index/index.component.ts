import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IClientRouteElement } from '../sub-modules/common/common.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  links : IClientRouteElement [] = [
    { routePath: 'about', label: 'About', matIcon:''},
    { routePath: 'promotion', label: 'Promotions', matIcon:''},
    { routePath: 'contact', label: 'Contact', matIcon:''},
    { routePath: 'items', label: 'Items', matIcon: 'reorder' },
    { routePath: 'account', label: 'My Account', matIcon: 'menu_book' },
    { routePath: 'cart', label: 'Cart', matIcon:''}
  ];
  activeLink = '';
  search = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // get the initial route
    let url = this.router.url.replace('/','');
    this.links.some(e => {
      if (url.indexOf(e.routePath) == 0) {
        this.activeLink = e.routePath;
        return true;
      }
      return false;
    });


    this.router.events.subscribe((event) => {

      let url = '', urls = [];
      if (event instanceof NavigationEnd) {

        let children = this.route.children;

        for (let child of children) {
          let routeURL: string = child.snapshot.url.map(segment => segment.path).join('/'), label = child.snapshot.data['breadcrumb'];
          if (routeURL !== '') {
            url += `/${routeURL}`;
            urls.push({url, label});
          }
        }

        console.log(urls);
      }

    });
  }
  
  createBreadcrumbs(route: ActivatedRoute, url: string = '#', breadcrumbs = []): any {
    // const children: ActivatedRoute[] = route.children;

    // if (children.length === 0) {
    //   return breadcrumbs;
    // }

    // for (const child of children) {
    //   const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
    //   if (routeURL !== '') {
    //     url += `/${routeURL}`;
    //   }

    //   const label = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];
    //   if (!isNullOrUndefined(label)) {
    //     breadcrumbs.push({label, url});
    //   }

    //   return this.createBreadcrumbs(child, url, breadcrumbs);
    // }
  }

  searchItems(){
    console.log(this.search, 'searching...')
  }
}
