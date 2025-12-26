import Url from '../models/Url.js';

// Get analytics for a specific URL
export const getAnalytics = async (req, res, next) => {
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

    // Calculate analytics
    const totalClicks = url.clicks;
    const clicksByDate = {};
    const clicksByReferrer = {};
    const clicksByUserAgent = {};

    url.clickDetails.forEach(click => {
      // Group by date
      const date = click.timestamp.toISOString().split('T')[0];
      clicksByDate[date] = (clicksByDate[date] || 0) + 1;

      // Group by referrer
      const referrer = click.referrer || 'direct';
      clicksByReferrer[referrer] = (clicksByReferrer[referrer] || 0) + 1;

      // Group by device (basic)
      const ua = click.userAgent || '';
      let device = 'Unknown';
      if (ua.includes('Mobile')) device = 'Mobile';
      else if (ua.includes('Tablet')) device = 'Tablet';
      else if (ua.includes('Windows') || ua.includes('Mac')) device = 'Desktop';
      
      clicksByUserAgent[device] = (clicksByUserAgent[device] || 0) + 1;
    });

    res.json({
      success: true,
      data: {
        shortUrl: url.getFullShortUrl(config.baseUrl),
        originalUrl: url.originalUrl,
        totalClicks,
        createdAt: url.createdAt,
        analytics: {
          clicksByDate,
          clicksByReferrer,
          clicksByDevice: clicksByUserAgent,
          recentClicks: url.clickDetails.slice(-20).map(click => ({
            timestamp: click.timestamp,
            referrer: click.referrer || 'direct',
            ip: click.ip
          }))
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get overall statistics
export const getOverallStats = async (req, res, next) => {
  try {
    const totalUrls = await Url.countDocuments({ isActive: true });
    const totalClicks = await Url.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, total: { $sum: '$clicks' } } }
    ]);

    const topUrls = await Url.find({ isActive: true })
      .sort('-clicks')
      .limit(10)
      .select('originalUrl shortCode customAlias clicks');

    res.json({
      success: true,
      data: {
        totalUrls,
        totalClicks: totalClicks[0]?.total || 0,
        topUrls: topUrls.map(url => ({
          shortUrl: url.getFullShortUrl(config.baseUrl),
          originalUrl: url.originalUrl,
          clicks: url.clicks
        }))
      }
    });
  } catch (error) {
    next(error);
  }
};