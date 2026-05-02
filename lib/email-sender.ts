import { resend } from './resend-client';
import GuideDeliveryEmail from '@/emails/guide-delivery';
import GuideFailedEmail from '@/emails/guide-failed';
import PaymentConfirmationEmail from '@/emails/payment-confirmation';
import LeadMagnetDeliveryEmail from '@/emails/lead-magnet-delivery';
import NurtureEmail2 from '@/emails/nurture-2-belief-breaker';
import NurtureEmail3 from '@/emails/nurture-3-value-drop';
import NurtureEmail4 from '@/emails/nurture-4-story-bridge';
import NurtureEmail5 from '@/emails/nurture-5-squeeze';
import { logger } from '@/lib/logger';

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
  emailFn: () => Promise<{ data: { id: string } | null; error: Error | null }>,
  context: string,
  maxRetries = 3
): Promise<{ success: boolean; error?: string; emailId?: string }> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      logger.debug("Sending email", { context, attempt, maxRetries });

      const { data, error } = await emailFn();

      if (error) {
        logger.error("Email send failed", error, { context, attempt });

        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }

        return { success: false, error: error.message };
      }

      logger.info("Email sent successfully", { context, emailId: data?.id });
      return { success: true, emailId: data?.id };

    } catch (error) {
      logger.error("Email send exception", error, { context, attempt });

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
    logger.error("Cannot send guide delivery email: missing user email", undefined, {
      raceName: data.questionnaire.raceName,
    });
    return { success: false, error: 'Missing user email' };
  }

  if (!data.guide.pdfUrl) {
    logger.error("Cannot send guide delivery email: missing PDF URL", undefined, {
      userEmail: data.user.email,
      raceName: data.questionnaire.raceName,
    });
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
    logger.error("Cannot send guide failed email: missing user email", undefined, {
      raceName: data.questionnaire.raceName,
    });
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
    logger.error("Cannot send payment confirmation email: missing user email", undefined, {
      tier: data.purchase.tier,
    });
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

// 4. Lead Magnet Delivery Email
interface LeadMagnetData {
  email: string;
  firstName: string | null;
}

export async function sendLeadMagnetEmail(data: LeadMagnetData) {
  if (!data.email) {
    logger.error("Cannot send lead magnet email: missing email", undefined);
    return { success: false, error: 'Missing email' };
  }

  const pdfUrl = process.env.LEAD_MAGNET_PDF_URL;
  if (!pdfUrl) {
    logger.error("Cannot send lead magnet email: LEAD_MAGNET_PDF_URL not configured", undefined);
    return { success: false, error: 'PDF URL not configured' };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return sendWithRetry(
    () => resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: data.email,
      subject: 'Your DNF Prevention Checklist [Download Inside]',
      react: LeadMagnetDeliveryEmail({
        email: data.email,
        firstName: data.firstName,
        pdfUrl: pdfUrl,
        appUrl: appUrl,
      }),
    }),
    'Lead Magnet Delivery Email'
  );
}

// Nurture sequence data type
interface NurtureData {
  email: string;
  firstName: string | null;
}

// 5. Nurture Email 2 — Belief Breaker (Day 2)
export async function sendNurtureEmail2(data: NurtureData) {
  if (!data.email) {
    logger.error("Cannot send nurture email 2: missing email", undefined);
    return { success: false, error: 'Missing email' };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://paceline.run';

  return sendWithRetry(
    () => resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: data.email,
      subject: 'the most expensive planning mistake',
      react: NurtureEmail2({ firstName: data.firstName, appUrl }),
    }),
    'Nurture Email 2 (Belief Breaker)'
  );
}

// 6. Nurture Email 3 — Value Drop (Day 4)
export async function sendNurtureEmail3(data: NurtureData) {
  if (!data.email) {
    logger.error("Cannot send nurture email 3: missing email", undefined);
    return { success: false, error: 'Missing email' };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://paceline.run';

  return sendWithRetry(
    () => resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: data.email,
      subject: 'how to know if you will make your cutoffs',
      react: NurtureEmail3({ firstName: data.firstName, appUrl }),
    }),
    'Nurture Email 3 (Value Drop)'
  );
}

// 7. Nurture Email 4 — Story Bridge (Day 7)
export async function sendNurtureEmail4(data: NurtureData) {
  if (!data.email) {
    logger.error("Cannot send nurture email 4: missing email", undefined);
    return { success: false, error: 'Missing email' };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://paceline.run';

  return sendWithRetry(
    () => resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: data.email,
      subject: '8 minutes from a DNF at mile 62',
      react: NurtureEmail4({ firstName: data.firstName, appUrl }),
    }),
    'Nurture Email 4 (Story Bridge)'
  );
}

// 8. Nurture Email 5 — Squeeze (Day 10)
export async function sendNurtureEmail5(data: NurtureData) {
  if (!data.email) {
    logger.error("Cannot send nurture email 5: missing email", undefined);
    return { success: false, error: 'Missing email' };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://paceline.run';

  return sendWithRetry(
    () => resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: data.email,
      subject: 'beta pricing closes soon',
      react: NurtureEmail5({ firstName: data.firstName, appUrl }),
    }),
    'Nurture Email 5 (Squeeze)'
  );
}
