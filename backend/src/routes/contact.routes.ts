import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { submitContactForm } from '../controllers/contact.controller';

const router = Router();

const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many contact requests. Please try again later.',
  },
});

router.post('/', contactRateLimiter, submitContactForm);

export default router;
