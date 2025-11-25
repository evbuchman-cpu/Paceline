import * as React from 'react';
import {
  Body, Button, Container, Head, Heading, Html, Hr, Link,
  Preview, Section, Text,
} from '@react-email/components';

interface GuideDeliveryEmailProps {
  user: { name: string; email: string };
  questionnaire: { raceName: string; raceDate: Date; firstName: string };
  guide: { pdfUrl: string; generationTime: number };
  purchase: { tier: string };
}

export default function GuideDeliveryEmail({
  user,
  questionnaire,
  guide,
  purchase,
}: GuideDeliveryEmailProps) {
  const firstName = questionnaire.firstName || user.name || 'there';
  const raceName = questionnaire.raceName;
  const raceDate = new Date(questionnaire.raceDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Html>
      <Head />
      <Preview>Your {raceName} guide is ready to download!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            Your {raceName} Guide is Ready, {firstName}! 🏔️
          </Heading>

          <Text style={text}>
            Great news! Your personalized race guide is ready. We've analyzed your fitness data,
            calculated elevation-adjusted pacing, and built a comprehensive race-day execution plan.
          </Text>

          <Text style={text}>
            <strong>Race Details:</strong>
            <br />
            {raceName} • {raceDate}
            <br />
            Tier: {purchase.tier === 'custom' ? 'Custom' : 'Essential'}
          </Text>

          <Section style={buttonContainer}>
            <table cellPadding="0" cellSpacing="0" style={{ margin: '0 auto' }}>
              <tr>
                <td style={button}>
                  <Link href={guide.pdfUrl} style={buttonLink} target="_blank">
                    Download Your Guide (PDF)
                  </Link>
                </td>
              </tr>
            </table>
          </Section>

          <Hr style={hr} />

          <Text style={text}>
            <strong>Quick tips for using your guide:</strong>
          </Text>
          <ul style={list}>
            <li>Print the pacing chart for easy reference on race day</li>
            <li>Share the crew logistics section with your support team</li>
            <li>Review cutoff buffers 2 weeks before {raceName}</li>
          </ul>

          <Text style={encouragement}>
            Your plan is ready. Execute with confidence on race day.
          </Text>

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

const list = {
  paddingLeft: '20px',
  margin: '8px 0',
  fontFamily: "'Source Serif 4', 'Georgia', 'Times New Roman', serif",
  color: '#4A5859',
};

const encouragement = {
  color: '#C87350',
  fontSize: '18px',
  fontWeight: '600',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Arial', sans-serif",
  marginTop: '24px',
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
