import { body, param, validationResult } from 'express-validator';
import { isValidUrl, isSafeUrl } from '../utils/validators.js';
import { isValidCustomAlias, isReservedWord } from '../utils/shortCodeGenerator.js';

// Validation errors check karo
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  
  next();
};

// URL create karte waqt validation
export const validateCreateUrl = [
  body('originalUrl')
    .trim()
    .notEmpty().withMessage('URL is required')
    .custom((value) => {
      if (!isValidUrl(value)) {
        throw new Error('Invalid URL format');
      }
      if (!isSafeUrl(value)) {
        throw new Error('URL is not allowed');
      }
      return true;
    }),
  
  body('customAlias')
    .optional()
    .trim()
    .custom((value) => {
      if (!isValidCustomAlias(value)) {
        throw new Error('Custom alias must be 3-20 characters, alphanumeric, hyphens, or underscores only');
      }
      if (isReservedWord(value)) {
        throw new Error('This custom alias is reserved');
      }
      return true;
    }),
  
  body('expiresAt')
    .optional()
    .isISO8601().withMessage('Invalid date format')
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error('Expiry date must be in the future');
      }
      return true;
    }),
  
  validate
];

// Short code validate karo
export const validateShortCode = [
  param('shortCode')
    .trim()
    .notEmpty().withMessage('Short code is required')
    .isLength({ min: 3, max: 20 }).withMessage('Invalid short code'),
  
  validate
];