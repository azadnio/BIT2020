import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  items: any = [];

  constructor(private activeRoute: ActivatedRoute) {
    this.activeRoute.paramMap.subscribe((paramMap) => {
      
      this.loadCategoryItems(paramMap.get('categoryId'));
    });
   }

  ngOnInit(): void {
  }

  loadCategoryItems(id: string | null) {
    
    if (id) {
      this.items = [
        {name: 'item 1', id: 'IT1'},
        {name: 'item 1', id: 'IT1'},
        {name: 'item 1', id: 'IT1'},
        {name: 'item 1', id: 'IT1'},
        {name: 'item 1', id: 'IT1'},
        {name: 'item 1', id: 'IT1'},
        {name: 'item 1', id: 'IT1'},
        {name: 'item 1', id: 'IT1'},
        {name: 'item 1', id: 'IT1'},
        {name: 'item 1', id: 'IT1'}
      ]
    }    
  }
}
