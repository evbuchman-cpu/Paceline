import * as React from 'react';
import {
  Body, Button, Container, Head, Heading, Html, Hr, Link,
  Preview, Section, Text,
} from '@react-email/components';

interface LeadMagnetDeliveryEmailProps {
  email: string;
  firstName: string | null;
  pdfUrl: string;
  appUrl?: string;
}

export default function LeadMagnetDeliveryEmail({
  firstName,
  pdfUrl,
  appUrl = 'https://paceline.com',
}: LeadMagnetDeliveryEmailProps) {
  const greeting = firstName || 'there';

  return (
    <Html>
      <Head />
      <Preview>Your Race Day Readiness Checklist [Download Inside]</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            Hi {greeting}!
          </Heading>

          <Text style={text}>
            Your free checklist is attached — here's what's inside:
          </Text>

          <ul style={list}>
            <li>Pre-race logistics (8 weeks out)</li>
            <li>Pacing rules for ultramarathons</li>
            <li>Nutrition basics for long runs</li>
            <li>Crew coordination tips</li>
          </ul>

          <Section style={buttonContainer}>
            <table cellPadding="0" cellSpacing="0" style={{ margin: '0 auto' }}>
              <tr>
                <td style={button}>
                  <Link href={pdfUrl} style={buttonLink} target="_blank">
                    Download Your Checklist
                  </Link>
                </td>
              </tr>
            </table>
          </Section>

          <Hr style={hr} />

          <Text style={text}>
            Want a personalized plan built for YOUR race? Paceline turns 30 hours of planning into 10 minutes.
          </Text>

          <Section style={buttonContainer}>
            <table cellPadding="0" cellSpacing="0" style={{ margin: '0 auto' }}>
              <tr>
                <td style={buttonSecondary}>
                  <Link href={`${appUrl}/pricing`} style={buttonSecondaryLink} target="_blank">
                    See Paceline Plans
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

const buttonSecondary = {
  backgroundColor: '#C87350',
  borderRadius: '5px',
  padding: '0',
};

const buttonSecondaryLink = {
  backgroundColor: '#C87350',
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
