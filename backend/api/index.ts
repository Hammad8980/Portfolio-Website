import '../src/config/env';
import app from '../src/app';
import { connectDB } from '../src/config/database';

// Vercel serverless function handler
// Connects to database before handling each request
export default async (req: any, res: any) => {
  // Detailed logging for diagnosis
  console.log('=== Serverless Function Called ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Origin:', req.headers.origin);
  console.log('FRONTEND_URL env:', process.env.FRONTEND_URL);
  console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));

  // Handle OPTIONS preflight request manually for CORS
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request');
    const origin = req.headers.origin || '';
    const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';
    
    console.log('Allowed origin:', allowedOrigin);
    console.log('Request origin:', origin);
    console.log('Origins match:', origin === allowedOrigin);

    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');
    return res.status(200).end();
  }

  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected, passing to Express app');
    return app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? String(error) : undefined
    });
  }
};
