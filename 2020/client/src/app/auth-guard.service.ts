import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authService: AuthService
  ) { }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      // this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
