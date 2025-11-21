import { brandColors, fonts } from '../styles';
import type { PacingStrategy } from '../../schemas/guide-sections';

export function generatePacingSection(data: PacingStrategy): string {
  const pacingRows = data.sections.map(section => `
    <tr>
      <td style="font-weight: 500;">${section.name}</td>
      <td>${section.startMile}-${section.endMile}</td>
      <td>${section.distance}</td>
      <td>+${section.elevationGain.toLocaleString()}' / -${section.elevationLoss.toLocaleString()}'</td>
      <td style="font-weight: 600; color: ${brandColors.trailCanopy};">${section.targetPace}</td>
      <td>${section.sectionTime}</td>
      <td style="font-weight: 500;">${section.cumulativeTime}</td>
    </tr>
  `).join('');

  const pacingNotes = data.keyPacingNotes.map(note => `
    <li>${note}</li>
  `).join('');

  return `
    <div class="page-break">
      <div class="section-header">
        <div class="section-number">2</div>
        <h2 style="margin: 0;">Pacing Strategy</h2>
      </div>

      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-value">${data.totalEstimatedTime}</div>
          <div class="stat-label">Total Time</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${data.averagePace}</div>
          <div class="stat-label">Avg Pace</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${data.cutoffBuffer}</div>
          <div class="stat-label">Cutoff Buffer</div>
        </div>
      </div>

      <div class="info-box" style="margin-top: 24px;">
        <strong>Overall Strategy</strong>
        <p style="margin-top: 8px; margin-bottom: 0;">${data.paceStrategy}</p>
      </div>

      <h3 style="margin-top: 24px;">Section-by-Section Pacing</h3>
      <table style="font-size: 12px;">
        <thead>
          <tr>
            <th>Section</th>
            <th>Miles</th>
            <th>Dist</th>
            <th>Elevation</th>
            <th>Target Pace</th>
            <th>Time</th>
            <th>Cumulative</th>
          </tr>
        </thead>
        <tbody>
          ${pacingRows}
        </tbody>
      </table>

      <h3 style="margin-top: 24px;">Key Pacing Notes</h3>
      <ul style="padding-left: 24px;">
        ${pacingNotes}
      </ul>
    </div>
  `;
}
