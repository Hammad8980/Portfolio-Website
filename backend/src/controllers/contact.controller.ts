import { Request, Response } from 'express';
import { Contact } from '../models/Contact';
import { emailService } from '../services/email.service';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const trimString = (value: unknown): string =>
  typeof value === 'string' ? value.trim() : '';

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const name = trimString(req.body.name);
    const email = trimString(req.body.email).toLowerCase();
    const subject = trimString(req.body.subject);
    const message = trimString(req.body.message);

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'Name, email, subject, and message are required',
      });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    if (name.length > 100) {
      return res.status(400).json({ error: 'Name must be 100 characters or fewer' });
    }

    if (subject.length > 200) {
      return res.status(400).json({
        error: 'Subject must be 200 characters or fewer',
      });
    }

    if (message.length > 5000) {
      return res.status(400).json({
        error: 'Message must be 5000 characters or fewer',
      });
    }

    const contact = await Contact.create({ name, email, subject, message });

    try {
      await emailService.sendContactNotification({
        name,
        email,
        subject,
        message,
      });
    } catch (emailError) {
      // Keep the submission; email is best-effort so users aren't blocked
      console.error('Failed to send contact notification email:', emailError);
    }

    return res.status(201).json({
      message: 'Contact form submitted successfully',
      id: contact._id,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
