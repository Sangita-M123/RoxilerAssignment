const express = require('express');
const { signup, login, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Auth routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/change-password', protect, changePassword);

module.exports = router;


