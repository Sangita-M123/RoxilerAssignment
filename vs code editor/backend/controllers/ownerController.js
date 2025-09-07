const Store = require('../models/storeModel');
const Rating = require('../models/ratingModel');
const User = require('../models/userModel');

const ownerStores = async (req, res) => {
  try {
    const stores = await Store.findAll({ where: { ownerUserId: req.user.id } });
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stores' });
  }
};

const storeRaters = async (req, res) => {
  try {
    const { storeId } = req.params;
    const ratings = await Rating.findAll({
      where: { store_id: storeId },
      include: [{ model: User, as: 'user', attributes: ['name', 'email'] }]
    });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch raters' });
  }
};

module.exports = { ownerStores, storeRaters };
