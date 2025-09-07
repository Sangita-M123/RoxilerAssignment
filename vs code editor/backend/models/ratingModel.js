// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../config/db");
// const User = require("./userModel");
// const Store = require("./storeModel");

// const Rating = sequelize.define("Rating", {
//   id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
//   score: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } }
// });

// Rating.belongsTo(User, { foreignKey: "user_id", as: "user" });
// Rating.belongsTo(Store, { foreignKey: "store_id", as: "store" });

// module.exports = Rating;
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./userModel');
const Store = require('./storeModel');

const Rating = sequelize.define('Rating', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  score: DataTypes.INTEGER
});

Rating.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Rating.belongsTo(Store, { foreignKey: 'store_id', as: 'store' });

module.exports = Rating;
