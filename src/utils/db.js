const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('DB is on! 🔌');
  } catch (error) {
    console.log('DB is down 🥲');
  }
};

module.exports = { connectDB };
