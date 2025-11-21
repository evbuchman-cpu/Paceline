import { brandColors, fonts, getDifficultyClass } from '../styles';
import type { RaceOverview } from '../../schemas/guide-sections';

export function generateRaceOverviewSection(data: RaceOverview): string {
  const aidStationRows = data.aidStations.map(station => `
    <tr>
      <td style="font-weight: 500;">${station.name}</td>
      <td>${station.mile}</td>
      <td>${station.cutoff}</td>
      <td>${station.crewAccess ? '✓' : '–'}</td>
      <td>${station.dropBagAccess ? '✓' : '–'}</td>
      <td style="font-size: 12px;">${station.services.join(', ')}</td>
    </tr>
  `).join('');

  const toughSectionCards = data.toughSections.map(section => `
    <div style="background: ${brandColors.white}; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
        <h4 style="font-family: ${fonts.header}; font-weight: 600; font-size: 16px; color: ${brandColors.trailCanopy}; margin: 0;">
          ${section.name}
        </h4>
        <span class="status-badge ${getDifficultyClass(section.difficulty)}" style="text-transform: capitalize;">
          ${section.difficulty}
        </span>
      </div>
      <p style="font-size: 12px; color: ${brandColors.stoneGray}; margin-bottom: 8px;">
        Miles ${section.miles} • ${section.elevationChange}
      </p>
      <p style="font-size: 14px; margin: 0;">${section.notes}</p>
    </div>
  `).join('');

  return `
    <div class="page-break">
      <div class="section-header">
        <div class="section-number">1</div>
        <h2 style="margin: 0;">Race Overview</h2>
      </div>

      <div class="section">
        <p style="font-size: 16px; line-height: 1.8;">${data.description}</p>
      </div>

      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-value">${data.distance}</div>
          <div class="stat-label">Miles</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${data.elevationGain.toLocaleString()}'</div>
          <div class="stat-label">Elevation Gain</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${data.aidStations.length}</div>
          <div class="stat-label">Aid Stations</div>
        </div>
      </div>

      <h3 style="margin-top: 24px;">Aid Stations</h3>
      <table>
        <thead>
          <tr>
            <th>Station</th>
            <th>Mile</th>
            <th>Cutoff</th>
            <th>Crew</th>
            <th>Drop Bag</th>
            <th>Services</th>
          </tr>
        </thead>
        <tbody>
          ${aidStationRows}
        </tbody>
      </table>

      <h3 style="margin-top: 24px;">Weather Patterns</h3>
      <div class="info-box">
        <strong>Expected Conditions (${data.weatherPatterns.month})</strong>
        <p style="margin-top: 8px; margin-bottom: 0;">
          Temperature: ${data.weatherPatterns.avgLowTemp}°F - ${data.weatherPatterns.avgHighTemp}°F<br/>
          Precipitation: ${data.weatherPatterns.precipitation}<br/>
          Sunrise: ${data.weatherPatterns.sunriseTime} • Sunset: ${data.weatherPatterns.sunsetTime}
        </p>
      </div>

      <h3 style="margin-top: 24px;">Challenging Sections</h3>
      ${toughSectionCards}

      <div class="info-box" style="margin-top: 24px;">
        <strong>Course Notes</strong>
        <p style="margin-top: 8px; margin-bottom: 0;">${data.courseNotes}</p>
      </div>
    </div>
  `;
}
