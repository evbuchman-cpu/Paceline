import { brandColors, fonts } from '../styles';
import type { MentalStrategy } from '../../schemas/guide-sections';

export function generateMentalSection(data: MentalStrategy): string {
  const mantraBoxes = data.mantras.map(mantra => `
    <div class="mantra-box">
      <div style="font-size: 18px; font-weight: 600; color: ${brandColors.trailCanopy}; margin-bottom: 8px;">
        "${mantra.mantra}"
      </div>
      <div style="font-size: 12px; color: ${brandColors.summitLight}; font-weight: 500; margin-bottom: 4px;">
        Use when: ${mantra.useCase}
      </div>
      <div style="font-size: 13px; font-style: normal;">
        ${mantra.explanation}
      </div>
    </div>
  `).join('');

  const toughSectionCards = data.toughSections.map(section => `
    <div style="background: ${brandColors.white}; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
      <h4 style="font-family: ${fonts.header}; font-weight: 600; font-size: 16px; color: ${brandColors.trailCanopy}; margin: 0 0 8px 0;">
        ${section.sectionName}
      </h4>
      <p style="font-size: 12px; color: ${brandColors.stoneGray}; margin-bottom: 8px;">
        Miles ${section.miles}
      </p>

      <div style="margin-bottom: 12px;">
        <strong style="font-family: ${fonts.header}; font-size: 12px; text-transform: uppercase; color: ${brandColors.summitLight};">
          Mental Challenge
        </strong>
        <p style="font-size: 14px; margin: 4px 0 0 0;">${section.mentalChallenge}</p>
      </div>

      <div style="margin-bottom: 12px;">
        <strong style="font-family: ${fonts.header}; font-size: 12px; text-transform: uppercase; color: ${brandColors.stoneGray};">
          Strategies
        </strong>
        <ul style="margin: 4px 0 0 0; padding-left: 20px; font-size: 14px;">
          ${section.strategies.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 12px;">
        <strong style="font-family: ${fonts.header}; font-size: 12px; text-transform: uppercase; color: ${brandColors.stoneGray};">
          Mantras for This Section
        </strong>
        <ul style="margin: 4px 0 0 0; padding-left: 20px; font-size: 14px; font-style: italic;">
          ${section.mantras.map(m => `<li>"${m}"</li>`).join('')}
        </ul>
      </div>

      <div>
        <strong style="font-family: ${fonts.header}; font-size: 12px; text-transform: uppercase; color: ${brandColors.stoneGray};">
          Focus Points
        </strong>
        <ul style="margin: 4px 0 0 0; padding-left: 20px; font-size: 14px;">
          ${section.focusPoints.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  const motivationalAnchors = data.motivationalAnchors.map(anchor => `
    <li>${anchor}</li>
  `).join('');

  const celebrationMilestones = data.celebrationMilestones.map(milestone => `
    <tr>
      <td style="font-weight: 500;">Mile ${milestone.mile}</td>
      <td>${milestone.celebration}</td>
    </tr>
  `).join('');

  return `
    <div class="page-break">
      <div class="section-header">
        <div class="section-number">8</div>
        <h2 style="margin: 0;">Mental Strategy</h2>
      </div>

      <div class="info-box">
        <strong>Race Day Mindset</strong>
        <p style="margin-top: 8px; margin-bottom: 0;">${data.raceDayMindset}</p>
      </div>

      <h3 style="margin-top: 24px;">Your Mantras</h3>
      ${mantraBoxes}

      <h3 style="margin-top: 24px;">Tough Section Strategies</h3>
      ${toughSectionCards}

      <div class="warning-box" style="margin-top: 24px;">
        <strong>Dark Moment Protocol</strong>
        <p style="margin-top: 8px; margin-bottom: 0;">${data.darkMomentProtocol}</p>
      </div>

      <h3 style="margin-top: 24px;">Motivational Anchors</h3>
      <p style="font-size: 14px; margin-bottom: 8px;">When things get hard, remember:</p>
      <ul>
        ${motivationalAnchors}
      </ul>

      <h3 style="margin-top: 24px;">Celebration Milestones</h3>
      <table>
        <thead>
          <tr>
            <th>Milestone</th>
            <th>Celebration</th>
          </tr>
        </thead>
        <tbody>
          ${celebrationMilestones}
        </tbody>
      </table>

      <div class="info-box" style="margin-top: 24px;">
        <strong>Finish Line Visualization</strong>
        <p style="margin-top: 8px; margin-bottom: 0; font-style: italic;">${data.finishLineVisualization}</p>
      </div>
    </div>
  `;
}
