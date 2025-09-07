// const jwt = require('jsonwebtoken');

// const generateToken = (user) => {
//   if (!process.env.JWT_SECRET) {
//     throw new Error('JWT_SECRET is not defined in .env');
//   }

//   return jwt.sign(
//     { id: user.id, role: user.role },
//     process.env.JWT_SECRET,  // Corrected process.env
//     { expiresIn: '1d' }
//   );
// };

// module.exports = { generateToken };
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

module.exports = { generateToken };
