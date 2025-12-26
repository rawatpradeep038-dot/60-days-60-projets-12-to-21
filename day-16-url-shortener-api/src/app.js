import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import urlRoutes from './routes/urlRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import { generalLimiter } from './middleware/rateLimit.js';

const app = express();

// Security middleware
app.use(helmet()); // Security headers
app.use(cors()); // CORS enable
app.use(generalLimiter); // Rate limiting

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 URL Shortener API is running!',
    version: '1.0.0',
    endpoints: {
      createUrl: 'POST /api/urls',
      getUrl: 'GET /api/urls/:shortCode',
      deleteUrl: 'DELETE /api/urls/:shortCode',
      analytics: 'GET /api/analytics/:shortCode',
      stats: 'GET /api/analytics/stats/overall'
    }
  });
});

// API Routes
app.use('/api/urls', urlRoutes);
app.use('/api/analytics', analyticsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler (should be last)
app.use(errorHandler);

export default app;