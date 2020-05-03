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
import { TokenService } from '../../services/token.service';
import { UserQuery, UserService } from '../../services/state/user';
import { USER_TYPE } from '../../interface/User';
import { isFullyAuthorizedLevel, isHavingValidToken } from '../guard.helper';
import { UserInterfaceService } from '../../services/state/user-interface';

@Injectable({
  providedIn: 'root',
})
export class StaffGuard implements CanActivateChild, CanLoad {
  constructor(
    private tokenService: TokenService,
    private userQuery: UserQuery,
    private userService: UserService,
    private uiStateService: UserInterfaceService,
    private router: Router,
  ) {
  }

  async canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    if (isFullyAuthorizedLevel(this.userQuery, this.tokenService, USER_TYPE.staff)) {
      return true;
    }
    if (isHavingValidToken(this.tokenService)) {
      return await this.retrievingUserInfoViaToken();
    }

    // else redirect to home, erase all info
    this.userService.reset();
    this.tokenService.clearToken();
    this.router.navigate(['/login']);
    return false;
  }

  async canLoad(
    route: Route,
    segments: UrlSegment[],
  ): Promise<boolean> {
    if (isFullyAuthorizedLevel(this.userQuery, this.tokenService, USER_TYPE.staff)) {
      return true;
    }

    if (isHavingValidToken(this.tokenService)) {
      return await this.retrievingUserInfoViaToken();
    }

    // else redirect to home, erase all info
    this.userService.reset();
    this.tokenService.clearToken();
    this.router.navigate(['/login']);
    return false;
  }

  private async retrievingUserInfoViaToken() {
    try {
      await this.userService.me().toPromise();
      if (isFullyAuthorizedLevel(this.userQuery, this.tokenService, USER_TYPE.staff)) {
        return true;
      }
      this.uiStateService.setError('Login session seems to be expired.', 5);
    } catch (e) {
      console.error(e);
    }
    this.router.navigate(['/login']);
    return false;
  }
}
