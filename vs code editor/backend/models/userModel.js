// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../config/db");

// const User = sequelize.define("User", {
//   id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
//   name: { type: DataTypes.STRING, allowNull: false },
//   email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
//   password: { type: DataTypes.STRING, allowNull: false },
//   address: { type: DataTypes.STRING, allowNull: false },
//   role: { type: DataTypes.STRING, defaultValue: "user", validate: { isIn: [["user", "admin", "owner"]] } }
// });

// module.exports = User;
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
  address: DataTypes.STRING,
  role: { type: DataTypes.STRING, defaultValue: 'user' }
});

module.exports = User;
