// const jwt = require("jsonwebtoken");

// // Middleware to protect routes (require login)
// const protect = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = decoded; // Attach user info (id, role) to request object
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// // Middleware to allow only admins
// const adminOnly = (req, res, next) => {
//   if (!req.user || req.user.role !== "admin") {
//     return res.status(403).json({ message: "Admin access only" });
//   }
//   next();
// };

// // Middleware to allow only owners
// const ownerOnly = (req, res, next) => {
//   if (!req.user || req.user.role !== "owner") {
//     return res.status(403).json({ message: "Owner access only" });
//   }
//   next();
// };

// module.exports = { protect, adminOnly, ownerOnly };
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' });
  next();
};

const ownerOnly = (req, res, next) => {
  if (req.user.role !== 'owner') return res.status(403).json({ message: 'Owners only' });
  next();
};

module.exports = { protect, adminOnly, ownerOnly };
