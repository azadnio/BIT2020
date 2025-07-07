import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  if (authService.isAuthenticated()) {
    return true;
  }

  messageService.showWarning('Please login to access this page.');
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
