const express = require('express');
const { ownerStores, storeRaters } = require('../controllers/ownerController');
const { protect, ownerOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/stores', protect, ownerOnly, ownerStores);
router.get('/stores/:storeId/raters', protect, ownerOnly, storeRaters);

module.exports = router;
