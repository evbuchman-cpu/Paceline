import { readFileSync } from 'fs';
import { uploadToR2 } from '../lib/r2-storage';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

async function uploadLeadMagnet() {
  try {
    console.log('📄 Reading PDF file...');
    const pdfBuffer = readFileSync('public/paceline-race-day-readiness-checklist-v4.pdf');

    console.log(`✓ PDF loaded (${(pdfBuffer.length / 1024).toFixed(2)} KB)`);

    console.log('\n☁️  Uploading to Cloudflare R2...');
    const publicUrl = await uploadToR2(
      pdfBuffer,
      'lead-magnets/race-day-readiness-checklist.pdf',
      'application/pdf'
    );

    console.log('✓ Upload successful!');
    console.log('\n📋 Public URL:');
    console.log(publicUrl);
    console.log('\n💡 Add this to your .env.local file:');
    console.log(`LEAD_MAGNET_PDF_URL=${publicUrl}`);
    console.log('\n✓ Done! Remember to also update .env.example');

  } catch (error) {
    console.error('❌ Upload failed:', error);
    process.exit(1);
  }
}

uploadLeadMagnet();
