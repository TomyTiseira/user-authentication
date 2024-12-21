import RoleService from './role.service.js';

export const createRole = async (req, res, next) => {
  try {
    const { name } = req.body;
    const role = await RoleService.create({ name });

    res.status(201).json(role);
  } catch (error) {
    next(error);
  }
};

export const getRoles = async (req, res, next) => {
  try {
    const { includeInactive } = req.query;

    const roles = await RoleService.getRoles(includeInactive);

    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const role = await RoleService.getById(id);

    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const data = { name };

    const role = await RoleService.updateById(id, data);

    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

export const deleteRole = async (req, res, next) => {
  try {
    const id = req.params.id;
    const role = await RoleService.deleteById(id);

    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};
