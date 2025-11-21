import { brandColors, fonts, getStatusClass } from '../styles';
import type { CutoffManagement } from '../../schemas/guide-sections';

export function generateCutoffsSection(data: CutoffManagement): string {
  const riskBadgeClass = data.overallRisk === 'Low' ? 'status-green' :
                          data.overallRisk === 'Medium' ? 'status-yellow' : 'status-red';

  const cutoffRows = data.stations.map(station => `
    <tr>
      <td style="font-weight: 500;">${station.name}</td>
      <td>${station.mile}</td>
      <td>${station.cutoffTime}</td>
      <td>${station.predictedArrival}</td>
      <td>
        <span class="status-badge ${getStatusClass(station.status)}">
          ${station.statusEmoji} ${station.bufferFormatted}
        </span>
      </td>
      <td style="font-size: 12px;">${station.notes || '–'}</td>
    </tr>
  `).join('');

  const criticalCheckpoints = data.criticalCheckpoints.map(checkpoint => `
    <li style="color: ${brandColors.statusRedText}; font-weight: 500;">${checkpoint}</li>
  `).join('');

  return `
    <div class="page-break">
      <div class="section-header">
        <div class="section-number">3</div>
        <h2 style="margin: 0;">Cutoff Management</h2>
      </div>

      <div style="display: flex; align-items: center; margin-bottom: 24px;">
        <span style="font-family: ${fonts.header}; font-weight: 500; margin-right: 12px;">Overall Risk Level:</span>
        <span class="status-badge ${riskBadgeClass}" style="font-size: 14px; padding: 6px 16px;">
          ${data.overallRisk}
        </span>
      </div>

      <h3>Cutoff Analysis by Station</h3>
      <table style="font-size: 12px;">
        <thead>
          <tr>
            <th>Station</th>
            <th>Mile</th>
            <th>Cutoff</th>
            <th>ETA</th>
            <th>Buffer</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          ${cutoffRows}
        </tbody>
      </table>

      ${data.criticalCheckpoints.length > 0 ? `
        <div class="warning-box" style="margin-top: 24px;">
          <strong>Critical Checkpoints</strong>
          <p style="margin-top: 8px; margin-bottom: 8px;">These stations require extra attention due to tight buffers:</p>
          <ul style="margin: 0; padding-left: 24px;">
            ${criticalCheckpoints}
          </ul>
        </div>
      ` : ''}

      <div class="info-box" style="margin-top: 24px;">
        <strong>Buffer Strategy</strong>
        <p style="margin-top: 8px; margin-bottom: 0;">${data.bufferStrategy}</p>
      </div>

      <div style="margin-top: 24px;">
        <h3>Contingency Notes</h3>
        <p>${data.contingencyNotes}</p>
      </div>
    </div>
  `;
}
