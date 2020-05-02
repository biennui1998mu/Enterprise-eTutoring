import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { USER_TYPE } from '../../interface/User';
import { TokenService } from '../../services/token.service';
import { UserQuery, UserService } from '../../services/state/user';
import { isFullyAuthorizedLevel } from '../guard.helper';

@Injectable({
  providedIn: 'root',
})
export class ClientGuard implements CanActivateChild, CanLoad {
  constructor(
    private tokenService: TokenService,
    private userQuery: UserQuery,
    private userService: UserService,
    private router: Router,
  ) {
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    if (isFullyAuthorizedLevel(
      this.userQuery,
      this.tokenService,
      [USER_TYPE.tutor, USER_TYPE.student],
    )) {
      return new Promise<boolean>(resolve => resolve(true));
    }
    // else redirect to home, erase all info
    this.userService.reset();
    this.tokenService.clearToken();
    return this.router.navigate(['/login']);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Promise<boolean> {
    if (isFullyAuthorizedLevel(
      this.userQuery,
      this.tokenService,
      [USER_TYPE.tutor, USER_TYPE.student],
    )) {
      return new Promise<boolean>(resolve => resolve(true));
    }
    // else redirect to home, erase all info
    this.userService.reset();
    this.tokenService.clearToken();
    return this.router.navigate(['/login']);
  }
}
