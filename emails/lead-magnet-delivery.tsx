import * as React from 'react';
import {
  Body, Container, Head, Heading, Html, Hr, Link,
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
  appUrl = 'https://paceline.run',
}: LeadMagnetDeliveryEmailProps) {
  const greeting = firstName || 'there';

  return (
    <Html>
      <Head />
      <Preview>Your DNF Prevention Checklist is ready. Four areas. Check them before race day.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Hi {greeting},</Heading>

          <Text style={text}>
            Your DNF Prevention Checklist is ready to download.
          </Text>

          <Section style={buttonContainer}>
            <table cellPadding="0" cellSpacing="0" style={{ margin: '0 auto' }}>
              <tr>
                <td style={buttonPrimary}>
                  <Link href={pdfUrl} style={buttonPrimaryLink} target="_blank">
                    Download Your Checklist
                  </Link>
                </td>
              </tr>
            </table>
          </Section>

          <Text style={text}>
            It covers four areas where most runners are underprepared before race day.
          </Text>

          <ul style={list}>
            <li style={listItem}>Pre-race logistics (starting 8 weeks out)</li>
            <li style={listItem}>Pacing fundamentals for ultras</li>
            <li style={listItem}>Nutrition timing basics</li>
            <li style={listItem}>Crew coordination essentials</li>
          </ul>

          <Text style={text}>
            Run through it this week. Note what you have handled and what you have not.
            The gaps are worth paying attention to.
          </Text>

          <Hr style={hr} />

          <Text style={textSmall}>
            One thing the checklist cannot do is personalize those four areas to your
            specific race, your fitness, or your crew. It tells you what to think about.
            Paceline builds the actual plan around your data.
          </Text>

          <Text style={textSmall}>
            If you have a race coming up and want a section-by-section pacing strategy
            built from your Strava data, cutoff buffers at every aid station, and crew
            logistics your team can actually follow, that is what Paceline delivers. Beta
            pricing starts at $25.
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
            Over the next few days I will share a few things worth knowing about race
            planning. Starting with how to calculate whether you are actually on pace for
            your cutoffs. Most runners guess at this. The guess is usually wrong.
          </Text>

          <Text style={footer}>
            Questions? Reply to this email anytime.
            <br />
            <br />
            The Paceline Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#F5F1EA',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Arial', sans-serif",
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '32px 40px 48px',
  maxWidth: '600px',
};

const h1 = {
  color: '#2C5F4D',
  fontSize: '22px',
  fontWeight: '600',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Arial', sans-serif",
  margin: '32px 0 16px',
  lineHeight: '1.4',
};

const text = {
  color: '#4A5859',
  fontSize: '16px',
  fontFamily: "'Source Serif 4', 'Georgia', 'Times New Roman', serif",
  lineHeight: '1.7',
  margin: '12px 0',
};

const textSmall = {
  color: '#4A5859',
  fontSize: '15px',
  fontFamily: "'Source Serif 4', 'Georgia', 'Times New Roman', serif",
  lineHeight: '1.7',
  margin: '12px 0',
};

const list = {
  paddingLeft: '20px',
  margin: '8px 0 16px',
  fontFamily: "'Source Serif 4', 'Georgia', 'Times New Roman', serif",
  color: '#4A5859',
  fontSize: '15px',
  lineHeight: '1.8',
};

const listItem = {
  marginBottom: '4px',
};

const buttonContainer = {
  padding: '20px 0',
  textAlign: 'center' as const,
};

const buttonPrimary = {
  backgroundColor: '#2C5F4D',
  borderRadius: '6px',
  padding: '0',
};

const buttonPrimaryLink = {
  backgroundColor: '#2C5F4D',
  border: 'none',
  color: '#fff',
  fontSize: '15px',
  fontWeight: '600',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Arial', sans-serif",
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 28px',
  borderRadius: '6px',
};

const buttonSecondary = {
  backgroundColor: '#C87350',
  borderRadius: '6px',
  padding: '0',
};

const buttonSecondaryLink = {
  backgroundColor: '#C87350',
  border: 'none',
  color: '#fff',
  fontSize: '15px',
  fontWeight: '600',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Arial', sans-serif",
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 28px',
  borderRadius: '6px',
};

const hr = {
  borderColor: '#E8E3DB',
  margin: '24px 0',
};

const footer = {
  color: '#7A8A8B',
  fontSize: '14px',
  fontFamily: "'Source Serif 4', 'Georgia', 'Times New Roman', serif",
  lineHeight: '1.6',
  marginTop: '12px',
};
