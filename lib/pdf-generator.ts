import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { brandColors, fonts, globalStyles, formatDate } from './templates/styles';
import type {
  RaceOverview,
  PacingStrategy,
  CutoffManagement,
  CrewLogistics,
  DropBagStrategy,
  NutritionTimeline,
  ContingencyProtocols,
  MentalStrategy,
} from './schemas/guide-sections';

// Import section generators
import { generateRaceOverviewSection } from './templates/sections/race-overview';
import { generatePacingSection } from './templates/sections/pacing';
import { generateCutoffsSection } from './templates/sections/cutoffs';
import { generateCrewSection } from './templates/sections/crew';
import { generateDropBagsSection } from './templates/sections/drop-bags';
import { generateNutritionSection } from './templates/sections/nutrition';
import { generateContingenciesSection } from './templates/sections/contingencies';
import { generateMentalSection } from './templates/sections/mental';

export interface GuideData {
  raceOverview: RaceOverview;
  pacingStrategy: PacingStrategy;
  cutoffManagement: CutoffManagement;
  crewLogistics: CrewLogistics;
  dropBagStrategy: DropBagStrategy;
  nutritionTimeline: NutritionTimeline;
  contingencyProtocols: ContingencyProtocols;
  mentalStrategy: MentalStrategy;
}

export interface QuestionnaireData {
  raceName: string;
  raceDate: Date;
  goalFinishTime: string;
  firstName: string;
  email: string;
  tier: 'essential' | 'custom' | 'ultra_bundle';
}

// ── SVG logo helpers ──────────────────────────────────────────────────────────

let _svgRaw: string | null = null;

function getSvgRaw(): string {
  if (_svgRaw !== null) return _svgRaw;
  try {
    _svgRaw = fs.readFileSync(
      path.join(process.cwd(), 'public/Paceline-Banner-Logo.svg'),
      'utf-8',
    );
  } catch {
    _svgRaw = '';
  }
  return _svgRaw ?? '';
}

/**
 * Returns an inline SVG of the Paceline logo cropped to the content area
 * (viewBox="100 410 790 200") with the requested fill color.
 *
 * Falls back to a plain-text wordmark if the SVG file is unavailable.
 */
function getLogoSvg(fillColor: string, widthPx: number): string {
  const raw = getSvgRaw();
  if (!raw) {
    return `<span style="font-family:sans-serif;font-weight:700;font-size:${Math.round(widthPx / 6)}px;color:${fillColor};letter-spacing:0.12em;">PACELINE</span>`;
  }
  // Replace all fill paths with requested color and crop to logo area
  return raw
    .replace(/fill="#2C5F4D"/g, `fill="${fillColor}"`)
    .replace(/width="100%"/, `width="${widthPx}px"`)
    .replace(/viewBox="0 0 1024 1024"/, 'viewBox="100 410 790 200"')
    .replace(/enable-background="[^"]*"/, '')
    .replace(/x="0px"\s+y="0px"/, '');
}

// ── Cover page ────────────────────────────────────────────────────────────────

function generateCoverPage(questionnaire: QuestionnaireData): string {
  const logoSvg = getLogoSvg('#D4B896', 200);
  const tierLabel =
    questionnaire.tier === 'ultra_bundle'
      ? 'Ultra Bundle'
      : questionnaire.tier === 'custom'
      ? 'Strava-Powered Custom Plan'
      : 'Essential Race Guide';

  return `
    <div style="
      page-break-after: always;
      background: ${brandColors.trailCanopy};
      display: flex;
      flex-direction: column;
      min-height: 9.8in;
      margin: -0.5in;
      padding: 0;
      width: calc(100% + 1in);
    ">
      <!-- Top orange accent bar -->
      <div style="height: 5px; background: ${brandColors.summitLight}; flex-shrink: 0;"></div>

      <!-- Main cover body -->
      <div style="
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 52px 64px 44px;
      ">
        <!-- Logo -->
        <div style="margin-bottom: 0;">
          ${logoSvg}
        </div>

        <!-- Title block -->
        <div>
          <p style="
            font-family: Inter, sans-serif;
            font-weight: 500;
            font-size: 9pt;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: ${brandColors.trailDust};
            margin-bottom: 14px;
            opacity: 0.8;
          ">Race Execution Guide</p>

          <h1 style="
            font-family: Inter, sans-serif;
            font-weight: 800;
            font-size: 40pt;
            line-height: 1.05;
            color: #FFFFFF;
            letter-spacing: -0.02em;
            margin-bottom: 0;
          ">${questionnaire.raceName}</h1>

          <p style="
            font-family: 'Source Serif 4', Georgia, serif;
            font-size: 13pt;
            color: ${brandColors.trailDust};
            margin-top: 14px;
            line-height: 1.55;
            font-style: italic;
          ">Prepared for ${questionnaire.firstName}</p>

          <div style="width: 44px; height: 3px; background: ${brandColors.summitLight}; margin: 18px 0;"></div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; max-width: 440px;">
            <div>
              <p style="
                font-family: Inter, sans-serif;
                font-size: 6.5pt;
                font-weight: 600;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                color: ${brandColors.trailDust};
                opacity: 0.6;
                margin-bottom: 4px;
              ">Race Date</p>
              <p style="
                font-family: Inter, sans-serif;
                font-weight: 600;
                font-size: 10pt;
                color: #FFFFFF;
                margin: 0;
              ">${new Date(questionnaire.raceDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div>
              <p style="
                font-family: Inter, sans-serif;
                font-size: 6.5pt;
                font-weight: 600;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                color: ${brandColors.trailDust};
                opacity: 0.6;
                margin-bottom: 4px;
              ">Goal Finish Time</p>
              <p style="
                font-family: Inter, sans-serif;
                font-weight: 600;
                font-size: 10pt;
                color: ${brandColors.summitLight};
                margin: 0;
              ">${questionnaire.goalFinishTime}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Cover footer -->
      <div style="
        padding: 14px 64px;
        border-top: 1px solid rgba(255,255,255,0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
      ">
        <span style="
          font-family: Inter, sans-serif;
          font-size: 7pt;
          color: ${brandColors.trailDust};
          opacity: 0.55;
        ">Generated ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        <span style="
          font-family: Inter, sans-serif;
          font-size: 7pt;
          font-weight: 600;
          color: ${brandColors.trailCanopy};
          background: ${brandColors.summitLight};
          padding: 4px 12px;
          border-radius: 14px;
        ">${tierLabel}</span>
      </div>
    </div>
  `;
}

// ── Table of contents ─────────────────────────────────────────────────────────

function generateTableOfContents(): string {
  const sections = [
    { number: 1, title: 'Race Overview', id: 'race-overview' },
    { number: 2, title: 'Pacing Strategy', id: 'pacing-strategy' },
    { number: 3, title: 'Cutoff Management', id: 'cutoff-management' },
    { number: 4, title: 'Crew Logistics', id: 'crew-logistics' },
    { number: 5, title: 'Drop Bag Strategy', id: 'drop-bag-strategy' },
    { number: 6, title: 'Nutrition Timeline', id: 'nutrition-timeline' },
    { number: 7, title: 'Contingency Protocols', id: 'contingency-protocols' },
    { number: 8, title: 'Mental Strategy', id: 'mental-strategy' },
  ];

  const sectionItems = sections.map(s => `
    <div style="
      display: flex;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid ${brandColors.sandstone};
    ">
      <div style="
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: ${brandColors.trailCanopy};
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Inter, sans-serif;
        font-weight: 700;
        font-size: 12px;
        margin-right: 16px;
        flex-shrink: 0;
      ">${s.number}</div>
      <span style="
        font-family: Inter, sans-serif;
        font-weight: 500;
        font-size: 14px;
        color: ${brandColors.stoneGray};
      ">${s.title}</span>
    </div>
  `).join('');

  return `
    <div style="page-break-after: always; padding: 40px 0;">
      <div style="
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 8px;
        padding-bottom: 12px;
        border-bottom: 2px solid ${brandColors.sandstone};
      ">
        <h2 style="
          font-size: 24px;
          color: ${brandColors.trailCanopy};
          font-family: Inter, sans-serif;
          font-weight: 700;
          margin: 0;
        ">Table of Contents</h2>
      </div>
      ${sectionItems}
    </div>
  `;
}

// ── Legal disclaimer ──────────────────────────────────────────────────────────

function generateLegalDisclaimer(): string {
  return `
    <div class="page-break" style="padding: 40px 0;">
      <h2 style="font-size: 22px; margin-bottom: 24px; color: ${brandColors.trailCanopy};">
        Important Disclaimer &amp; Liability Notice
      </h2>

      <div style="font-size: 11px; line-height: 1.7; color: ${brandColors.stoneGray};">
        <p style="margin-bottom: 14px;">
          <strong style="color: ${brandColors.trailCanopy};">FOR INFORMATIONAL PURPOSES ONLY</strong><br/>
          This race execution guide is provided by Paceline for informational and planning purposes only.
          The recommendations, pacing strategies, nutrition plans, and other content contained in this guide
          are based on general ultramarathon principles and the information you provided in your questionnaire.
        </p>

        <p style="margin-bottom: 14px;">
          <strong style="color: ${brandColors.trailCanopy};">NOT MEDICAL OR PROFESSIONAL ADVICE</strong><br/>
          This guide does not constitute medical advice, professional coaching advice, or a substitute for
          consultation with qualified healthcare providers, coaches, or race officials. Always consult with
          your physician before undertaking any ultramarathon or endurance event, particularly if you have
          any pre-existing health conditions.
        </p>

        <p style="margin-bottom: 14px;">
          <strong style="color: ${brandColors.trailCanopy};">ASSUMPTION OF RISK</strong><br/>
          Ultramarathon running is an inherently dangerous activity that carries significant risks including,
          but not limited to: serious injury, permanent disability, and death. By using this guide, you
          acknowledge that you understand these risks and voluntarily assume all responsibility for your
          participation in the race.
        </p>

        <p style="margin-bottom: 14px;">
          <strong style="color: ${brandColors.trailCanopy};">NO WARRANTIES</strong><br/>
          Paceline makes no warranties, express or implied, regarding the accuracy, completeness, reliability,
          or suitability of the information in this guide. Race conditions, weather, course changes, and
          individual physical responses can vary significantly from predictions. Cutoff times, aid station
          services, and course details should be verified with official race communications.
        </p>

        <p style="margin-bottom: 14px;">
          <strong style="color: ${brandColors.trailCanopy};">LIMITATION OF LIABILITY</strong><br/>
          To the fullest extent permitted by law, Paceline, its owners, employees, and affiliates shall not
          be liable for any direct, indirect, incidental, consequential, or punitive damages arising from
          your use of this guide or participation in any race.
        </p>

        <p style="margin-bottom: 14px;">
          <strong style="color: ${brandColors.trailCanopy};">YOUR RESPONSIBILITY</strong><br/>
          You are solely responsible for: verifying all information with official race sources; making
          real-time decisions based on actual conditions; knowing and following all race rules; listening
          to your body and stopping if necessary; and carrying required safety gear.
        </p>

        <p style="margin-bottom: 14px;">
          <strong style="color: ${brandColors.trailCanopy};">INDEMNIFICATION</strong><br/>
          You agree to indemnify and hold harmless Paceline and its affiliates from any claims, damages,
          or expenses arising from your use of this guide or participation in any race.
        </p>

        <p style="margin-bottom: 14px; font-style: italic;">
          By using this guide, you acknowledge that you have read, understood, and agree to be bound by
          this disclaimer and limitation of liability.
        </p>

        <div style="margin-top: 28px; padding-top: 14px; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 10px; color: ${brandColors.stoneGray};">
            © ${new Date().getFullYear()} Paceline. All rights reserved.<br/>
            Questions? Contact us at support@paceline.run
          </p>
        </div>
      </div>
    </div>
  `;
}

// ── Full HTML document ────────────────────────────────────────────────────────

function generateGuideHTML(guideData: GuideData, questionnaire: QuestionnaireData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${questionnaire.raceName} — Race Execution Guide</title>
      <style>
        ${globalStyles}

        /* Content padding to sit below header and above footer */
        body {
          padding: 0;
        }

        /* Section page wrapper — adds top padding so content clears header bar */
        .section-page {
          padding-top: 8px;
        }
      </style>
    </head>
    <body>
      ${generateCoverPage(questionnaire)}
      ${generateTableOfContents()}
      <div id="race-overview" class="section-page">${generateRaceOverviewSection(guideData.raceOverview)}</div>
      <div id="pacing-strategy" class="section-page">${generatePacingSection(guideData.pacingStrategy)}</div>
      <div id="cutoff-management" class="section-page">${generateCutoffsSection(guideData.cutoffManagement)}</div>
      <div id="crew-logistics" class="section-page">${generateCrewSection(guideData.crewLogistics)}</div>
      <div id="drop-bag-strategy" class="section-page">${generateDropBagsSection(guideData.dropBagStrategy)}</div>
      <div id="nutrition-timeline" class="section-page">${generateNutritionSection(guideData.nutritionTimeline)}</div>
      <div id="contingency-protocols" class="section-page">${generateContingenciesSection(guideData.contingencyProtocols)}</div>
      <div id="mental-strategy" class="section-page">${generateMentalSection(guideData.mentalStrategy)}</div>
      ${generateLegalDisclaimer()}
    </body>
    </html>
  `;
}

// ── PDF generation ────────────────────────────────────────────────────────────

export async function generateGuidePDF(
  guideData: GuideData,
  questionnaire: QuestionnaireData
): Promise<Buffer> {
  // Build logo and templates once before launching browser
  const headerLogoSvg = getLogoSvg('rgba(255,255,255,0.92)', 110);
  const safeRaceName = questionnaire.raceName
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const headerTemplate = `
    <div style="width:100%;margin:0;padding:0;font-size:0;display:flex;flex-direction:column;">
      <div style="background:#2C5F4D;padding:9px 36px;display:flex;justify-content:space-between;align-items:center;width:100%;box-sizing:border-box;">
        ${headerLogoSvg}
        <span style="font-family:sans-serif;font-size:7.5px;font-weight:500;color:rgba(255,255,255,0.55);letter-spacing:0.06em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:300px;">${safeRaceName}</span>
      </div>
      <div style="height:3px;background:#C87350;width:100%;"></div>
    </div>
  `;

  const footerTemplate = `
    <div style="width:100%;padding:7px 36px;border-top:1px solid #F5F1EA;display:flex;justify-content:space-between;align-items:center;box-sizing:border-box;font-size:0;">
      <span style="font-family:sans-serif;font-size:7px;font-weight:600;color:#2C5F4D;letter-spacing:0.12em;text-transform:uppercase;opacity:0.65;">PACELINE</span>
      <span style="font-family:sans-serif;font-size:7px;font-weight:500;color:#C87350;letter-spacing:0.04em;">paceline.run</span>
      <span style="font-family:sans-serif;font-size:7px;color:#4A5859;opacity:0.45;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
    </div>
  `;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    const html = generateGuideHTML(guideData, questionnaire);

    await page.setContent(html, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    const pdfBuffer = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '0.6in',
        right: '0.5in',
        bottom: '0.38in',
        left: '0.5in',
      },
      displayHeaderFooter: true,
      headerTemplate,
      footerTemplate,
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}

// Export the HTML generator for debugging
export function getGuideHTML(
  guideData: GuideData,
  questionnaire: QuestionnaireData
): string {
  return generateGuideHTML(guideData, questionnaire);
}
