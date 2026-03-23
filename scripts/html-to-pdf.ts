import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync } from 'fs';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { config } from 'dotenv';

config({ path: '.env.local' });

async function convertHtmlToPdf() {
  console.log('📄 Reading HTML file...');
  const htmlContent = readFileSync('public/paceline-checklist-v4.html', 'utf-8');

  console.log('🚀 Launching Puppeteer...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log('📝 Loading HTML content...');
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  console.log('📄 Generating PDF...');
  const pdfBuffer = await page.pdf({
    format: 'Letter',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();

  // Save locally
  console.log('💾 Saving PDF locally...');
  writeFileSync('public/paceline-race-day-readiness-checklist-v5.pdf', pdfBuffer);
  console.log('✓ Saved to public/paceline-race-day-readiness-checklist-v5.pdf');

  // Upload to R2
  console.log('\n☁️  Uploading to Cloudflare R2...');

  const r2Client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });

  await r2Client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: "lead-magnets/race-day-readiness-checklist.pdf",
      Body: pdfBuffer,
      ContentType: "application/pdf",
    })
  );

  const publicUrl = `https://${process.env.R2_PUBLIC_DOMAIN}/lead-magnets/race-day-readiness-checklist.pdf`;

  console.log('✓ Upload successful!');
  console.log('\n📋 Public URL:');
  console.log(publicUrl);
  console.log('\n✓ PDF has been updated! The same URL will now serve the new version.');
  console.log('\n💡 No need to update .env.local - the URL stays the same!');
}

convertHtmlToPdf().catch(console.error);
