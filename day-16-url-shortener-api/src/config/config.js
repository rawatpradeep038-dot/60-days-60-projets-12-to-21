import dotenv from 'dotenv';

// .env file ko load karo
dotenv.config();

// Sabhi settings ek jagah
const config = {
  // Server settings
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database
  mongoUri: process.env.MONGODB_URI,
  
  // Application
  baseUrl: process.env.BASE_URL || 'http://localhost:5000',
  shortCodeLength: parseInt(process.env.SHORT_CODE_LENGTH) || 6,
  
  // Rate limiting
  rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
};

export default config;