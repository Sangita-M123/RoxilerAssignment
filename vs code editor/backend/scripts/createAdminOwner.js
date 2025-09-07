const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/db');
const User = require('../models/userModel');

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected ✅");

    const createOrUpdateUser = async (email, role) => {
      let user = await User.findOne({ where: { email } });

      // password to login
      const password = 'AdminPass1!'; // you can change this if you want
      const hashed = bcrypt.hashSync(password, 10);

      if (!user) {
        // create new user
        user = await User.create({
          name: `${role} Example User With Long Name`,
          email,
          password: hashed,
          address: "Head Office",
          role
        });
        console.log(`${role} created: ${email} / ${password}`);
      } else {
        // update existing user
        user.role = role;
        user.password = hashed;
        await user.save();
        console.log(`${role} updated: ${email} / ${password}`);
      }
    };

    // create or update both users
    await createOrUpdateUser("admin@example.com", "admin");
    await createOrUpdateUser("owner@example.com", "owner");

    console.log("✅ Done! Now login with above emails and password.");
    process.exit(0);

  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
})();
