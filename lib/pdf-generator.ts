import puppeteer from 'puppeteer';
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

function generateCoverPage(questionnaire: QuestionnaireData): string {
  return `
    <div style="page-break-after: always; height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 48px;">
      <!-- Logo -->
      <div style="font-family: ${fonts.header}; font-weight: 700; font-size: 28px; color: ${brandColors.trailCanopy}; margin-bottom: 64px;">
        PACELINE
      </div>

      <h1 style="font-size: 40px; font-weight: 700; color: ${brandColors.trailCanopy}; margin-bottom: 16px;">
        ${questionnaire.raceName}
      </h1>

      <p style="font-size: 20px; color: ${brandColors.summitLight}; margin-bottom: 8px;">
        Your Race Execution Guide
      </p>

      <p style="font-size: 16px; color: ${brandColors.stoneGray}; margin-bottom: 48px;">
        Prepared for ${questionnaire.firstName}
      </p>

      <p style="font-size: 14px; color: ${brandColors.stoneGray};">
        Race Date: ${formatDate(questionnaire.raceDate)}<br/>
        Goal Time: ${questionnaire.goalFinishTime}
      </p>

      <p style="font-size: 12px; color: ${brandColors.stoneGray}; margin-top: auto;">
        Generated ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
    </div>
  `;
}

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
    <a href="#${s.id}" style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-decoration: none;">
      <div style="width: 32px; height: 32px; border-radius: 50%; background: ${brandColors.summitLight}; color: white; display: flex; align-items: center; justify-content: center; font-family: ${fonts.header}; font-weight: 600; font-size: 14px; margin-right: 16px;">
        ${s.number}
      </div>
      <span style="font-family: ${fonts.header}; font-weight: 500; font-size: 16px; color: ${brandColors.stoneGray};">
        ${s.title}
      </span>
    </a>
  `).join('');

  return `
    <div style="page-break-after: always; padding: 48px;">
      <h2 style="font-size: 28px; margin-bottom: 32px; color: ${brandColors.trailCanopy};">
        Table of Contents
      </h2>
      ${sectionItems}
    </div>
  `;
}

function generateLegalDisclaimer(): string {
  return `
    <div class="page-break" style="padding: 48px;">
      <h2 style="font-size: 24px; margin-bottom: 24px; color: ${brandColors.trailCanopy};">
        Important Disclaimer & Liability Notice
      </h2>

      <div style="font-size: 12px; line-height: 1.7; color: ${brandColors.stoneGray};">
        <p style="margin-bottom: 16px;">
          <strong style="color: ${brandColors.trailCanopy};">FOR INFORMATIONAL PURPOSES ONLY</strong><br/>
          This race execution guide is provided by Paceline for informational and planning purposes only.
          The recommendations, pacing strategies, nutrition plans, and other content contained in this guide
          are based on general ultramarathon principles and the information you provided in your questionnaire.
        </p>

        <p style="margin-bottom: 16px;">
          <strong style="color: ${brandColors.trailCanopy};">NOT MEDICAL OR PROFESSIONAL ADVICE</strong><br/>
          This guide does not constitute medical advice, professional coaching advice, or a substitute for
          consultation with qualified healthcare providers, coaches, or race officials. Always consult with
          your physician before undertaking any ultramarathon or endurance event, particularly if you have
          any pre-existing health conditions.
        </p>

        <p style="margin-bottom: 16px;">
          <strong style="color: ${brandColors.trailCanopy};">ASSUMPTION OF RISK</strong><br/>
          Ultramarathon running is an inherently dangerous activity that carries significant risks including,
          but not limited to: serious injury, permanent disability, and death. By using this guide, you
          acknowledge that you understand these risks and voluntarily assume all responsibility for your
          participation in the race.
        </p>

        <p style="margin-bottom: 16px;">
          <strong style="color: ${brandColors.trailCanopy};">NO WARRANTIES</strong><br/>
          Paceline makes no warranties, express or implied, regarding the accuracy, completeness, reliability,
          or suitability of the information in this guide. Race conditions, weather, course changes, and
          individual physical responses can vary significantly from predictions. Cutoff times, aid station
          services, and course details should be verified with official race communications.
        </p>

        <p style="margin-bottom: 16px;">
          <strong style="color: ${brandColors.trailCanopy};">LIMITATION OF LIABILITY</strong><br/>
          To the fullest extent permitted by law, Paceline, its owners, employees, and affiliates shall not
          be liable for any direct, indirect, incidental, consequential, or punitive damages arising from
          your use of this guide or participation in any race. This includes, without limitation, damages
          for personal injury, property damage, lost race entry fees, or any other losses.
        </p>

        <p style="margin-bottom: 16px;">
          <strong style="color: ${brandColors.trailCanopy};">YOUR RESPONSIBILITY</strong><br/>
          You are solely responsible for: verifying all information with official race sources; making
          real-time decisions based on actual conditions; knowing and following all race rules; listening
          to your body and stopping if necessary; and carrying required safety gear. Always prioritize
          your safety over finishing the race.
        </p>

        <p style="margin-bottom: 16px;">
          <strong style="color: ${brandColors.trailCanopy};">INDEMNIFICATION</strong><br/>
          You agree to indemnify and hold harmless Paceline and its affiliates from any claims, damages,
          or expenses arising from your use of this guide or participation in any race.
        </p>

        <p style="margin-bottom: 16px; font-style: italic;">
          By using this guide, you acknowledge that you have read, understood, and agree to be bound by
          this disclaimer and limitation of liability.
        </p>

        <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 11px; color: ${brandColors.stoneGray};">
            © ${new Date().getFullYear()} Paceline. All rights reserved.<br/>
            Questions? Contact us at support@paceline.run
          </p>
        </div>
      </div>
    </div>
  `;
}

function generateGuideHTML(guideData: GuideData, questionnaire: QuestionnaireData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${questionnaire.raceName} - Race Guide</title>
      <style>
        ${globalStyles}
      </style>
    </head>
    <body>
      ${generateCoverPage(questionnaire)}
      ${generateTableOfContents()}
      <div id="race-overview">${generateRaceOverviewSection(guideData.raceOverview)}</div>
      <div id="pacing-strategy">${generatePacingSection(guideData.pacingStrategy)}</div>
      <div id="cutoff-management">${generateCutoffsSection(guideData.cutoffManagement)}</div>
      <div id="crew-logistics">${generateCrewSection(guideData.crewLogistics)}</div>
      <div id="drop-bag-strategy">${generateDropBagsSection(guideData.dropBagStrategy)}</div>
      <div id="nutrition-timeline">${generateNutritionSection(guideData.nutritionTimeline)}</div>
      <div id="contingency-protocols">${generateContingenciesSection(guideData.contingencyProtocols)}</div>
      <div id="mental-strategy">${generateMentalSection(guideData.mentalStrategy)}</div>
      ${generateLegalDisclaimer()}
    </body>
    </html>
  `;
}

export async function generateGuidePDF(
  guideData: GuideData,
  questionnaire: QuestionnaireData
): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    const html = generateGuideHTML(guideData, questionnaire);

    await page.setContent(html, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    const pdfBuffer = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '0.75in',
        right: '0.5in',
        bottom: '0.75in',
        left: '0.5in'
      },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="font-size: 10px; text-align: center; width: 100%; color: ${brandColors.stoneGray}; font-family: ${fonts.header};">
          <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `,
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
