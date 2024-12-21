import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isActive: { type: Boolean, default: true }
});

const Role = mongoose.model('Role', roleSchema);

export default Role;
