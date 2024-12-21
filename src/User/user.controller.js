import { roles } from '../constants/roles.js';
import UserService from './user.service.js';

export const createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserService.create({ username, password, role: roles.USER });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const createAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserService.create({ username, password, role: roles.ADMIN });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const { includeInactive } = req.query;

    const users = await UserService.getUsers(includeInactive);

    res.status(201).json(users);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UserService.getById(id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { username, password, role } = req.body;
    const data = { username, password, role };

    const user = await UserService.updateById(id, data);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userDeleted = await UserService.deleteById(id);

    res.status(200).json(userDeleted);
  } catch (error) {
    next(error);
  }
};
