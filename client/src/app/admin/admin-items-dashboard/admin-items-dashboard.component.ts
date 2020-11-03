import { Component, OnInit } from '@angular/core';
import { categories, brands, items } from 'src/app/data';

@Component({
  selector: 'app-admin-items-dashboard',
  templateUrl: './admin-items-dashboard.component.html',
  styleUrls: ['./admin-items-dashboard.component.scss']
})
export class AdminItemsDashboardComponent implements OnInit {
  
  categories:any = [];

  constructor() { }

  ngOnInit(): void {
    this.categories = categories;
    // console.log(categories)
  }

}
