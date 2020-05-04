import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { USER_TYPE } from '../../interface/User';
import { TokenService } from '../../services/token.service';
import { UserQuery, UserService } from '../../services/state/user';
import { isFullyAuthorizedLevel, isHavingValidToken, retrievingUserInfoViaToken } from '../guard.helper';
import { UserInterfaceService } from '../../services/state/user-interface';

@Injectable({
  providedIn: 'root',
})
export class ClientGuard implements CanActivateChild {
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
    state: RouterStateSnapshot): Promise<boolean> {
    if (isFullyAuthorizedLevel(
      this.userQuery,
      this.tokenService,
      [USER_TYPE.tutor, USER_TYPE.student],
    )) {
      return true;
    }

    if (isHavingValidToken(this.tokenService)) {
      return await retrievingUserInfoViaToken(
        this.userService,
        this.userQuery,
        this.tokenService,
        this.uiStateService,
        this.router,
        [USER_TYPE.student, USER_TYPE.tutor],
      );
    }

    // else redirect to home, erase all info
    this.userService.reset();
    this.tokenService.clearToken();
    this.router.navigate(['/login']);
    return false;
  }
}
