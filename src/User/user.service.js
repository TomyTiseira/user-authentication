import { SALT_ROUNDS } from '../config/enviroment.js';
import UserValidation from '../utils/validations/userValidation.js';
import bcrypt from 'bcrypt';
import UserRepository from './user.repository.js';
import { RoleError, UserError } from '../errors/createErrorClass.js';
import RoleRepository from '../Role/role.repository.js';

class UserService {
  static create = async ({ username, password, role }) => {
    UserValidation.username(username);
    UserValidation.password(password);

    const userRole = await this.#validateRole(role);

    await this.#validateUsernameUniqueness(username);

    const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS));
    return await UserRepository.create({ username, password: hashedPassword, role: userRole._id });
  };

  static getUsers = async (includeInactive) => await UserRepository.getUsers(includeInactive);

  static getById = async (id) => {
    UserValidation.id(id);

    return this.#validateUser(id);
  };

  static updateById = async (id, data) => {
    const { username, password, role } = data;
    UserValidation.id(id);

    const currentUser = await this.#validateUser(id);

    if (username && (username !== currentUser.username)) {
      UserValidation.username(username);
      const existingUser = await UserRepository.findByUsername(username);
      if (existingUser) throw new UserError('Nombre de usuario en uso');
    }

    let hashedPassword;
    if (password) {
      UserValidation.password(data.password);
      hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS));
    }

    let userRole;
    if (role) userRole = await this.#validateRole(role);

    const updateData = {};
    if (username) updateData.username = username;
    if (hashedPassword) updateData.password = hashedPassword;
    if (role) updateData.role = userRole;

    return await UserRepository.updateById(id, updateData);
  };

  static deleteById = async (id) => {
    UserValidation.id(id);

    const user = await this.#validateUser(id);
    if (!user.isActive) throw new UserError('El usuario ya fue eliminado');

    return await UserRepository.deleteById(id);
  };

  static #validateUsernameUniqueness = async (username) => {
    const existingUser = await UserRepository.findByUsername(username);
    if (existingUser) throw new UserError('Nombre de usuario en uso');
  };

  static #validateRole = async (role) => {
    UserValidation.role(role);
    const existingRole = await RoleRepository.getRoleByName(role);
    if (!existingRole) throw new RoleError('El rol no existe');
    return existingRole;
  };

  static #validateUser = async (id) => {
    const user = await UserRepository.getById(id);
    if (!user) throw new UserError('El usuario no existe');
    return user;
  };
};

export default UserService;
