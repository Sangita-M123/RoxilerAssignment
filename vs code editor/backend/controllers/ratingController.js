
const Rating = require('../models/ratingModel');
const Store = require('../models/storeModel');

const addRating = async (req, res) => {
  try {
    const { store_id, score } = req.body;
    const user_id = req.user.id;

    // Find existing rating
    let rating = await Rating.findOne({ where: { store_id, user_id } });
    if (rating) {
      rating.score = score;
      await rating.save();
    } else {
      await Rating.create({ store_id, user_id, score });
    }

    // Recalculate average rating for store
    const ratings = await Rating.findAll({ where: { store_id } });
    const avg = ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length;

    const store = await Store.findByPk(store_id);
    store.rating_avg = avg;
    store.rating_count = ratings.length;
    await store.save();

    res.json({ message: 'Rating saved', store });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add rating', error: err.message });
  }
};

module.exports = { addRating };
