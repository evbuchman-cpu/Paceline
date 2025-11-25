// Load environment variables FIRST before any imports
import { config } from 'dotenv';
config({ path: '.env.local' });

// Now import after env is loaded
import { sendGuideDeliveryEmail, sendGuideFailedEmail, sendPaymentConfirmationEmail } from './lib/email-sender';

async function testEmails() {
  console.log('🧪 Testing Paceline Email System...\n');

  // Test 1: Guide Delivery Email
  console.log('📧 Test 1: Sending Guide Delivery Email...');
  const deliveryResult = await sendGuideDeliveryEmail({
    user: {
      name: 'Elise Buchman',
      email: 'evbuchman@gmail.com'
    },
    questionnaire: {
      raceName: 'Wasatch Front 100',
      raceDate: new Date('2025-09-05'),
      firstName: 'Elise'
    },
    guide: {
      pdfUrl: 'https://pub-d8bbf4ec893d4f4d9fb54ab44cb8fde4.r2.dev/guides/test-guide.pdf',
      generationTime: 180000 // 3 minutes
    },
    purchase: { tier: 'custom' }
  });
  console.log('Result:', deliveryResult);
  console.log('');

  // Test 2: Guide Failed Email
  console.log('📧 Test 2: Sending Guide Failed Email...');
  const failedResult = await sendGuideFailedEmail({
    user: {
      name: 'Elise Buchman',
      email: 'evbuchman@gmail.com'
    },
    questionnaire: {
      raceName: 'Western States 100',
      raceDate: new Date('2025-06-28'),
      firstName: 'Elise'
    },
    guide: {
      error: 'AI cascade timeout on step 3 (Cutoff Management)'
    },
    purchase: { tier: 'custom' }
  });
  console.log('Result:', failedResult);
  console.log('');

  // Test 3: Payment Confirmation Email
  console.log('📧 Test 3: Sending Payment Confirmation Email...');
  const paymentResult = await sendPaymentConfirmationEmail({
    user: {
      name: 'Elise Buchman',
      email: 'evbuchman@gmail.com'
    },
    purchase: {
      tier: 'custom',
      amount: 9900, // $99.00
      createdAt: new Date()
    },
    questionnaireUrl: 'http://localhost:3001/dashboard/questionnaire?purchaseId=test-123'
  });
  console.log('Result:', paymentResult);
  console.log('');

  console.log('✅ Email test complete! Check evbuchman@gmail.com inbox.');
}

testEmails().catch(console.error);
