import express from 'express';
import {
  getAnalytics,
  getOverallStats
} from '../controllers/analyticsController.js';
import { validateShortCode } from '../middleware/validation.js';

const router = express.Router();

// Get analytics for specific URL
router.get('/:shortCode', validateShortCode, getAnalytics);

// Get overall statistics
router.get('/stats/overall', getOverallStats);

export default router;