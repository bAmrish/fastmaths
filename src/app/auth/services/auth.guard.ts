import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';


export const authGuard = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // console.log(next);
  console.log(state.url);
  if(!authService.isLoggedIn()) {
    const encodedURL = encodeURI(state.url);
    return router.parseUrl(`/login?l=${encodedURL}`);
  }

  return true;
}
