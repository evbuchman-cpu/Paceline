import * as React from 'react';
import {
  Body, Container, Head, Heading, Html, Hr, Link,
  Preview, Section, Text,
} from '@react-email/components';

interface NurtureEmail5Props {
  firstName: string | null;
  appUrl?: string;
}

export default function NurtureEmail5({
  firstName,
  appUrl = 'https://paceline.run',
}: NurtureEmail5Props) {
  const greeting = firstName || 'there';

  return (
    <Html>
      <Head />
      <Preview>Custom plan goes from $25 to $99 when beta ends. Worth knowing.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Hi {greeting},</Heading>

          <Text style={text}>
            A quick note on timing.
          </Text>

          <Text style={text}>
            Paceline is in beta. We are testing the product with real runners on real races
            before the full launch. During beta, guides are priced well below what they
            will be.
          </Text>

          <Text style={textHighlight}>
            Custom plan: $25 now. $99 at launch.
          </Text>

          <Text style={textHighlight}>
            Essential plan: $7 now. $29 at launch.
          </Text>

          <Text style={text}>
            Same guide quality. Same 30-day money-back guarantee. When beta ends,
            those prices go up. There is no special offer or grandfathered rate.
          </Text>

          <Hr style={hr} />

          <Text style={textBold}>
            What the Custom plan includes:
          </Text>

          <ul style={list}>
            <li style={listItem}>
              Section-by-section pacing built from your Strava fitness data
            </li>
            <li style={listItem}>
              Cutoff buffer calculator with green/yellow/red status at every aid station
            </li>
            <li style={listItem}>
              Crew logistics with predicted arrival times at each access point
            </li>
            <li style={listItem}>
              Personalized nutrition timeline with dietary preference support
            </li>
            <li style={listItem}>
              Weather-adjusted drop bag strategy
            </li>
            <li style={listItem}>
              Contingency protocols for GI issues, blisters, falling behind
            </li>
            <li style={listItem}>
              Mental strategy tailored to your specific race fears
            </li>
          </ul>

          <Text style={text}>
            Ten minutes to fill out the questionnaire. Connect Strava in one click.
            Guide delivered in under five minutes.
          </Text>

          <Text style={text}>
            You have already invested in your race. The entry fee, the gear, the training
            hours. A plan that protects that investment is $25.
          </Text>

          <Section style={buttonContainer}>
            <table cellPadding="0" cellSpacing="0" style={{ margin: '0 auto' }}>
              <tr>
                <td style={buttonStyle}>
                  <Link href={`${appUrl}/pricing`} style={buttonLink} target="_blank">
                    Get the Custom Plan — $25 During Beta
                  </Link>
                </td>
              </tr>
            </table>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            If the Essential plan fits better ($7, no Strava required), that is available
            too at the link above.
          </Text>

          <Text style={footer}>
            30-day money-back guarantee. If the guide does not meet your expectations,
            reply to this email and we will refund you in full. No questions asked.
          </Text>

          <Text style={footer}>
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

const textHighlight = {
  color: '#2C5F4D',
  fontSize: '17px',
  fontWeight: '700',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Arial', sans-serif",
  margin: '8px 0',
  lineHeight: '1.5',
};

const textBold = {
  color: '#2C5F4D',
  fontSize: '15px',
  fontWeight: '600',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Arial', sans-serif",
  margin: '20px 0 8px',
};

const list = {
  paddingLeft: '20px',
  margin: '4px 0 16px',
  fontFamily: "'Source Serif 4', 'Georgia', 'Times New Roman', serif",
  color: '#4A5859',
  fontSize: '15px',
  lineHeight: '1.8',
};

const listItem = {
  marginBottom: '6px',
};

const buttonContainer = {
  padding: '20px 0',
  textAlign: 'center' as const,
};

const buttonStyle = {
  backgroundColor: '#C87350',
  borderRadius: '6px',
  padding: '0',
};

const buttonLink = {
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
