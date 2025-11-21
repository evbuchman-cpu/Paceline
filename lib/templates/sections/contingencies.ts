import { brandColors, fonts, getSeverityClass } from '../styles';
import type { ContingencyProtocols } from '../../schemas/guide-sections';

export function generateContingenciesSection(data: ContingencyProtocols): string {
  const protocolCards = data.protocols.map(protocol => {
    const warningSignals = protocol.warningSignals.map(signal => `
      <li style="color: ${brandColors.statusRedText};">${signal}</li>
    `).join('');

    const immediateActions = protocol.immediateActions.map((action, index) => `
      <li><strong>${index + 1}.</strong> ${action}</li>
    `).join('');

    const preventionTips = protocol.prevention.map(tip => `
      <li>${tip}</li>
    `).join('');

    return `
      <div style="background: ${brandColors.white}; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 16px; page-break-inside: avoid;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <h4 style="font-family: ${fonts.header}; font-weight: 600; font-size: 16px; color: ${brandColors.trailCanopy}; margin: 0;">
            ${protocol.scenario}
          </h4>
          <span class="status-badge ${getSeverityClass(protocol.severity)}" style="text-transform: capitalize;">
            ${protocol.severity}
          </span>
        </div>

        <div style="margin-bottom: 12px;">
          <strong style="font-family: ${fonts.header}; font-size: 12px; text-transform: uppercase; color: ${brandColors.statusRedText};">
            Warning Signals
          </strong>
          <ul style="margin: 4px 0 0 0; padding-left: 20px; font-size: 14px;">
            ${warningSignals}
          </ul>
        </div>

        <div style="margin-bottom: 12px;">
          <strong style="font-family: ${fonts.header}; font-size: 12px; text-transform: uppercase; color: ${brandColors.trailCanopy};">
            Immediate Actions
          </strong>
          <ol style="margin: 4px 0 0 0; padding-left: 20px; font-size: 14px; list-style: none;">
            ${immediateActions}
          </ol>
        </div>

        <div style="margin-bottom: 12px;">
          <strong style="font-family: ${fonts.header}; font-size: 12px; text-transform: uppercase; color: ${brandColors.stoneGray};">
            Prevention
          </strong>
          <ul style="margin: 4px 0 0 0; padding-left: 20px; font-size: 14px;">
            ${preventionTips}
          </ul>
        </div>

        <div style="background: ${brandColors.statusRedBg}; padding: 12px; border-radius: 4px;">
          <strong style="font-family: ${fonts.header}; font-size: 12px; color: ${brandColors.statusRedText};">When to Stop:</strong>
          <span style="font-size: 14px; color: ${brandColors.statusRedText};"> ${protocol.whenToStop}</span>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="page-break">
      <div class="section-header">
        <div class="section-number">7</div>
        <h2 style="margin: 0;">Contingency Protocols</h2>
      </div>

      <p style="margin-bottom: 24px;">
        These protocols are designed to help you identify and respond to common race-day challenges.
        Acting early on warning signals can save your race.
      </p>

      ${protocolCards}

      <div class="warning-box" style="margin-top: 24px;">
        <strong>DNF Decision Framework</strong>
        <p style="margin-top: 8px; margin-bottom: 0;">${data.dnfDecisionFramework}</p>
      </div>

      <h3 style="margin-top: 24px;">Emergency Contacts</h3>
      <div style="background: ${brandColors.sandstone}; padding: 16px; border-radius: 8px; white-space: pre-wrap;">
${data.emergencyContacts}
      </div>

      <div class="info-box" style="margin-top: 24px;">
        <strong>Race Hotline</strong>
        <p style="margin-top: 8px; margin-bottom: 0;">${data.raceHotlineInfo}</p>
      </div>
    </div>
  `;
}
