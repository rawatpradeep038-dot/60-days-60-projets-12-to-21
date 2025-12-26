import mongoose from 'mongoose';

// MongoDB se connect karne ka function
const connectDB = async () => {
  try {
    // MongoDB se connection banao
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1); // Agar connection fail ho toh app band kar do
  }
};

export default connectDB;