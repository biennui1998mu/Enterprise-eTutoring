import { USER_TYPE } from '../interface/User';
import { UserQuery } from '../services/state/user';
import { TokenService } from '../services/token.service';

export const isHavingUserInfo = (userQuery: UserQuery) => {
  return userQuery.getValue()._id;
};

export const isHavingValidToken = (tokenService: TokenService) => {
  return tokenService.decodedToken;
};

export const isFullyAuthorizedLevel = (
  userQuery: UserQuery,
  tokenService: TokenService,
  levelAuthorize: USER_TYPE | USER_TYPE[],
) => {
  const userId = isHavingUserInfo(userQuery);
  const decoded = isHavingValidToken(tokenService);
  const validUserAndDecoded = !(!userId || !decoded || userId !== decoded._id);
  if (!Array.isArray(levelAuthorize))
    return levelAuthorize === userQuery.getValue().level && validUserAndDecoded;

  let validatedAuthorize = false;
  levelAuthorize.every(level => {
    if (level === userQuery.getValue().level) {
      validatedAuthorize = true;
    }
    return !validatedAuthorize;
  });
};
