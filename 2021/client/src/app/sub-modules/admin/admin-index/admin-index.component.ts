import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.scss'],


})
export class AdminIndexComponent implements OnInit {

  links = [
    { path: "home",       label: "Home",        icon: "home" },
    { path: "items",      label: "Items",       icon: "category", sublinks : [{label: 'New Item', path: "new"}]  },
    { path: "customers",  label: "Customers",   icon: "group", sublinks : [{label: 'New Customer', path: "new"}]   },
    { path: "orders",     label: "Orders",      icon: "dvr" },
    { path: "invoices",   label: "Invoices",    icon: "request_quote", sublinks : [{label: 'New Invoice', path: "new"}]   },
    { path: "payments",   label: "Payments",    icon: "payments" },
    { path: "accounts",   label: "Accounts",    icon: "auto_stories" },
    { path: "cheques",    label: "Cheques",     icon: "credit_card" },
    { path: "salesreturn",label: "Salesreturn", icon: "subtitles" },
    { path: "reports",    label: "Reports",     icon: "summarize" },
  ];

  // links = ['home', '', '', '', '', '', '', '', '', ''];
  activeLink = '';
  user = 'the user';
  today: number = Date.now();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get the initial route
    let url = this.router.url.replace('/admin/','');
    this.links.some(e => {
      if (url.replace('/\//','').indexOf(e.path) == 0) {
        this.activeLink = e.path;
        return true;
      }
      return false;
    });
  }

}
