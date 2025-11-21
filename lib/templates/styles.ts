// Brand constants for Paceline PDF generation
// Based on /PacelineBusinessDocs/brandidentity.md

export const brandColors = {
  // Primary Colors
  trailCanopy: '#2C5F4D',     // Primary brand - headers, CTAs, logo
  stoneGray: '#4A5859',        // Body text, secondary UI

  // Accent Colors
  summitLight: '#C87350',      // CTAs, success states, highlights
  trailDust: '#D4B896',        // Backgrounds, subtle highlights

  // Backgrounds
  white: '#FFFFFF',
  sandstone: '#F5F1EA',        // Section backgrounds

  // Data Visualization
  dataSuccess: '#4A9B7F',      // Success/Target
  dataDanger: '#A85A3C',       // Danger/Warning
  steelBlue: '#5B7C8D',        // Tertiary metric

  // Status Colors (Cutoff Buffers)
  statusGreenBg: '#dcfce7',    // Light green background
  statusGreenText: '#166534',  // Dark green text
  statusYellowBg: '#fef9c3',   // Light yellow background
  statusYellowText: '#854d0e', // Dark yellow text
  statusRedBg: '#fee2e2',      // Light red background
  statusRedText: '#991b1b',    // Dark red text
};

export const fonts = {
  header: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Arial', sans-serif",
  body: "'Source Serif 4', 'Georgia', 'Times New Roman', serif",
};

export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:wght@400;600&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${fonts.body};
    font-size: 14px;
    line-height: 1.6;
    color: ${brandColors.stoneGray};
  }

  h1, h2, h3 {
    font-family: ${fonts.header};
    color: ${brandColors.trailCanopy};
  }

  h1 {
    font-size: 32px;
    font-weight: 600;
  }

  h2 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 12px;
  }

  p {
    margin-bottom: 12px;
  }

  ul, ol {
    margin-bottom: 12px;
    padding-left: 24px;
  }

  li {
    margin-bottom: 6px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
  }

  th {
    padding: 12px;
    text-align: left;
    border-bottom: 2px solid ${brandColors.trailCanopy};
    font-family: ${fonts.header};
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${brandColors.trailCanopy};
    background-color: ${brandColors.sandstone};
  }

  td {
    padding: 12px;
    font-family: ${fonts.body};
    border-bottom: 1px solid #e5e7eb;
  }

  .page-break {
    page-break-before: always;
  }

  .section {
    margin-bottom: 24px;
  }

  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
  }

  .section-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${brandColors.summitLight};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${fonts.header};
    font-weight: 600;
    margin-right: 16px;
  }

  .info-box {
    background-color: ${brandColors.sandstone};
    border-left: 4px solid ${brandColors.trailCanopy};
    padding: 16px;
    margin: 16px 0;
  }

  .info-box strong {
    font-family: ${fonts.header};
    color: ${brandColors.trailCanopy};
  }

  .warning-box {
    background-color: #fef3c7;
    border-left: 4px solid ${brandColors.summitLight};
    padding: 16px;
    margin: 16px 0;
  }

  .warning-box strong {
    font-family: ${fonts.header};
    color: ${brandColors.summitLight};
  }

  .stat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin: 16px 0;
  }

  .stat-card {
    background: ${brandColors.sandstone};
    padding: 16px;
    border-radius: 8px;
    text-align: center;
  }

  .stat-value {
    font-size: 28px;
    font-weight: 700;
    color: ${brandColors.trailCanopy};
    font-family: ${fonts.header};
  }

  .stat-label {
    font-size: 12px;
    color: ${brandColors.stoneGray};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .status-badge {
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-family: ${fonts.header};
    font-weight: 500;
    display: inline-block;
  }

  .status-green {
    background-color: ${brandColors.statusGreenBg};
    color: ${brandColors.statusGreenText};
  }

  .status-yellow {
    background-color: ${brandColors.statusYellowBg};
    color: ${brandColors.statusYellowText};
  }

  .status-red {
    background-color: ${brandColors.statusRedBg};
    color: ${brandColors.statusRedText};
  }

  .mantra-box {
    background-color: ${brandColors.sandstone};
    border-left: 4px solid ${brandColors.summitLight};
    padding: 16px;
    margin: 12px 0;
    font-style: italic;
    font-size: 16px;
  }

  .difficulty-moderate {
    background-color: ${brandColors.statusYellowBg};
    color: ${brandColors.statusYellowText};
  }

  .difficulty-hard {
    background-color: #fed7aa;
    color: #9a3412;
  }

  .difficulty-brutal {
    background-color: ${brandColors.statusRedBg};
    color: ${brandColors.statusRedText};
  }

  .severity-low {
    background-color: ${brandColors.statusGreenBg};
    color: ${brandColors.statusGreenText};
  }

  .severity-medium {
    background-color: ${brandColors.statusYellowBg};
    color: ${brandColors.statusYellowText};
  }

  .severity-high {
    background-color: #fed7aa;
    color: #9a3412;
  }

  .severity-critical {
    background-color: ${brandColors.statusRedBg};
    color: ${brandColors.statusRedText};
  }
`;

// Helper function to format dates
export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Helper function to get status class
export function getStatusClass(status: 'green' | 'yellow' | 'red'): string {
  return `status-${status}`;
}

// Helper function to get difficulty class
export function getDifficultyClass(difficulty: 'moderate' | 'hard' | 'brutal'): string {
  return `difficulty-${difficulty}`;
}

// Helper function to get severity class
export function getSeverityClass(severity: 'low' | 'medium' | 'high' | 'critical'): string {
  return `severity-${severity}`;
}
