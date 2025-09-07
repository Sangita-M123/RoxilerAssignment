const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/db');
const User = require('../models/userModel');

(async () => {
  await sequelize.authenticate();

  const createIfNotExists = async (email, role) => {
    let user = await User.findOne({ where: { email } });
    if (!user) {
      const hashed = bcrypt.hashSync('AdminPass1!', 10);
      user = await User.create({
        name: `${role} Example User With Long Name`,
        email,
        password: hashed,
        address: 'Head Office',
        role
      });
      console.log(`${role} created:`, email, 'password: AdminPass1!');
    } else {
      console.log(`${role} already exists:`, email);
    }
  };

  await createIfNotExists('admin@example.com', 'admin');
  await createIfNotExists('owner@example.com', 'owner');

  process.exit(0);
})();
