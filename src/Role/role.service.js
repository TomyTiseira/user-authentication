import { RoleError } from '../errors/createErrorClass.js';
import RoleValidation from '../utils/validations/roleValidation.js';
import RoleRepository from './role.repository.js';

class RoleService {
  static create = async ({ name }) => {
    RoleValidation.name(name);

    const existingRole = await RoleRepository.getRoleByName(name);
    if (existingRole) throw new RoleError('El rol ya existe');

    return await RoleRepository.create(name);
  };

  static getRoles = async (includeInactive) => await RoleRepository.getRoles(includeInactive);

  static getById = async (id) => {
    RoleValidation.id(id);

    const role = await RoleRepository.getRole(id);
    if (!role) throw new RoleError('El rol no existe');
    return role;
  };

  static updateById = async (id, data) => {
    const { name } = data;
    RoleValidation.id(id);

    const currentRole = await RoleRepository.getRole(id);
    if (!currentRole) throw new RoleError('El rol no existe');

    if (name && (name !== currentRole.name)) {
      RoleValidation.name(name);
      const existingRole = await RoleRepository.getRoleByName(name);
      if (existingRole) throw new RoleError('El rol ya existe');
    }

    return await RoleRepository.updateRole(id, { name });
  };

  static deleteById = async (id) => {
    RoleValidation.id(id);

    const role = await RoleRepository.getRole(id);
    if (!role) throw new RoleError('El rol no existe');
    if (!role.isActive) throw new RoleError('El rol ya fue eliminado');

    return await RoleRepository.deleteRole(id);
  };
};

export default RoleService;
