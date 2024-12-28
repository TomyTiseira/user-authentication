import Role from '../../src/Role/role.model.js';
import User from '../../src/User/user.model.js';

export const cleanData = async () => {
  await Promise.all([
    Role.deleteMany({}),
    User.deleteMany({})
  ]);
};
