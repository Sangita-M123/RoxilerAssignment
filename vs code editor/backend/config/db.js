// const { Sequelize } = require('sequelize');
// const dotenv = require('dotenv');

// dotenv.config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT || 3306, // Default to 3306 if not in .env
//     dialect: 'mysql',
//     logging: false,
//   }
// );

// const connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('✅ MySQL Connected Successfully');
//   } catch (err) {
//     console.error('❌ Database Connection Failed:', err.message);
//     process.exit(1);
//   }
// };

// module.exports = { sequelize, connectDB };
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: process.env.DB_HOST,
    logging: false
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Connected');
  } catch (err) {
    console.error('❌ Database Connection Failed:', err);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
