// const User = require('../models/userModel');
// const { Op } = require('sequelize');

// const listUsers = async (req, res) => {
//   try {
//     const { query } = req.query;
//     const where = query
//       ? {
//           [Op.or]: [
//             { name: { [Op.like]: `%${query}%` } },
//             { email: { [Op.like]: `%${query}%` } },
//             { address: { [Op.like]: `%${query}%` } }
//           ]
//         }
//       : {};
//     const users = await User.findAll({ where, attributes: ['id', 'name', 'email', 'role', 'address'] });
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch users' });
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByPk(id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     await user.destroy();
//     res.json({ message: 'User deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to delete user' });
//   }
// };

// const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByPk(id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     await user.update(req.body);
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to update user' });
//   }
// };

// module.exports = { listUsers, deleteUser, updateUser };
const User = require('../models/userModel');
const { Op } = require('sequelize');

const listUsers = async (req, res) => {
    try {
        const { query } = req.query;
        const where = query ? {
            [Op.or]: [{
                name: {
                    [Op.like]: `%${query}%`
                }
            }, {
                email: {
                    [Op.like]: `%${query}%`
                }
            }, {
                address: {
                    [Op.like]: `%${query}%`
                }
            }]
        } : {};
        const users = await User.findAll({
            where,
            attributes: ['id', 'name', 'email', 'role', 'address']
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({
            message: 'Failed to fetch users'
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({
            message: 'User not found'
        });

        await user.destroy();
        res.json({
            message: 'User deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to delete user'
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        await user.update(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json({
            message: 'Failed to update user'
        });
    }
};

module.exports = {
    listUsers,
    deleteUser,
    updateUser
};