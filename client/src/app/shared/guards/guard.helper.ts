import { User, USER_TYPE } from '../interface/User';
import { UserQuery, UserService } from '../services/state/user';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { UserInterfaceService } from '../services/state/user-interface';

export const isHavingUserInfo = (userQuery: UserQuery, customUser?: User) => {
  return userQuery.getValue()._id ? userQuery.getValue()._id : customUser ? customUser._id : null;
};

export const isHavingValidToken = (tokenService: TokenService) => {
  return tokenService.decodedToken;
};

export const isFullyAuthorizedLevel = (
  userQuery: UserQuery,
  tokenService: TokenService,
  levelAuthorize: USER_TYPE | USER_TYPE[],
  customUser?: User,
) => {
  const user = userQuery.getValue()._id ? userQuery.getValue() : customUser ? customUser : null;
  if (!user) {
    return false;
  }
  const userId = isHavingUserInfo(userQuery, customUser);
  const decoded = isHavingValidToken(tokenService);
  const validUserAndDecoded = !(!userId || !decoded || userId !== decoded._id);
  if (!Array.isArray(levelAuthorize))
    return levelAuthorize === user?.level && validUserAndDecoded;

  let validatedAuthorize = false;
  levelAuthorize.every(level => {
    if (level === user.level) {
      validatedAuthorize = true;
    }
    return !validatedAuthorize;
  });
  return validatedAuthorize;
};

/**
 * if detect token but no user info, perform a API request
 * to get user information
 */
export async function retrievingUserInfoViaToken(
  userService: UserService,
  userQuery: UserQuery,
  tokenService: TokenService,
  uiStateService: UserInterfaceService,
  router: Router,
  authorizeLevel: USER_TYPE | USER_TYPE[],
) {
  try {
    const user = await userService.me().toPromise();
    // must pass custom user response as akita did not initialize before onload run
    if (isFullyAuthorizedLevel(
      userQuery,
      tokenService,
      authorizeLevel,
      user,
    )) {
      return true;
    }
  } catch (e) {
    console.error(e);
  }
  uiStateService.setError('Login session seems to be expired hehe.', 5);
  router.navigate(['/login']);
  return false;
}
