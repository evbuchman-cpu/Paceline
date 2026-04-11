#!/bin/bash

# Add POLAR_ACCESS_TOKEN to all Preview branches in Vercel
# This script uses the Vercel API directly to bypass CLI limitations

VERCEL_TOKEN=$(npx vercel whoami --token 2>&1 | grep -o 'token.*' | cut -d' ' -f2)
PROJECT_ID="paceline"
ENV_NAME="POLAR_ACCESS_TOKEN"
ENV_VALUE="polar_oat_hC2PdE1h5NVkXnCJ45qfFybwgOuaiM6XmQGbf48TtE8"

echo "Adding $ENV_NAME to Preview environment..."

# Note: For Preview without specific branch, we need to use Vercel dashboard or API
# This is a workaround - we'll use the CLI with forced input

echo "Please use the Vercel dashboard to add this variable to Preview:"
echo "1. Go to https://vercel.com/dashboard"
echo "2. Select 'Paceline' project"
echo "3. Go to Settings → Environment Variables"
echo "4. Add POLAR_ACCESS_TOKEN with value: $ENV_VALUE"
echo "5. Check 'Preview' environment"
echo "6. Click Save"
