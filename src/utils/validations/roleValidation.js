import { ValidationError } from '../../errors/createErrorClass.js';

class RoleValidation {
  static name (name) {
    if (!name) throw new ValidationError('El nombre del rol es requerido');
    if (typeof name !== 'string') throw new ValidationError('El nombre del rol debe ser un string');
  }

  static id (id) {
    if (!id) throw new ValidationError('El id del rol es requerido');
    if (typeof id !== 'string') throw new ValidationError('El id del rol debe ser un string');
  }
};

export default RoleValidation;
