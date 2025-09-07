const express = require('express');
const { listUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

// Admin user management
router.get('/', protect, adminOnly, listUsers);
router.post('/', protect, adminOnly, createUser);
router.put('/:id', protect, adminOnly, updateUser);
router.delete('/:id', protect, adminOnly, deleteUser);

module.exports = router;
