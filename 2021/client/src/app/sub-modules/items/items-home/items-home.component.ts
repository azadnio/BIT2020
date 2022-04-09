import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/utils.service';
import { FilterParams } from '../../common/common.classes';

@Component({
  selector: 'app-items-home',
  templateUrl: './items-home.component.html',
  styleUrls: ['./items-home.component.scss']
})
export class ItemsHomeComponent implements OnInit {

  private sub: any;
  filterParams: FilterParams;
  filterForm: any;
  searchId: any;
  subscriptions: Subscription[];

  categories:any [] = [ ];
  public category = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
  public brand = ['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4'];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    // private location: Location,
    public utils: UtilsService,
    public dialog: MatDialog
    ) {
    this.loadCategories();

    this.subscriptions = [];
    this.filterParams = new FilterParams();

    let sub = this.activatedRoute.queryParamMap
      .subscribe((queryParam: any) => {

        let params = queryParam.params as FilterParams;
        if (params) {

          this.filterParams = { ...this.filterParams, ...params };


          //load the list
        }
      });

    this.subscriptions.push(sub);
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
    var isCategorySelected = this.activatedRoute.children.length;
    if (!isCategorySelected)
      this.router.navigate([ this.router.url + `/${this.categories[0].id}`])
  }

  restFilter() {

    this.filterParams = new FilterParams();
  }

  filter() {
    console.log( this.filterParams);
    let url = this.router.url.split('?');
    // this.utils.setSearchURL(this.filterParams, this.location, url[0], url[1])
  }

  searchById() {
    console.log(this.searchId)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
