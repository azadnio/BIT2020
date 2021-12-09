import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.scss']
})
export class AdminIndexComponent implements OnInit {

  links = ['home', 'items', 'customers', 'orders', 'invoices', 'payments', 'accounts', 'cheques', 'salesreturns', 'reports'];
  activeLink = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get the initial route
    let url = this.router.url.replace('/','');
    this.links.some(e => {
      if (url.indexOf(e) == 0) {
        this.activeLink = e;
        return true;
      }
      return false;
    });
  }

}
