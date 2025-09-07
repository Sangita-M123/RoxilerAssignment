const express = require('express');
const { addRating } = require('../controllers/ratingController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Add or update rating
router.post('/', protect, addRating);

module.exports = router;


