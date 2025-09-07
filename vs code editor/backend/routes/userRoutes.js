// const express = require('express');
// const { listUsers, deleteUser } = require('../controllers/userController');
// const { protect, adminOnly } = require('../middleware/authMiddleware');
// const router = express.Router();

// // Admin can view & delete users
// router.get('/', protect, adminOnly, listUsers);
// router.delete('/:id', protect, adminOnly, deleteUser);

// module.exports = router;
const express = require('express');
const { listUsers, deleteUser, updateUser } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

// Admin can view, update, & delete users
router.get('/', protect, adminOnly, listUsers);
router.delete('/:id', protect, adminOnly, deleteUser);
router.put('/:id', protect, adminOnly, updateUser);

module.exports = router;