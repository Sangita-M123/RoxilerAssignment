const express = require('express');
const { listStores, getStore, createStore, updateStore } = require('../controllers/storeController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, listStores);
router.get('/:id', protect, getStore);
router.post('/', protect, adminOnly, createStore);
router.put('/:id', protect, adminOnly, updateStore);

module.exports = router;
