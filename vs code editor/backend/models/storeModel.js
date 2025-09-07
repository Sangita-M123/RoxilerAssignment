
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./userModel');

const Store = sequelize.define('Store', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  address: DataTypes.STRING,
  rating_avg: { type: DataTypes.FLOAT, defaultValue: 0 },
  rating_count: { type: DataTypes.INTEGER, defaultValue: 0 }
});

Store.belongsTo(User, { foreignKey: 'ownerUserId', as: 'owner' });

module.exports = Store;
