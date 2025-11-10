
const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info('mongoDB connected');
    
  } catch (err) {
    logger.error('mongoDB connection error:', err.message);
    process.exit(1);
  }
};


module.exports = connectDB;