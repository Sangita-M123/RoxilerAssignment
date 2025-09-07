const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

// List users
const listUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const where = query ? {
      [Op.or]: [
        { name: { [Op.like]: `%${query}%` } },
        { email: { [Op.like]: `%${query}%` } },
        { address: { [Op.like]: `%${query}%` } }
      ]
    } : {};
    const users = await User.findAll({ where, attributes: ['id', 'name', 'email', 'role', 'address'] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Admin creates a user
const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, address, role: role || 'user' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create user', error: err.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user' });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

module.exports = { listUsers, createUser, updateUser, deleteUser };
