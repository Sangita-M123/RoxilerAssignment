// const User = require('../models/userModel');
// const bcrypt = require('bcryptjs');
// const { generateToken } = require('../config/jwt');

// const signup = async (req, res) => {
//   try {
//     const { name, email, password, address, role } = req.body;

//     // role must be 'user', 'admin', or 'owner'
//     if (!['user', 'admin', 'owner'].includes(role)) {
//       return res.status(400).json({ message: 'Invalid role' });
//     }

//     const exists = await User.findOne({ where: { email } });
//     if (exists) return res.status(400).json({ message: 'Email already exists' });

//     const hashed = bcrypt.hashSync(password, 10);
//     const user = await User.create({ name, email, password: hashed, address, role });

//     const token = generateToken(user);
//     res.json({
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Signup failed', error: err.message });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ where: { email } });
//     if (!user || !bcrypt.compareSync(password, user.password))
//       return res.status(401).json({ message: 'Invalid credentials' });

//     const token = generateToken(user);
//     res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
//   } catch (err) {
//     res.status(500).json({ message: 'Login failed', error: err.message });
//   }
// };

// const changePassword = async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;
//     const user = await User.findByPk(req.user.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const match = await bcrypt.compare(currentPassword, user.password);
//     if (!match) return res.status(400).json({ message: 'Current password incorrect' });

//     user.password = await bcrypt.hash(newPassword, 10);
//     await user.save();

//     res.json({ message: 'Password updated successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating password' });
//   }
// };

// module.exports = { signup, login, changePassword };
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../config/jwt');

const signup = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    const userRole = role && ['user', 'admin', 'owner'].includes(role) ? role : 'user';

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, address, role: userRole });

    const token = generateToken(user);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user || !bcrypt.compareSync(currentPassword, user.password))
      return res.status(400).json({ message: 'Current password is incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating password', error: err.message });
  }
};

module.exports = { signup, login, changePassword };
