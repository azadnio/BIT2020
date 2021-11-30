import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-items-home',
  templateUrl: './items-home.component.html',
  styleUrls: ['./items-home.component.scss']
})
export class ItemsHomeComponent implements OnInit {

  private sub: any;

  categories:any [] = [ ];

  constructor(private activeRoute: ActivatedRoute, private router: Router) { 
    this.loadCategories();
  }

  ngOnInit(): void {
  }

  loadCategories() {

    this.categories = [
      {name: 'Category 1', id: 'CT1'},
      {name: 'Category 2', id: 'CT2'},
      {name: 'Category 3', id: 'CT3'},
      {name: 'Category 4', id: 'CT4'},
      {name: 'Category 5', id: 'CT5'},
      {name: 'Category 6', id: 'CT6'},
      {name: 'Category 7', id: 'CT7'}
    ];

    //navigate to first category if there is NO category selected
    var isCategorySelected = this.activeRoute.children.length;
    if (!isCategorySelected)
      this.router.navigate([`/items/${this.categories[0].id}`])
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }
}
