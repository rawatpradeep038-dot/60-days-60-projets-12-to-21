import express from 'express';
import {
  createShortUrl,
  redirectToUrl,
  getUrlInfo,
  deleteUrl,
  getAllUrls
} from '../controllers/urlController.js';
import {
  validateCreateUrl,
  validateShortCode
} from '../middleware/validation.js';
import { createUrlLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

// Create short URL
router.post('/', createUrlLimiter, validateCreateUrl, createShortUrl);

// Get all URLs
router.get('/all', getAllUrls);

// Get URL info
router.get('/:shortCode/info', validateShortCode, getUrlInfo);

// Delete URL
router.delete('/:shortCode', validateShortCode, deleteUrl);

// Redirect to original URL (should be last)
router.get('/:shortCode', validateShortCode, redirectToUrl);

export default router;