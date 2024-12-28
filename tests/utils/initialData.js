import Role from '../../src/Role/role.model.js';
import User from '../../src/User/user.model.js';

export const initialData = async () => {
  const roles = await Role.insertMany([
    { name: 'admin' },
    { name: 'user' }
  ]);

  // Crear usuarios con las referencias correctas de los roles
  const adminRole = roles.find(role => role.name === 'admin')._id;
  const userRole = roles.find(role => role.name === 'user')._id;

  const users = [
    { username: 'admin', password: '1234567', role: adminRole },
    { username: 'user', password: '1234567', role: userRole }
  ];

  await User.insertMany(users);
};
