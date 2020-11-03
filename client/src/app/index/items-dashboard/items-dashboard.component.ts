import { Component, OnInit, OnDestroy } from '@angular/core';
import { categories } from 'src/app/data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-items-dashboard',
  templateUrl: './items-dashboard.component.html',
  styleUrls: ['./items-dashboard.component.scss']
})
export class ItemsDashboardComponent implements OnInit  {

  

  categories:any = [];
  
  constructor(
    
  ) { }

  ngOnInit(): void {
    this.categories = categories;

    
  }

}
