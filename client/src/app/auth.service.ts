import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper;
  constructor() {

    this.helper = new JwtHelperService();

    // const decodedToken = helper.decodeToken(myRawToken);
    // const expirationDate = helper.getTokenExpirationDate(myRawToken);
    // const isExpired = helper.isTokenExpired(myRawToken);
  }

  login(email, password) {

    return new Promise((resolve, reject) => {

      // this.extapi.crmLogin(email, password).then(token => {

      //   localStorage.setItem("token", token);
        resolve(true);

      // }, (err) => reject(false));
    })
  }

  logout() {

    localStorage.removeItem('token');
  }

  //role based activation
  // https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.helper.isTokenExpired(token);
  }
}
