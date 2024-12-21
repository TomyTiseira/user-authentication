import { REFRESH_TOKEN_SECRET, SECRET_JWT } from '../config/enviroment.js';
import { InvalidRefreshTokenError, UserError } from '../errors/createErrorClass.js';
import RoleRepository from '../Role/role.repository.js';
import UserRepository from '../User/user.repository.js';
import UserValidation from '../utils/validations/userValidation.js';
import brcypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async ({ username, password }) => {
  UserValidation.username(username);
  UserValidation.password(password);

  const user = await UserRepository.findByUsername(username);
  if (!user) throw new UserError('Usuario no existe');

  const isValid = await brcypt.compare(password, user.password);
  if (!isValid) throw new UserError('Constraseña inválida');

  const role = await RoleRepository.getRole(user.role);

  const payload = {
    _id: user._id,
    username: user.username,
    role: { _id: role._id, name: role.name }
  };

  const token = jwt.sign(payload, SECRET_JWT, { expiresIn: '1h' }); // El token expira en 1 hora
  // Generar el refresh token
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' }); // El refresh token expira en 7 días

  return {
    user: {
      _id: user._id,
      username: user.username
    },
    token, // Retornamos también el JWT
    refreshToken
  };
};

export const refreshAccessToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    // Verificar el refreshToken
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return reject(new InvalidRefreshTokenError('Refresh token no válido o expirado'));
      }

      // Generar un nuevo access token, si es válido
      const newAccessToken = jwt.sign({
        _id: decoded._id,
        username: decoded.username,
        role: decoded.role
      },
      SECRET_JWT, { expiresIn: '1h' }
      );

      resolve(newAccessToken);
    });
  });
};
