import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  const requiredRoles = route.data?.['roles'] as string[];

  if (requiredRoles && authService.hasRole(requiredRoles)) {
    return true;
  }

  messageService.showError('Access denied. Insufficient permissions.');
  router.navigate(['/']);
  return false;
};
