/**
 * Quick email smoke test:
 *   npx ts-node-dev --transpile-only scripts/test-email.ts
 */
import '../src/config/env';
import { emailService } from '../src/services/email.service';

async function main() {
  console.log('Provider: Nodemailer SMTP');

  await emailService.sendContactNotification({
    name: 'Local Test',
    email: 'test@example.com',
    subject: 'Portfolio contact form test',
    message: 'This is an automated test from scripts/test-email.ts',
  });

  console.log('SUCCESS: email sent');
}

main().catch((error) => {
  console.error('FAILED:', error);
  process.exit(1);
});
