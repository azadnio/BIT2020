import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private messageService = inject(MessageService);

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly API_URL = '/api/auth';

  constructor() {
    // Check for stored user on initialization
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<{
        user: User;
        token: string;
      }>(`${this.API_URL}/login`, { email, password })
      .pipe(
        map((response) => {
          console.log('Login response:', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
          this.messageService.showSuccess('Login successful!');
          return response.user;
        }),
      );
  }

  register(userData: Partial<User>): Observable<User> {
    throw new Error('REGISTER API NOT IMPLEMENTED YET');
    // return this.http
    //   .post<{ user: User; token: string }>(`${this.API_URL}/register`, userData)
    //   .pipe(
    //     map((response) => {
    //       localStorage.setItem('token', response.token);
    //       localStorage.setItem('currentUser', JSON.stringify(response.user));
    //       this.currentUserSubject.next(response.user);
    //       this.messageService.showSuccess('Registration successful!');
    //       return response.user;
    //     }),
    //   );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
    this.messageService.showSuccess('Logged out successfully!');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser() && !!localStorage.getItem('token');
  }

  hasRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
