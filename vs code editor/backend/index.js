// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const { connectDB, sequelize } = require('./config/db');

// // Load environment variables
// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json()); // Built-in JSON parser

// // Connect to database
// connectDB();

// // Sync database models
// sequelize.sync({ alter: true })
//   .then(() => console.log('✅ Database & tables created!'))
//   .catch(err => console.error('❌ Error creating database & tables:', err));

// // Test route
// app.get('/', (req, res) => res.send('API Running'));

// // Main Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/stores', require('./routes/storeRoutes'));
// app.use('/api/ratings', require('./routes/ratingRoutes'));
// app.use('/api/admin', require('./routes/adminRoutes'));   // Admin routes
// app.use('/api/owner', require('./routes/ownerRoutes'));   // Owner routes

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB, sequelize } = require('./config/db');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

sequelize.sync({ alter: true })
  .then(() => console.log('✅ Database synced'))
  .catch(err => console.error('❌ Sync error:', err));

app.get('/', (req, res) => res.send('API Running'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/stores', require('./routes/storeRoutes'));
app.use('/api/ratings', require('./routes/ratingRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
