import * as React from 'react';
import {
  Body, Container, Head, Heading, Html, Hr, Link,
  Preview, Section, Text,
} from '@react-email/components';

interface NurtureEmail4Props {
  firstName: string | null;
  appUrl?: string;
}

export default function NurtureEmail4({
  firstName,
  appUrl = 'https://paceline.run',
}: NurtureEmail4Props) {
  const greeting = firstName || 'there';

  return (
    <Html>
      <Head />
      <Preview>He had trained 14 months. The cutoff almost took him anyway.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Hi {greeting},</Heading>

          <Text style={text}>
            Eight minutes.
          </Text>

          <Text style={text}>
            That was his buffer at mile 62 of a race he had spent 14 months training to
            finish. He made the cutoff. But barely.
          </Text>

          <Text style={text}>
            He had done everything right in training. His long runs were consistent. His
            nutrition was practiced. He had finished a 50-miler six months earlier without
            issue.
          </Text>

          <Text style={text}>
            What he had not done was model what his training pace actually translated to at
            race elevation and distance. He had assumed his flat-terrain pacing would hold.
            It did not.
          </Text>

          <Text style={text}>
            He also had not mapped the section between miles 50 and 65 where his crew
            could not reach him. He ran out of the specific electrolyte mix he needed at
            mile 55. By mile 62, he was behind pace and fading.
          </Text>

          <Text style={text}>
            He made it through. But he spent the next 20 miles in survival mode instead
            of execution mode.
          </Text>

          <Hr style={hr} />

          <Text style={text}>
            After the race, he sat down and looked at what a real execution plan would have
            required. The pacing math. The crew access map. The drop bag contents at each
            station. The contingency for when his stomach turned at mile 50.
          </Text>

          <Text style={text}>
            He estimated it at 25-30 hours of work he had never made time for.
          </Text>

          <Text style={text}>
            Not because he did not care. Because he was too busy actually training.
          </Text>

          <Hr style={hr} />

          <Text style={text}>
            That is the gap Paceline was built for. Not to replace your training. To take
            those 25-30 hours of execution planning and compress them to 10 minutes.
          </Text>

          <Text style={text}>
            Your Strava data handles the pacing. The race profile handles the cutoff
            math. The questionnaire captures your crew, your nutrition, your concerns.
            The guide handles the rest.
          </Text>

          <Text style={text}>
            During beta, the Custom plan is $25.
          </Text>

          <Section style={buttonContainer}>
            <table cellPadding="0" cellSpacing="0" style={{ margin: '0 auto' }}>
              <tr>
                <td style={buttonStyle}>
                  <Link href={`${appUrl}/pricing`} style={buttonLink} target="_blank">
                    Build My Custom Plan — $25
                  </Link>
                </td>
              </tr>
            </table>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            One more email coming your way. Beta pricing ends when we exit beta, and when
            it does, the Custom plan goes from $25 to $99. Worth knowing if you have a
            race coming up.
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
