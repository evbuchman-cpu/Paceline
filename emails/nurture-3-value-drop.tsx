import * as React from 'react';
import {
  Body, Container, Head, Heading, Html, Hr, Link,
  Preview, Section, Text,
} from '@react-email/components';

interface NurtureEmail3Props {
  firstName: string | null;
  appUrl?: string;
}

export default function NurtureEmail3({
  firstName,
  appUrl = 'https://paceline.run',
}: NurtureEmail3Props) {
  const greeting = firstName || 'there';

  return (
    <Html>
      <Head />
      <Preview>A simple formula for checking your cutoffs. Most runners skip this.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Hi {greeting},</Heading>

          <Text style={text}>
            Here is something worth doing before your next long run.
          </Text>

          <Text style={text}>
            Look up your race's aid station cutoff times. You can find them on the race
            website, usually in the athlete guide or course description.
          </Text>

          <Text style={text}>
            Then, using your goal finish time, estimate your arrival at each major
            checkpoint. The rough math: divide your total goal time proportionally across
            the race distance, then slow each high-elevation section by 10-15% to account
            for climbing.
          </Text>

          <Text style={text}>
            Compare your estimated arrival to the cutoff time at each station. That gap is
            your buffer.
          </Text>

          <Text style={textBold}>
            What the numbers mean:
          </Text>

          <ul style={list}>
            <li style={listItem}>
              60+ minutes of buffer at every station means you are in solid shape
            </li>
            <li style={listItem}>
              Under 60 minutes at any early station means one bad patch puts you in danger
            </li>
            <li style={listItem}>
              Under 30 minutes anywhere means your goal time needs to be reconsidered
            </li>
          </ul>

          <Text style={text}>
            Most runners have a goal finish time and trust it will work out. They have
            never checked whether that time actually clears the cutoffs with a real margin.
            Often it does not.
          </Text>

          <Hr style={hr} />

          <Text style={text}>
            The reason Paceline uses your Strava data is so this calculation is not a
            guess. Your actual fitness, your pace under fatigue, your climbing
            efficiency. All of it adjusts every section of the plan to reflect how you
            actually run.
          </Text>

          <Text style={text}>
            The result is a cutoff buffer at every aid station on your course.
            Green means you are safe. Yellow means pay attention. Red means you need
            to push now.
          </Text>

          <Section style={buttonContainer}>
            <table cellPadding="0" cellSpacing="0" style={{ margin: '0 auto' }}>
              <tr>
                <td style={buttonStyle}>
                  <Link href={`${appUrl}/pricing`} style={buttonLink} target="_blank">
                    See How Paceline Builds Your Plan
                  </Link>
                </td>
              </tr>
            </table>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Next up: a runner who trained 14 months for a 100-miler and nearly DNF'd at
            mile 62 with 8 minutes to spare. What went wrong and what a real execution
            plan would have changed.
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
  backgroundColor: '#2C5F4D',
  borderRadius: '6px',
  padding: '0',
};

const buttonLink = {
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
