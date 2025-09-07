const User = require('../models/userModel');
const Store = require('../models/storeModel');
const Rating = require('../models/ratingModel');

const adminStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();
    res.json({ totalUsers, totalStores, totalRatings });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load stats' });
  }
};

module.exports = { adminStats };
