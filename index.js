require('dotenv').config();
const express = require('express');
const { connectDB } = require('./src/utils/db');
const userRoutes = require('./src/api/routes/users');

const app = express();
connectDB();
const PORT = 8000;
app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found 🦖');
});
app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT} 🎧`);
});
