import * as React from 'react';
import {
  Body, Container, Head, Heading, Html, Hr, Link,
  Preview, Section, Text,
} from '@react-email/components';

interface NurtureEmail2Props {
  firstName: string | null;
  appUrl?: string;
}

export default function NurtureEmail2({
  firstName,
  appUrl = 'https://paceline.run',
}: NurtureEmail2Props) {
  const greeting = firstName || 'there';

  return (
    <Html>
      <Head />
      <Preview>Most runners confuse training with execution. They are two different problems.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Hi {greeting},</Heading>

          <Text style={text}>
            Most ultramarathon runners make the same planning mistake.
          </Text>

          <Text style={text}>
            They spend 14 months perfecting their training and about four hours on their
            race-day execution plan. Sometimes less.
          </Text>

          <Text style={text}>
            The fitness gets them to mile 62.
          </Text>

          <Text style={text}>
            What happens after mile 62 depends almost entirely on how well they planned.
            Their cutoff buffers. Their drop bags. Their crew timing. Their contingency
            protocols when things go sideways.
          </Text>

          <Text style={text}>
            Training and execution are two different problems. Most resources are built to
            solve the training problem. TrainingPeaks, Strava, your coach. Almost nothing
            is built to solve the execution problem.
          </Text>

          <Text style={text}>
            That gap is a big reason why DNF rates at most 100-mile races sit between 30%
            and 50%. Not because runners are not fit enough. Because they did not have a
            real execution plan for the back half.
          </Text>

          <Hr style={hr} />

          <Text style={text}>
            The checklist I sent you is a start. It gives you the framework for what to
            think about. The next level is building the actual plan. One that accounts for
            your specific race profile, your Strava fitness data, your crew access points,
            and your real cutoff margins at every aid station.
          </Text>

          <Text style={text}>
            That is what Paceline builds. During beta, it starts at $25.
          </Text>

          <Section style={buttonContainer}>
            <table cellPadding="0" cellSpacing="0" style={{ margin: '0 auto' }}>
              <tr>
                <td style={buttonStyle}>
                  <Link href={`${appUrl}/pricing`} style={buttonLink} target="_blank">
                    Build My Race Plan
                  </Link>
                </td>
              </tr>
            </table>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Tomorrow I will show you how to calculate your cutoff buffer at any aid station.
            It is simpler than it sounds. Most runners never do this math.
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
