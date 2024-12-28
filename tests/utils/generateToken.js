import jwt from 'jsonwebtoken';
import { REFRESH_TOKEN_SECRET, SECRET_JWT } from '../../src/config/enviroment';
import RoleRepository from '../../src/Role/role.repository';

export const generateToken = async () => {
  const role = await RoleRepository.getRoleByName('admin');

  const payload = { role: { _id: role?._id, name: role?.name } };
  const authToken = jwt.sign(payload, SECRET_JWT, { expiresIn: '1h' });

  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

  return { authToken, refreshToken };
};
