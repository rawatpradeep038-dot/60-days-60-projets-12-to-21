import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: [true, 'Original URL is required'],
      trim: true
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    customAlias: {
      type: String,
      trim: true,
      sparse: true,
      index: true
    },
    clicks: {
      type: Number,
      default: 0
    },
    clickDetails: [{
      timestamp: {
        type: Date,
        default: Date.now
      },
      ip: String,
      userAgent: String,
      referrer: String
    }],
    isActive: {
      type: Boolean,
      default: true
    },
    expiresAt: {
      type: Date,
      default: null
    },
    createdBy: {
      type: String,
      default: 'anonymous'
    }
  },
  {
    timestamps: true
  }
);

// Helper method
urlSchema.methods.getFullShortUrl = function(baseUrl) {
  const code = this.customAlias || this.shortCode;
  return `${baseUrl}/${code}`;
};

const Url = mongoose.model('Url', urlSchema);

export default Url;