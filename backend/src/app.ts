import './config/env';
import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contact.routes';

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/contact', contactRoutes);

export default app;
