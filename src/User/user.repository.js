import User from './user.model.js';

class UserRepository {
  static findByUsername = async (username) => {
    return await User.findOne({ username });
  };

  static create = async ({ username, password, role }) => {
    const newUser = new User({ username, password, role });
    return await newUser.save();
  };

  static getUsers = async (includeInactive) => {
    const filter = includeInactive === 'true' ? {} : { isActive: true };
    return await User.find(filter).populate({
      path: 'role',
      select: '_id name'
    });
  };

  static getById = async (id) => await User.findById(id).populate({
    path: 'role',
    select: '_id name'
  });

  static updateById = async (id, data) => await User.findByIdAndUpdate(id, { $set: { ...data } }).populate({
    path: 'role',
    select: '_id name'
  });

  static deleteById = async (id) => await User.findByIdAndUpdate(id, { $set: { isActive: false } }).populate({
    path: 'role',
    select: '_id name'
  });
};

export default UserRepository;
