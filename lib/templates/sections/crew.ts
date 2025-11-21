import { brandColors, fonts } from '../styles';
import type { CrewLogistics } from '../../schemas/guide-sections';

// Convert markdown table to HTML table
function markdownTableToHtml(markdown: string): string {
  const lines = markdown.trim().split('\n');
  if (lines.length < 2) return markdown;

  let html = '<table style="width: 100%; border-collapse: collapse; font-size: 12px;">';

  lines.forEach((line, index) => {
    // Skip separator line (contains only |, -, and spaces)
    if (line.match(/^\|[\s\-:|]+\|$/)) return;

    const cells = line.split('|').filter(cell => cell.trim() !== '');
    const isHeader = index === 0;
    const tag = isHeader ? 'th' : 'td';
    const style = isHeader
      ? `style="padding: 8px; text-align: left; border-bottom: 2px solid ${brandColors.trailCanopy}; font-weight: 600; background: ${brandColors.sandstone};"`
      : 'style="padding: 8px; border-bottom: 1px solid #e5e7eb;"';

    html += '<tr>';
    cells.forEach(cell => {
      html += `<${tag} ${style}>${cell.trim()}</${tag}>`;
    });
    html += '</tr>';
  });

  html += '</table>';
  return html;
}

export function generateCrewSection(data: CrewLogistics): string {
  if (!data.hasCrewSupport) {
    return `
      <div class="page-break">
        <div class="section-header">
          <div class="section-number">4</div>
          <h2 style="margin: 0;">Crew Logistics</h2>
        </div>

        <div class="info-box">
          <strong>Self-Supported Race</strong>
          <p style="margin-top: 8px; margin-bottom: 0;">
            You've indicated you'll be running without crew support. This section focuses on maximizing
            your efficiency at aid stations and ensuring you have everything you need in your drop bags.
          </p>
        </div>

        <h3 style="margin-top: 24px;">Aid Station Strategy</h3>
        <p>Without crew, your success depends on:</p>
        <ul>
          <li>Well-organized drop bags with clearly labeled items</li>
          <li>Efficient aid station routines (in and out quickly)</li>
          <li>Mental preparation for handling challenges independently</li>
          <li>Building relationships with aid station volunteers</li>
        </ul>

        <div class="warning-box" style="margin-top: 24px;">
          <strong>Emergency Protocol</strong>
          <p style="margin-top: 8px; margin-bottom: 0;">${data.emergencyProtocol}</p>
        </div>
      </div>
    `;
  }

  const stationCards = data.crewStations.map(station => `
    <div style="background: ${brandColors.white}; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
      <div style="margin-bottom: 12px;">
        <h4 style="font-family: ${fonts.header}; font-weight: 600; font-size: 16px; color: ${brandColors.trailCanopy}; margin: 0;">
          ${station.name}
        </h4>
        <p style="font-size: 12px; color: ${brandColors.stoneGray}; margin: 4px 0 0 0;">
          Mile ${station.mile}
        </p>
        <p style="font-size: 12px; color: ${brandColors.stoneGray}; margin: 4px 0 0 0;">
          <strong>ETA:</strong> ${station.predictedArrival} (race time) • <strong>Arrival Window:</strong> ${station.arrivalWindow}
        </p>
        <p style="font-size: 11px; color: ${brandColors.stoneGray}; margin: 2px 0 0 0; font-style: italic;">
          Plan to be at station for ${station.timeAtStation}
        </p>
      </div>

      <div style="margin-bottom: 12px;">
        <strong style="font-family: ${fonts.header}; font-size: 12px; text-transform: uppercase; color: ${brandColors.summitLight};">
          Priorities
        </strong>
        <ul style="margin: 4px 0 0 0; padding-left: 20px; font-size: 14px;">
          ${station.priorities.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 12px;">
        <strong style="font-family: ${fonts.header}; font-size: 12px; text-transform: uppercase; color: ${brandColors.stoneGray};">
          Crew Tasks
        </strong>
        <ul style="margin: 4px 0 0 0; padding-left: 20px; font-size: 14px;">
          ${station.crewTasks.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>

      ${station.gearChanges.length > 0 ? `
        <div style="margin-bottom: 12px;">
          <strong style="font-family: ${fonts.header}; font-size: 12px; text-transform: uppercase; color: ${brandColors.stoneGray};">
            Gear Changes
          </strong>
          <ul style="margin: 4px 0 0 0; padding-left: 20px; font-size: 14px;">
            ${station.gearChanges.map(g => `<li>${g}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <div style="margin-bottom: 12px;">
        <strong style="font-family: ${fonts.header}; font-size: 12px; text-transform: uppercase; color: ${brandColors.stoneGray};">
          Nutrition Needs
        </strong>
        <ul style="margin: 4px 0 0 0; padding-left: 20px; font-size: 14px;">
          ${station.nutritionNeeds.map(n => `<li>${n}</li>`).join('')}
        </ul>
      </div>

      <div style="background: ${brandColors.sandstone}; padding: 12px; border-radius: 4px; margin-bottom: 12px;">
        <strong style="font-family: ${fonts.header}; font-size: 12px;">Mental Support:</strong>
        <span style="font-size: 14px;"> ${station.mentalSupport}</span>
      </div>

      ${station.warningSignsToWatch.length > 0 ? `
        <div style="background: #fef3c7; padding: 12px; border-radius: 4px;">
          <strong style="font-family: ${fonts.header}; font-size: 12px; color: ${brandColors.summitLight};">Warning Signs to Watch:</strong>
          <ul style="margin: 4px 0 0 0; padding-left: 20px; font-size: 12px;">
            ${station.warningSignsToWatch.map(w => `<li>${w}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `).join('');

  const packingListItems = data.crewPackingList.map(item => `
    <li>${item}</li>
  `).join('');

  return `
    <div class="page-break">
      <div class="section-header">
        <div class="section-number">4</div>
        <h2 style="margin: 0;">Crew Logistics</h2>
      </div>

      <h3>Crew Timing Sheet</h3>
      <div style="margin-bottom: 24px;">
        ${markdownTableToHtml(data.crewTimingSheet)}
      </div>

      <h3>Station-by-Station Instructions</h3>
      ${stationCards}

      <h3 style="margin-top: 24px;">Crew Packing Checklist</h3>
      <div style="background: ${brandColors.white}; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
        <ul style="margin: 0; padding-left: 24px; columns: 2; column-gap: 24px;">
          ${packingListItems}
        </ul>
      </div>

      <h3 style="margin-top: 24px;">Communication Plan</h3>
      <p>${data.communicationPlan}</p>

      <div class="warning-box" style="margin-top: 24px;">
        <strong>Emergency Protocol</strong>
        <p style="margin-top: 8px; margin-bottom: 0;">${data.emergencyProtocol}</p>
      </div>
    </div>
  `;
}
