import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
interface Breadcrumb {
  text: string;
  url: string;
}
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.sass']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs: Breadcrumb[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const breadcrumbText = data['breadcrumb'];
      const breadcrumbUrl = this.route.snapshot.url.map(segment => segment.path).join('/');
      this.breadcrumbs.push({ text: breadcrumbText, url: breadcrumbUrl }); console.log(this.breadcrumbs);
    });
  }

}
