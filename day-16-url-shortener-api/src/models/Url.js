import mongoose from 'mongoose';

// URL ka structure define karo (kaunsa data save hoga)
const urlSchema = new mongoose.Schema(
  {
    // Original long URL
    originalUrl: {
      type: String,
      required: true, // Ye field zaroori hai
      trim: true // Extra spaces remove karo
    },
    
    // Short code (xyz.com/abc123)
    shortCode: {
      type: String,
      required: true,
      unique: true, // Duplicate nahi hona chahiye
      trim: true,
      index: true // Fast searching ke liye
    },
    
    // Custom alias (optional, user apna code dal sakta hai)
    customAlias: {
      type: String,
      trim: true,
      sparse: true, // null values allow but unique when present
      index: true
    },
    
    // Analytics data
    clicks: {
      type: Number,
      default: 0 // Initially 0 clicks
    },
    
    // Har click ki details
    clickDetails: [
      {
        timestamp: {
          type: Date,
          default: Date.now
        },
        // User ki location
        ip: String,
        userAgent: String,
        referrer: String,
        country: String,
        city: String
      }
    ],
    
    // URL active hai ya deleted
    isActive: {
      type: Boolean,
      default: true
    },
    
    // Expiry date (optional)
    expiresAt: {
      type: Date,
      default: null
    },
    
    // Kis user ne banaya (future use)
    createdBy: {
      type: String,
      default: 'anonymous'
    }
  },
  {
    timestamps: true // createdAt aur updatedAt automatically add hoga
  }
);

// Short URL banane se pehle check karo (middleware)
urlSchema.pre('save', function(next) {
  // Agar expiry date past me hai toh error
  if (this.expiresAt && this.expiresAt < Date.now()) {
    return next(new Error('Expiry date cannot be in the past'));
  }
  next();
});

// Helper method: Full short URL return karo
urlSchema.methods.getFullShortUrl = function(baseUrl) {
  const code = this.customAlias || this.shortCode;
  return `${baseUrl}/${code}`;
};

// Model banao (isse database me interact karenge)
const Url = mongoose.model('Url', urlSchema);

export default Url;