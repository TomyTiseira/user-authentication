import { UnauthorizedAccessError } from '../errors/createErrorClass.js';

export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role.name)) {
      throw new UnauthorizedAccessError('No tiene permiso para realizar está acción');
    }
    next();
  };
};
