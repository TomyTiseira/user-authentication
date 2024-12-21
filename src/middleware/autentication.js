import jwt from 'jsonwebtoken';
import { SECRET_JWT } from '../config/enviroment.js';
import { InvalidAuthTokenError, MissingAuthTokenError } from '../errors/createErrorClass.js';

export const autenticate = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    throw new MissingAuthTokenError('Acceso no autorizado');
  }

  try {
    const decoded = jwt.verify(token, SECRET_JWT);
    req.user = decoded;
    next();
  } catch (error) {
    throw new InvalidAuthTokenError('Token no válido');
  }
};
