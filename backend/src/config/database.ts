import mongoose from 'mongoose';

// Cache connection for serverless functions
let cachedConnection: typeof mongoose | null = null;

export const connectDB = async () => {
  try {
    // Reuse existing connection if available (serverless optimization)
    if (cachedConnection && mongoose.connection.readyState === 1) {
      console.log('Using cached MongoDB connection');
      return cachedConnection;
    }

    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    
    // Connect with serverless-friendly options
    const connection = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    cachedConnection = connection;
    console.log('MongoDB connected successfully');
    return cachedConnection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};
