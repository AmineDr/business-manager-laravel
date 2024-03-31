import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { Observable, catchError, from, map, throwError } from 'rxjs';

export type CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => Observable<boolean | UrlTree>;

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    return from(this.authService.checkSession())
      .pipe(
        map((hasSession) => {
          if (hasSession) return true;
          return false;
        }),
        catchError((error) => {
          console.error('Error during session check:', error);
          return throwError(error);
        })
      );
  };
}
