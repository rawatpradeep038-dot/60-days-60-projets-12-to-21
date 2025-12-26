import app from './app.js';
import connectDB from './config/database.js';
import config from './config/config.js';

// Database connect karo
connectDB();

// Server start karo
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════╗
║   🚀 URL Shortener API Started!      ║
║   📡 Server: http://localhost:${PORT}   ║
║   🌍 Environment: ${config.nodeEnv}       ║
║   📊 MongoDB: Connected              ║
╚══════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});