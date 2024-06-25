import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isAuthenticated = this.authService.isAuthenticated();
    const isSignInRoute = state.url === '/sign-in';

    if (isAuthenticated && isSignInRoute) {
      return this.router.parseUrl('/dashboard'); 
    }

    if (!isAuthenticated && !isSignInRoute) {
      return this.router.parseUrl('/sign-in'); 
    }

    return true;
  }
}
