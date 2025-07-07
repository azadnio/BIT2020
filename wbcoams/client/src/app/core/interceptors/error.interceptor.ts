import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const messageService = inject(MessageService);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Token expired or invalid
        authService.logout();
        router.navigate(['/login']);
        messageService.showError('Session expired. Please login again.');
      } else if (error.status === 403) {
        messageService.showError('Access denied. Insufficient permissions.');
      } else if (error.status === 404) {
        messageService.showError('Resource not found.');
      } else if (error.status === 500) {
        messageService.showError('Server error. Please try again later.');
      } else {
        messageService.showError(
          error.error?.message || 'An unexpected error occurred.',
        );
      }

      return throwError(() => error);
    }),
  );
};
