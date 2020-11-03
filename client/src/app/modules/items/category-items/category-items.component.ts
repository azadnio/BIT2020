import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { categories, items } from 'src/app/data';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss']
})
export class CategoryItemsComponent implements OnInit, OnDestroy {

  items: any = [];
  private sub: any;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.loadCategoryItems(params.categoryId || 1);
   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadCategoryItems(id) {

    this.items = items.filter( el => el.categoryId == id);
  }
}
