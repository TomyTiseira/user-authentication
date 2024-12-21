import { Router } from 'express';
import { createAdmin, createUser, deleteUser, getById, getUsers, updateUser } from './user.controller.js';
import { autenticate } from '../middleware/autentication.js';
import { authorize } from '../middleware/authorize.js';
import { roles } from '../constants/roles.js';

const userRouter = Router();

userRouter.post('/create', createUser);
userRouter.post('/createAdmin', autenticate, authorize([roles.ADMIN]), createAdmin);
userRouter.get('/', autenticate, authorize([roles.ADMIN]), getUsers);
userRouter.get('/:id', autenticate, authorize([roles.ADMIN]), getById);
userRouter.put('/:id', autenticate, authorize([roles.ADMIN]), updateUser);
userRouter.delete('/:id', autenticate, authorize([roles.ADMIN]), deleteUser);

export default userRouter;
