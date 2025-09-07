// const express = require('express');
// const { listUsers, deleteUser } = require('../controllers/userController');
// const { protect, adminOnly } = require('../middleware/authMiddleware');
// const router = express.Router();

// router.get('/', protect, adminOnly, listUsers);
// router.delete('/:id', protect, adminOnly, deleteUser);

// module.exports = router;

// const express = require('express');
// const { listStores, createStore } = require('../controllers/storeController');
// const { protect, adminOnly } = require('../middleware/authMiddleware');
// const router = express.Router();
// router.get('/', protect, listStores);
// // List stores - any logged-in user
// router.get('/:id', protect, listStores);

// // Create store - admin only
// router.post('/', protect, adminOnly, createStore);

// module.exports = router;
const express = require('express');
const { listStores, createStore, getStore, updateStore } = require('../controllers/storeController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

// List stores - any logged-in user
router.get('/', protect, listStores);

// Get single store by ID - any logged-in user
router.get('/:id', protect, getStore);

// Create store - admin only
router.post('/', protect, adminOnly, createStore);

// Update store - admin only
router.put('/:id', protect, adminOnly, updateStore);

module.exports = router;
