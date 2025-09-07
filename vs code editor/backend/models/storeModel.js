// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../config/db");
// const User = require("./userModel");

// const Store = sequelize.define("Store", {
//   id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
//   name: { type: DataTypes.STRING, allowNull: false },
//   email: { type: DataTypes.STRING, allowNull: true, validate: { isEmail: true } },
//   address: { type: DataTypes.STRING, allowNull: false },
//   rating_avg: { type: DataTypes.FLOAT, defaultValue: 0 },
//   rating_count: { type: DataTypes.INTEGER, defaultValue: 0 },
// });

// Store.belongsTo(User, { foreignKey: "ownerUserId", as: "owner" });

// module.exports = Store;
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
