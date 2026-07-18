import { promises as dnsPromises } from 'node:dns';
import nodemailer from 'nodemailer';

interface ContactEmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Nodemailer SMTP email service.
 */
export class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private initPromise: Promise<nodemailer.Transporter> | null = null;

  private async getTransporter(): Promise<nodemailer.Transporter> {
    if (this.transporter) {
      return this.transporter;
    }

    if (!this.initPromise) {
      this.initPromise = this.createTransporter();
    }

    this.transporter = await this.initPromise;
    return this.transporter;
  }

  private async createTransporter(): Promise<nodemailer.Transporter> {
    const smtpHost = process.env.SMTP_HOST || '';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER || '';
    const smtpPass = process.env.SMTP_PASS || '';

    if (!smtpHost) {
      throw new Error('SMTP_HOST is not configured');
    }

    // Prefer IPv4 when available (avoids broken IPv6 routes on some networks)
    const { address: ipv4 } = await dnsPromises.lookup(smtpHost, { family: 4 });

    const transporter = nodemailer.createTransport({
      host: ipv4,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth:
        smtpUser && smtpPass
          ? {
              user: smtpUser,
              pass: smtpPass,
            }
          : undefined,
      tls: {
        servername: smtpHost,
      },
    });

    console.log(
      `Email service initialized successfully (SMTP ${smtpHost} → ${ipv4}:${smtpPort})`
    );

    return transporter;
  }

  async sendContactNotification({
    name,
    email,
    subject,
    message,
  }: ContactEmailPayload): Promise<void> {
    const smtpFrom = process.env.SMTP_FROM || process.env.SMTP_USER || '';

    if (!smtpFrom) {
      throw new Error('SMTP_FROM or SMTP_USER must be set');
    }

    const transporter = await this.getTransporter();

    const mailOptions = {
      from: `"Portfolio Contact" <${smtpFrom}>`,
      to: smtpFrom,
      replyTo: email,
      subject: `New message: ${subject}`,
      text: [
        'New portfolio contact message',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        '',
        'Message:',
        message,
        '',
        '—',
        'Reply directly to this email to respond.',
      ].join('\n'),
      html: buildContactEmailHtml({ name, email, subject, message }),
    };

    try {
      const result = await transporter.sendMail(mailOptions);
      console.log('Contact notification email sent successfully:', result.messageId);
    } catch (error) {
      console.error('Failed to send contact notification email:', error);
      throw error;
    }
  }
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildContactEmailHtml = ({
  name,
  email,
  subject,
  message,
}: ContactEmailPayload): string => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New portfolio contact</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="background:linear-gradient(135deg,#2159E8,#1a47c4);padding:28px 32px;">
                <p style="margin:0 0 6px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.8);font-weight:600;">
                  Portfolio Contact
                </p>
                <h1 style="margin:0;font-size:24px;line-height:1.3;color:#ffffff;font-weight:700;">
                  You have a new message
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 32px 8px;">
                <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#4b5563;">
                  Someone reached out through your portfolio contact form.
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
                  <tr>
                    <td style="padding:14px 16px;background-color:#f9fafb;border-bottom:1px solid #e5e7eb;width:96px;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#6b7280;">
                      Name
                    </td>
                    <td style="padding:14px 16px;border-bottom:1px solid #e5e7eb;font-size:15px;color:#111827;font-weight:600;">
                      ${safeName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px;background-color:#f9fafb;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#6b7280;">
                      Email
                    </td>
                    <td style="padding:14px 16px;border-bottom:1px solid #e5e7eb;font-size:15px;">
                      <a href="mailto:${safeEmail}" style="color:#2159E8;text-decoration:none;font-weight:600;">${safeEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px;background-color:#f9fafb;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#6b7280;">
                      Subject
                    </td>
                    <td style="padding:14px 16px;font-size:15px;color:#111827;font-weight:600;">
                      ${safeSubject}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 32px 28px;">
                <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#6b7280;">
                  Message
                </p>
                <div style="padding:18px 20px;background-color:#f8fafc;border:1px solid #e5e7eb;border-left:4px solid #2159E8;border-radius:12px;font-size:15px;line-height:1.7;color:#1f2937;">
                  ${safeMessage}
                </div>

                <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                  <tr>
                    <td style="border-radius:10px;background-color:#2159E8;">
                      <a href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: ${subject}`)}" style="display:inline-block;padding:12px 20px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
                        Reply to ${safeName}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:16px 32px 24px;border-top:1px solid #e5e7eb;background-color:#fafafa;">
                <p style="margin:0;font-size:12px;line-height:1.5;color:#9ca3af;">
                  Sent from your portfolio website contact form. You can also reply directly to this email.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
};

export const emailService = new EmailService();
