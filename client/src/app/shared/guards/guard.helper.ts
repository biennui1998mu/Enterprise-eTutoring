import { USER_TYPE } from '../interface/User';
import { UserQuery } from '../services/state/user';
import { TokenService } from '../services/token.service';

export const isHavingUserInfo = (userQuery: UserQuery) => {
  return userQuery.getValue();
};

export const isHavingValidToken = (tokenService: TokenService) => {
  return tokenService.decodedToken;
};

export const isFullyAuthorizedLevel = (
  userQuery: UserQuery,
  tokenService: TokenService,
  levelAuthorize: USER_TYPE | USER_TYPE[],
) => {
  const user = isHavingUserInfo(userQuery);
  const decoded = isHavingValidToken(tokenService);
  const validUserAndDecoded = !(!user || !decoded || user._id !== decoded._id);
  if (!Array.isArray(levelAuthorize))
    return levelAuthorize === user.level && validUserAndDecoded;

  let validatedAuthorize = false;
  levelAuthorize.every(level => {
    if (level === user.level) {
      validatedAuthorize = true;
    }
    return !validatedAuthorize;
  });
};
