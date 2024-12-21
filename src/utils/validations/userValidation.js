import { roles } from '../../constants/roles.js';
import { ValidationError } from '../../errors/createErrorClass.js';

class UserValidation {
  static username (username) {
    if (typeof username !== 'string') throw new ValidationError('Nombre de usuario debe ser un string');
    if (username.length < 3) throw new ValidationError('Nombre de usuario debe ser de al menos 3 caracteres');
  }

  static password (password) {
    if (typeof password !== 'string') throw new ValidationError('Contraseña debe ser un string');
    if (password.length < 6) throw new ValidationError('Contraseña debe ser de al menos 6 caracteres');
  }

  static role (role) {
    if (typeof role !== 'string') throw new ValidationError('Rol debe ser un string');
    if (!Object.values(roles).includes(role)) throw new ValidationError('El Rol no es válido');
  }

  static id (id) {
    if (typeof id !== 'string') throw new ValidationError('Id debe ser un string');
    if (id.length !== 24) throw new ValidationError('Id debe ser de 24 caracteres');
  }
}

export default UserValidation;
