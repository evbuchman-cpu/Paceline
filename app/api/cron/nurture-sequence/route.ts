import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { lead } from '@/db/schema';
import { and, eq, isNull, lt } from 'drizzle-orm';
import {
  sendNurtureEmail2,
  sendNurtureEmail3,
  sendNurtureEmail4,
  sendNurtureEmail5,
} from '@/lib/email-sender';
import { logger } from '@/lib/logger';

const DAY_MS = 24 * 60 * 60 * 1000;

// Maps sequenceStep (current value) to the email to send and how many days after signup
const SEQUENCE = [
  { step: 0, daysAfter: 2,  send: sendNurtureEmail2, label: 'Nurture 2 (Belief Breaker)' },
  { step: 1, daysAfter: 4,  send: sendNurtureEmail3, label: 'Nurture 3 (Value Drop)' },
  { step: 2, daysAfter: 7,  send: sendNurtureEmail4, label: 'Nurture 4 (Story Bridge)' },
  { step: 3, daysAfter: 10, send: sendNurtureEmail5, label: 'Nurture 5 (Squeeze)' },
];

export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    logger.error('Nurture cron: unauthorized request', undefined);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = Date.now();
  let sent = 0;
  let errors = 0;
  let processed = 0;

  try {
    // Fetch leads who have not completed the sequence and have not converted
    const leads = await db
      .select()
      .from(lead)
      .where(
        and(
          lt(lead.sequenceStep, 4),
          isNull(lead.convertedAt)
        )
      )
      .limit(100);

    for (const l of leads) {
      processed++;
      const leadAgeMs = now - new Date(l.createdAt).getTime();

      for (const { step, daysAfter, send, label } of SEQUENCE) {
        if (l.sequenceStep !== step) continue;

        // Not yet time to send this email
        if (leadAgeMs < daysAfter * DAY_MS) break;

        try {
          const result = await send({ email: l.email, firstName: l.firstName });

          if (result.success) {
            // Increment step so this lead moves to the next position
            await db
              .update(lead)
              .set({ sequenceStep: step + 1 })
              .where(eq(lead.id, l.id));

            logger.info(`Nurture cron: sent ${label}`, { email: l.email });
            sent++;
          } else {
            logger.error(`Nurture cron: failed to send ${label}`, undefined, {
              email: l.email,
              error: result.error,
            });
            errors++;
          }
        } catch (err) {
          logger.error(`Nurture cron: exception sending ${label}`, err, { email: l.email });
          errors++;
        }

        break; // Only send one email per lead per run
      }
    }

    logger.info('Nurture cron: complete', { processed, sent, errors });
    return NextResponse.json({ processed, sent, errors });
  } catch (err) {
    logger.error('Nurture cron: fatal error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
