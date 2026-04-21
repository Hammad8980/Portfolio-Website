import { Request, Response } from 'express';

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // TODO: Save to database and/or send email
    console.log('Contact form submission:', { name, email, message });

    res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
