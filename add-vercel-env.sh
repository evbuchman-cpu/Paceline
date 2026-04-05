#!/bin/bash

# ⚠️ SANDBOX ONLY - These are Polar.sh sandbox/test product IDs
# For production deployment, use production product IDs from https://polar.sh
# This script syncs public env vars to Vercel preview environment

echo "Adding environment variables to Vercel preview environment..."

# Read values from .env.local
source .env.local

# Add each variable to preview environment
echo "63dd3aab-5b52-4b42-97bf-b85f0864c094" | npx vercel env add NEXT_PUBLIC_ESSENTIAL_TIER preview
echo "Paceline-Essential" | npx vercel env add NEXT_PUBLIC_ESSENTIAL_SLUG preview
echo "0d63738b-cb55-4436-878b-110cb3eac615" | npx vercel env add NEXT_PUBLIC_CUSTOM_TIER preview
echo "Paceline-Custom" | npx vercel env add NEXT_PUBLIC_CUSTOM_SLUG preview
echo "8a23f2ac-c9bf-4453-9c26-958857da330b" | npx vercel env add NEXT_PUBLIC_ULTRA_BUNDLE_TIER preview
echo "Paceline-Ultra-Bundle" | npx vercel env add NEXT_PUBLIC_ULTRA_BUNDLE_SLUG preview
echo "https://paceline.vercel.app" | npx vercel env add NEXT_PUBLIC_APP_URL preview

echo "Done! All environment variables added to preview environment."
