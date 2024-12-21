import { Router } from 'express';
import { createRole, deleteRole, getById, getRoles, updateRole } from './role.controller.js';
import { autenticate } from '../middleware/autentication.js';
import { authorize } from '../middleware/authorize.js';
import { roles } from '../constants/roles.js';

const roleRouter = Router();

roleRouter.post('/create', autenticate, authorize([roles.ADMIN]), createRole);
roleRouter.get('/', autenticate, authorize([roles.ADMIN]), getRoles);
roleRouter.get('/:id', autenticate, authorize([roles.ADMIN]), getById);
roleRouter.put('/:id', autenticate, authorize([roles.ADMIN]), updateRole);
roleRouter.delete('/:id', autenticate, authorize([roles.ADMIN]), deleteRole);

export default roleRouter;
