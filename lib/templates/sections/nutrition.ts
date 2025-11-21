import { brandColors, fonts } from '../styles';
import type { NutritionTimeline } from '../../schemas/guide-sections';

export function generateNutritionSection(data: NutritionTimeline): string {
  const timelineRows = data.timeline.map(entry => `
    <tr>
      <td style="font-weight: 500;">${entry.mile}</td>
      <td>${entry.timeElapsed}</td>
      <td style="font-weight: 600; color: ${brandColors.trailCanopy};">${entry.calories}</td>
      <td>${entry.sodium}</td>
      <td>${entry.fluids}</td>
      <td style="font-size: 12px;">${entry.foods.join(', ')}</td>
      <td style="font-size: 11px;">${entry.notes || '–'}</td>
    </tr>
  `).join('');

  const stomachPrevention = data.stomachIssuesPrevention.map(tip => `
    <li>${tip}</li>
  `).join('');

  return `
    <div class="page-break">
      <div class="section-header">
        <div class="section-number">6</div>
        <h2 style="margin: 0;">Nutrition Timeline</h2>
      </div>

      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-value">${data.summary.caloriesPerHour}</div>
          <div class="stat-label">Calories/Hour</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${data.summary.sodiumPerHour}</div>
          <div class="stat-label">Sodium/Hour (mg)</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${data.summary.fluidsPerHour}</div>
          <div class="stat-label">Fluids/Hour (oz)</div>
        </div>
      </div>

      <div class="info-box" style="margin-top: 24px;">
        <strong>Pre-Race Nutrition</strong>
        <p style="margin-top: 8px; margin-bottom: 0;">${data.preRaceNutrition}</p>
      </div>

      <h3 style="margin-top: 24px;">Fueling Timeline</h3>
      <table style="font-size: 11px;">
        <thead>
          <tr>
            <th>Mile</th>
            <th>Time</th>
            <th>Cal</th>
            <th>Na (mg)</th>
            <th>Fluid (oz)</th>
            <th>Foods</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          ${timelineRows}
        </tbody>
      </table>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px;">
        <div>
          <h3>Hydration Strategy</h3>
          <p style="font-size: 14px;">${data.hydrationStrategy}</p>
        </div>
        <div>
          <h3>Caffeine Strategy</h3>
          <p style="font-size: 14px;">${data.caffeineStrategy}</p>
        </div>
      </div>

      <h3 style="margin-top: 24px;">GI Issue Prevention</h3>
      <ul>
        ${stomachPrevention}
      </ul>

      <div class="info-box" style="margin-top: 24px;">
        <strong>Aid Station Strategy</strong>
        <p style="margin-top: 8px; margin-bottom: 0;">${data.aidStationStrategy}</p>
      </div>

      <div style="background: ${brandColors.sandstone}; padding: 16px; border-radius: 8px; margin-top: 24px;">
        <h4 style="font-family: ${fonts.header}; font-size: 14px; margin: 0 0 8px 0;">Race Totals</h4>
        <p style="font-size: 14px; margin: 0;">
          Total Calories: <strong>${data.summary.totalCalories.toLocaleString()}</strong> •
          Total Sodium: <strong>${data.summary.totalSodium.toLocaleString()}mg</strong> •
          Total Fluids: <strong>${data.summary.totalFluids}oz</strong>
        </p>
      </div>
    </div>
  `;
}
