const Store = require('../models/storeModel');
const { Op } = require('sequelize');

const listStores = async (req, res) => {
  try {
    const { query } = req.query;
    const where = query
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${query}%` } },
            { address: { [Op.like]: `%${query}%` } }
          ]
        }
      : {};
    const stores = await Store.findAll({ where });
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stores' });
  }
};
const getStore = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findByPk(id, { include: ['owner'] }); // include owner
    if (!store) return res.status(404).json({ message: 'Store not found' });
    res.json(store);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch store' });
  }
};



const createStore = async (req, res) => {
  try {
    const { name, email, address, ownerUserId } = req.body;
    const store = await Store.create({ name, email, address, ownerUserId });
    res.json(store);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create store' });
  }
};

const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findByPk(id);
    if (!store) return res.status(404).json({ message: 'Store not found' });

    await store.update(req.body);
    res.json(store);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update store' });
  }
};

module.exports = { listStores, createStore, updateStore ,getStore};
