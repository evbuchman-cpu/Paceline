import * as React from 'react';
import {
  Body, Container, Head, Heading, Html, Hr, Preview, Text,
} from '@react-email/components';

interface GuideFailedEmailProps {
  user: { name: string; email: string };
  questionnaire: { raceName: string; raceDate: Date; firstName?: string };
  guide: { error?: string };
  purchase: { tier: string };
}

export default function GuideFailedEmail({
  user,
  questionnaire,
  guide,
  purchase,
}: GuideFailedEmailProps) {
  const firstName = questionnaire.firstName || user.name || 'there';
  const raceName = questionnaire.raceName;
  const raceDate = new Date(questionnaire.raceDate);
  const daysUntilRace = Math.floor((raceDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const isUrgent = daysUntilRace < 30 && daysUntilRace > 0;

  return (
    <Html>
      <Head />
      <Preview>We hit a snag with your {raceName} guide</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            We Hit a Snag with Your {raceName} Guide
          </Heading>

          <Text style={text}>Hi {firstName},</Text>

          <Text style={text}>
            We sincerely apologize. Our AI generation system encountered an issue while building
            your personalized race guide. This is rare, but it happens.
          </Text>

          {isUrgent && (
            <Text style={urgentText}>
              ⚠️ We see {raceName} is coming up in {daysUntilRace} days. This is our top priority,
              and we're investigating immediately.
            </Text>
          )}

          <Text style={text}>
            <strong>What we're doing:</strong>
            <br />
            Our team has been automatically notified and is investigating right now. We'll regenerate
            your guide within 24 hours and send it to you immediately.
          </Text>

          <Text style={text}>
            <strong>Your options:</strong>
            <br />
            1. <strong>Wait for retry:</strong> We'll fix the issue and deliver your guide within
            24 hours (no action needed)
            <br />
            2. <strong>Request immediate refund:</strong> Reply to this email and we'll process a
            full refund within 24 hours
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Again, we sincerely apologize for this inconvenience. If you have any questions or
            concerns, reply to this email or reach us at support@paceline.com.
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
  color: '#C87350',
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

const urgentText = {
  backgroundColor: '#fff3cd',
  border: '1px solid #ffc107',
  borderRadius: '5px',
  color: '#856404',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Arial', sans-serif",
  padding: '12px',
  margin: '16px 0',
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
