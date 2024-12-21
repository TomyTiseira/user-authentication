import { MissingRefreshTokenError } from '../errors/createErrorClass.js';
import { refreshAccessToken, login as serviceLogin } from './auth.service.js';

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const { user, token, refreshToken } = await serviceLogin({ username, password });

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 días de duración para el refreshToken
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout = async (_, res) => {
  res
    .clearCookie('authToken')
    .json({ message: 'Sesión cerrada exitosamente' });
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new MissingRefreshTokenError('No existe el refresh token');
    }

    const newAccessToken = await refreshAccessToken(refreshToken);

    res.cookie('authToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60
    });

    res.status(200).json({ message: 'Token refrescado exitosamente' });
  } catch (error) {
    next(error);
  }
};
