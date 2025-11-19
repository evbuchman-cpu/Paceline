const ngrok = require('ngrok');

(async function() {
  try {
    console.log('🚀 Starting ngrok tunnel to localhost:3000...\n');

    const url = await ngrok.connect({
      addr: 3000,
      region: 'us',
    });

    console.log('✅ ngrok tunnel started successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📡 Public URL: ${url}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('🔧 Configuration Steps:\n');
    console.log('1. Make sure your Next.js dev server is running on port 3000');
    console.log('   Run: npm run dev\n');

    console.log('2. Go to Polar.sh webhook settings:');
    console.log('   https://polar.sh/dashboard/your-org/settings/webhooks\n');

    console.log('3. Update webhook endpoint URL to:');
    console.log(`   ${url}/api/auth/webhook\n`);

    console.log('4. Test by making a purchase!\n');

    console.log('⚠️  Keep this process running - Press Ctrl+C to stop the tunnel\n');

    // Keep the process alive
    process.on('SIGINT', async () => {
      console.log('\n👋 Closing ngrok tunnel...');
      await ngrok.kill();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Error starting ngrok:', error);
    process.exit(1);
  }
})();
