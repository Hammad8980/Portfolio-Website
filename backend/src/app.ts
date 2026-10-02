import './config/env';
import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contact.routes';

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    name: 'Portfolio Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      contact: 'POST /api/contact',
    },
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.get('/favicon.ico', (_req, res) => {
  res.status(204).end();
});

app.use('/api/contact', contactRoutes);

export default app;
