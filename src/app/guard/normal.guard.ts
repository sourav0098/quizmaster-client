import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const normalGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && (authService.isNormalUser() || authService.isAdminUser())) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
