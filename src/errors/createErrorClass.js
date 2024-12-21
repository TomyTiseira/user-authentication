import { errorsName } from '../constants/errorsName.js';

const createErrorClass = (name, status = 400) => {
  return class extends Error {
    constructor (message) {
      super(message);
      this.name = name;
      this.status = status;
    }
  };
};

export const ValidationError = createErrorClass(errorsName.VALIDATION, 400);
export const InvalidRefreshTokenError = createErrorClass(errorsName.INVALID_REFRESH_TOKEN, 403);
export const MissingRefreshTokenError = createErrorClass(errorsName.MISSING_REFRESH_TOKEN, 401);
export const UserError = createErrorClass(errorsName.USER, 404);
export const InvalidAuthTokenError = createErrorClass(errorsName.INVALID_AUTH_TOKEN, 403);
export const MissingAuthTokenError = createErrorClass(errorsName.MISSING_AUTH_TOKEN, 401);
export const UnauthorizedAccessError = createErrorClass(errorsName.UNAUTHORIZED_ACCESS, 403);
export const RoleError = createErrorClass(errorsName.ROLE, 404);
