import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';
import { UserQuery, UserService } from '../services/state/user';
import { isHavingUserInfo, isHavingValidToken } from './guard.helper';
import { USER_TYPE } from '../interface/User';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivateChild {
  constructor(
    private tokenService: TokenService,
    private userQuery: UserQuery,
    private userService: UserService,
    private router: Router,
  ) {
  }

  async canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    if (
      isHavingValidToken(this.tokenService)
    ) {
      // if have token then check for userState
      if (isHavingUserInfo(this.userQuery)) {
        // have both token and user state => user valid
        // navigate to dashboard instead of guest route
        this.router.navigate([this.getRoutes(), 'dashboard']);
        return false;
      }
      // API to get user info
      return await this.retrievingUserInfoViaToken();
    }
    return true;
  }

  private getRoutes() {
    switch (this.userQuery.getValue().level) {
      case USER_TYPE.admin:
        return '/admin';
      case USER_TYPE.staff:
        return '/staff';
    }
    return '/client';
  }

  private async retrievingUserInfoViaToken() {
    try {
      await this.userService.me().toPromise();
      // if user info state exist after API then invalid the route and navigate
      // user to dashboard
      if (isHavingUserInfo(this.userQuery)) {
        this.router.navigate([this.getRoutes(), '/dashboard']);
        return false;
      }
    } catch (e) {
      console.error(e);
    }
    return true;
  }
}
