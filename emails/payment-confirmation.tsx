import * as React from 'react';
import {
  Body, Button, Container, Head, Heading, Html, Hr, Link,
  Preview, Section, Text,
} from '@react-email/components';

interface PaymentConfirmationEmailProps {
  user: { name: string; email: string };
  purchase: { tier: string; amount: number; createdAt?: Date };
  questionnaireUrl: string;
}

export default function PaymentConfirmationEmail({
  user,
  purchase,
  questionnaireUrl,
}: PaymentConfirmationEmailProps) {
  const tierName = purchase.tier === 'custom' ? 'Custom' :
                   purchase.tier === 'essential' ? 'Essential' : 'Ultra Bundle';
  const amountFormatted = `$${(purchase.amount / 100).toFixed(2)}`;
  const purchaseDate = purchase.createdAt
    ? new Date(purchase.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

  return (
    <Html>
      <Head />
      <Preview>Payment confirmed - Your {tierName} guide is ready to create</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Payment Confirmed! ✅</Heading>

          <Text style={text}>Hi {user.name || 'there'},</Text>

          <Text style={text}>
            Thank you for purchasing a Paceline {tierName} race guide. Your payment has been
            processed successfully.
          </Text>

          <Section style={receiptBox}>
            <Text style={receiptTitle}>Order Summary</Text>
            <Text style={receiptLine}>
              <strong>Tier:</strong> {tierName}
            </Text>
            <Text style={receiptLine}>
              <strong>Amount:</strong> {amountFormatted}
            </Text>
            <Text style={receiptLine}>
              <strong>Date:</strong> {purchaseDate}
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={text}>
            <strong>Next Step: Complete Your Questionnaire</strong>
          </Text>

          <Text style={text}>
            To generate your personalized race guide, complete the questionnaire (5-10 minutes).
            Your guide will be ready 3-5 minutes after submission.
          </Text>

          <Section style={buttonContainer}>
            <table cellPadding="0" cellSpacing="0" style={{ margin: '0 auto' }}>
              <tr>
                <td style={button}>
                  <Link href={questionnaireUrl} style={buttonLink} target="_blank">
                    Complete Questionnaire
                  </Link>
                </td>
              </tr>
            </table>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Questions? Reply to this email or reach us at support@paceline.com
            <br />
            <br />
            – The Paceline Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Arial', sans-serif",
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
};

const h1 = {
  color: '#2C5F4D',
  fontSize: '24px',
  fontWeight: '600',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Arial', sans-serif",
  margin: '40px 0 20px',
  lineHeight: '1.4',
};

const text = {
  color: '#4A5859',
  fontSize: '16px',
  fontFamily: "'Source Serif 4', 'Georgia', 'Times New Roman', serif",
  lineHeight: '1.6',
  margin: '16px 0',
};

const receiptBox = {
  backgroundColor: '#f6f9fc',
  border: '1px solid #e6ebf1',
  borderRadius: '5px',
  padding: '20px',
  margin: '20px 0',
};

const receiptTitle = {
  color: '#2C5F4D',
  fontSize: '18px',
  fontWeight: '600',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Arial', sans-serif",
  margin: '0 0 12px 0',
};

const receiptLine = {
  margin: '4px 0',
  fontFamily: "'Source Serif 4', 'Georgia', 'Times New Roman', serif",
  color: '#4A5859',
};

const button = {
  backgroundColor: '#2C5F4D',
  borderRadius: '5px',
  padding: '0',
};

const buttonLink = {
  backgroundColor: '#2C5F4D',
  border: 'none',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Arial', sans-serif",
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  borderRadius: '5px',
};

const buttonContainer = {
  padding: '27px 0',
  textAlign: 'center' as const,
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#4A5859',
  fontSize: '14px',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Arial', sans-serif",
  lineHeight: '1.6',
  marginTop: '32px',
};
