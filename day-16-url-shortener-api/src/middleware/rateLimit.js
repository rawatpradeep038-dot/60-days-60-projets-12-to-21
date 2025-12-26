import rateLimit from 'express-rate-limit';
import config from '../config/config.js';

// Kitni baar API call kar sakte ho limit karo
export const createUrlLimiter = rateLimit({
  windowMs: config.rateLimitWindow, // 15 minutes
  max: config.rateLimitMax, // 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many URLs created from this IP, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false
});

// General API limiter
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // 200 requests
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});