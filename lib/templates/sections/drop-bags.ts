import { brandColors, fonts } from '../styles';
import type { DropBagStrategy } from '../../schemas/guide-sections';

export function generateDropBagsSection(data: DropBagStrategy): string {
  const stationCards = data.stations.map(station => {
    const packingItems = station.packingList.map(item => `
      <tr>
        <td style="font-weight: ${station.priorityItems.includes(item.item) ? '600' : '400'}; color: ${station.priorityItems.includes(item.item) ? brandColors.summitLight : 'inherit'};">
          ${item.item}
        </td>
        <td>${item.quantity}</td>
        <td style="font-size: 12px;">${item.reason}</td>
      </tr>
    `).join('');

    const timeOfDayEmoji = {
      morning: '🌅',
      afternoon: '☀️',
      evening: '🌆',
      night: '🌙'
    }[station.timeOfDay];

    return `
      <div style="background: ${brandColors.white}; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 16px; page-break-inside: avoid;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <div>
            <h4 style="font-family: ${fonts.header}; font-weight: 600; font-size: 16px; color: ${brandColors.trailCanopy}; margin: 0;">
              ${station.name}
            </h4>
            <p style="font-size: 12px; color: ${brandColors.stoneGray}; margin: 4px 0 0 0;">
              Mile ${station.mile} • ETA: ${station.expectedArrival}
            </p>
          </div>
          <span style="font-size: 14px;">
            ${timeOfDayEmoji} ${station.timeOfDay}
          </span>
        </div>

        <p style="font-size: 12px; color: ${brandColors.stoneGray}; margin-bottom: 12px;">
          <strong>Weather:</strong> ${station.weatherConditions}
        </p>

        <table style="font-size: 13px; margin-bottom: 12px;">
          <thead>
            <tr>
              <th style="font-size: 11px;">Item</th>
              <th style="font-size: 11px;">Qty</th>
              <th style="font-size: 11px;">Reason</th>
            </tr>
          </thead>
          <tbody>
            ${packingItems}
          </tbody>
        </table>

        ${station.notes ? `
          <p style="font-size: 12px; font-style: italic; color: ${brandColors.stoneGray}; margin: 0;">
            Note: ${station.notes}
          </p>
        ` : ''}
      </div>
    `;
  }).join('');

  const generalTips = data.generalPackingTips.map(tip => `
    <li>${tip}</li>
  `).join('');

  return `
    <div class="page-break">
      <div class="section-header">
        <div class="section-number">5</div>
        <h2 style="margin: 0;">Drop Bag Strategy</h2>
      </div>

      <div class="info-box">
        <strong>Labeling System</strong>
        <p style="margin-top: 8px; margin-bottom: 0;">${data.labelingSystem}</p>
      </div>

      <h3 style="margin-top: 24px;">Station-by-Station Packing</h3>
      <p style="font-size: 12px; color: ${brandColors.stoneGray}; margin-bottom: 16px;">
        Items in <span style="color: ${brandColors.summitLight}; font-weight: 600;">orange</span> are priority items for that station.
      </p>
      ${stationCards}

      <h3 style="margin-top: 24px;">General Packing Tips</h3>
      <ul>
        ${generalTips}
      </ul>

      <h3 style="margin-top: 24px;">Drop-Off Instructions</h3>
      <p>${data.dropOffInstructions}</p>
    </div>
  `;
}
