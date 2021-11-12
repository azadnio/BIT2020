import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    // this.http
    //   .get("/api/ver", { responseType: 'text' }).toPromise().then( res => console.log('API call', res));
  }

}
