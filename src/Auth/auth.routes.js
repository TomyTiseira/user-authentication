import { Router } from 'express';
import { getProfile, login, logout, refresh } from './auth.controller.js';
import { autenticate } from '../middleware/autentication.js';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/profile', autenticate, getProfile);
authRouter.post('/refresh', refresh);

export default authRouter;
