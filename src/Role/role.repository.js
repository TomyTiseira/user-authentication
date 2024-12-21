import Role from './role.model.js';

class RoleRepository {
  static create = async (name) => {
    const newRole = new Role({ name });
    return await newRole.save();
  };

  static getRole = async (id) => await Role.findById(id);

  static getRoleByName = async (name) => await Role.findOne({ name });

  static getRoles = async (includeInactive) => {
    const filter = includeInactive === 'true' ? {} : { isActive: true };
    return await Role.find(filter);
  };

  static updateRole = async (id, data) => await Role.findByIdAndUpdate(id, { $set: { ...data } });

  static deleteRole = async (id) => await Role.findByIdAndUpdate(id, { $set: { isActive: false } });
};

export default RoleRepository;
