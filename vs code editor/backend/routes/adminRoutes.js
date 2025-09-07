const express = require('express');
const { adminStats } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/stats', protect, adminOnly, adminStats);
module.exports = router;
