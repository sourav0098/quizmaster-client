import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const loginGuard = () => {
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    return false;
  }
  return true;
};
