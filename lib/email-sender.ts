import { resend } from './resend-client';
import GuideDeliveryEmail from '@/emails/guide-delivery';
import GuideFailedEmail from '@/emails/guide-failed';
import PaymentConfirmationEmail from '@/emails/payment-confirmation';

// Type definitions
interface GuideDeliveryData {
  user: { name: string; email: string };
  questionnaire: { raceName: string; raceDate: Date; firstName: string };
  guide: { pdfUrl: string; generationTime: number };
  purchase: { tier: string };
}

interface GuideFailedData {
  user: { name: string; email: string };
  questionnaire: { raceName: string; raceDate: Date; firstName?: string };
  guide: { error?: string };
  purchase: { tier: string };
}

interface PaymentConfirmationData {
  user: { name: string; email: string };
  purchase: { tier: string; amount: number; createdAt?: Date };
  questionnaireUrl: string;
}

// Helper: Retry with exponential backoff
async function sendWithRetry(
  emailFn: () => Promise<any>,
  context: string,
  maxRetries = 3
): Promise<{ success: boolean; error?: string; emailId?: string }> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`📧 Sending ${context} (attempt ${attempt}/${maxRetries})`);

      const { data, error } = await emailFn();

      if (error) {
        console.error(`❌ Email send failed (attempt ${attempt}):`, error);

        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }

        return { success: false, error: error.message };
      }

      console.log(`✅ ${context} sent successfully:`, data?.id);
      return { success: true, emailId: data?.id };

    } catch (error: any) {
      console.error(`❌ Email send exception (attempt ${attempt}):`, error);

      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt - 1) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      return { success: false, error: error.message };
    }
  }

  return { success: false, error: 'Max retries exceeded' };
}

// 1. Guide Delivery Email
export async function sendGuideDeliveryEmail(data: GuideDeliveryData) {
  // Validate required fields
  if (!data.user.email) {
    console.error('❌ Cannot send guide delivery email: missing user email');
    return { success: false, error: 'Missing user email' };
  }

  if (!data.guide.pdfUrl) {
    console.error('❌ Cannot send guide delivery email: missing PDF URL');
    return { success: false, error: 'Missing PDF URL' };
  }

  return sendWithRetry(
    () => resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: data.user.email,
      subject: `Your ${data.questionnaire.raceName} Guide is Ready!`,
      react: GuideDeliveryEmail(data),
    }),
    'Guide Delivery Email'
  );
}

// 2. Guide Failed Email
export async function sendGuideFailedEmail(data: GuideFailedData) {
  if (!data.user.email) {
    console.error('❌ Cannot send guide failed email: missing user email');
    return { success: false, error: 'Missing user email' };
  }

  return sendWithRetry(
    () => resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: data.user.email,
      subject: `Issue with Your ${data.questionnaire.raceName} Guide`,
      react: GuideFailedEmail(data),
    }),
    'Guide Failed Email'
  );
}

// 3. Payment Confirmation Email
export async function sendPaymentConfirmationEmail(data: PaymentConfirmationData) {
  if (!data.user.email) {
    console.error('❌ Cannot send payment confirmation email: missing user email');
    return { success: false, error: 'Missing user email' };
  }

  const tierName = data.purchase.tier === 'custom' ? 'Custom' :
                   data.purchase.tier === 'essential' ? 'Essential' : 'Ultra Bundle';

  return sendWithRetry(
    () => resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: data.user.email,
      subject: `Payment Confirmed - Your ${tierName} Guide`,
      react: PaymentConfirmationEmail(data),
    }),
    'Payment Confirmation Email'
  );
}
