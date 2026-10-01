import '../src/config/env';
import app from '../src/app';
import { connectDB } from '../src/config/database';

// Vercel serverless function handler
// Connects to database before handling each request
export default async (req: any, res: any) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? String(error) : undefined
    });
  }
};
