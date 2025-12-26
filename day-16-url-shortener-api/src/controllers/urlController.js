import Url from '../models/Url.js';
import { generateShortCode } from '../utils/shortCodeGenerator.js';
import config from '../config/config.js';

// 1. Create Short URL
export const createShortUrl = async (req, res, next) => {
  try {
    const { originalUrl, customAlias, expiresAt } = req.body;

    // Agar custom alias diya hai toh check karo already exists toh nahi
    if (customAlias) {
      const existingUrl = await Url.findOne({ customAlias });
      if (existingUrl) {
        return res.status(400).json({
          success: false,
          message: 'Custom alias already taken'
        });
      }
    }

    // Short code generate karo
    let shortCode = generateShortCode(config.shortCodeLength);
    
    // Check karo short code already exist toh nahi (rare case)
    let existingCode = await Url.findOne({ shortCode });
    while (existingCode) {
      shortCode = generateShortCode(config.shortCodeLength);
      existingCode = await Url.findOne({ shortCode });
    }

    // Database me save karo
    const url = await Url.create({
      originalUrl,
      shortCode,
      customAlias: customAlias || null,
      expiresAt: expiresAt || null
    });

    // Response bhejo
    res.status(201).json({
      success: true,
      message: 'Short URL created successfully',
      data: {
        originalUrl: url.originalUrl,
        shortUrl: url.getFullShortUrl(config.baseUrl),
        shortCode: customAlias || shortCode,
        createdAt: url.createdAt,
        expiresAt: url.expiresAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// 2. Redirect to Original URL
export const redirectToUrl = async (req, res, next) => {
  try {
    const { shortCode } = req.params;

    // Short code ya custom alias se URL dhundo
    const url = await Url.findOne({
      $or: [{ shortCode }, { customAlias: shortCode }],
      isActive: true
    });

    // URL nahi mila
    if (!url) {
      return res.status(404).json({
        success: false,
        message: 'Short URL not found'
      });
    }

    // Check expiry
    if (url.expiresAt && new Date() > url.expiresAt) {
      return res.status(410).json({
        success: false,
        message: 'This short URL has expired'
      });
    }

    // Analytics save karo
    url.clicks += 1;
    url.clickDetails.push({
      timestamp: new Date(),
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      referrer: req.headers['referer'] || 'direct'
    });

    await url.save();

    // Original URL pe redirect karo
    res.redirect(url.originalUrl);
  } catch (error) {
    next(error);
  }
};

// 3. Get URL Info (with analytics)
export const getUrlInfo = async (req, res, next) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({
      $or: [{ shortCode }, { customAlias: shortCode }]
    });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: 'Short URL not found'
      });
    }

    res.json({
      success: true,
      data: {
        originalUrl: url.originalUrl,
        shortUrl: url.getFullShortUrl(config.baseUrl),
        shortCode: url.customAlias || url.shortCode,
        clicks: url.clicks,
        isActive: url.isActive,
        createdAt: url.createdAt,
        expiresAt: url.expiresAt,
        clickDetails: url.clickDetails.slice(-10) // Last 10 clicks
      }
    });
  } catch (error) {
    next(error);
  }
};

// 4. Delete URL
export const deleteUrl = async (req, res, next) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOneAndUpdate(
      { $or: [{ shortCode }, { customAlias: shortCode }] },
      { isActive: false },
      { new: true }
    );

    if (!url) {
      return res.status(404).json({
        success: false,
        message: 'Short URL not found'
      });
    }

    res.json({
      success: true,
      message: 'Short URL deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// 5. Get All URLs (for dashboard)
export const getAllUrls = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt' } = req.query;

    const urls = await Url.find({ isActive: true })
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-clickDetails'); // Don't send all click details

    const count = await Url.countDocuments({ isActive: true });

    res.json({
      success: true,
      data: {
        urls: urls.map(url => ({
          originalUrl: url.originalUrl,
          shortUrl: url.getFullShortUrl(config.baseUrl),
          shortCode: url.customAlias || url.shortCode,
          clicks: url.clicks,
          createdAt: url.createdAt,
          expiresAt: url.expiresAt
        })),
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalUrls: count
      }
    });
  } catch (error) {
    next(error);
  }
};