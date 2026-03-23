# Lead Magnet Implementation - Setup Guide

## ✅ What's Been Completed

All 7 tasks have been successfully implemented:

### 1. ✅ PDF Upload Script Created
- Created `scripts/upload-lead-magnet.ts` to upload the PDF to Cloudflare R2
- Updated `.env.example` with `LEAD_MAGNET_PDF_URL` placeholder

### 2. ✅ Database Schema Updated
- Added `lead` table to `db/schema.ts` with fields:
  - `id` (text, primary key)
  - `email` (text, unique, not null)
  - `firstName` (text, nullable)
  - `source` (text, default 'checklist')
  - `createdAt` (timestamp, default now)
- Migration generated and pushed to database

### 3. ✅ API Route Created
- Created `app/api/lead-magnet/route.ts`
- Validates email with Zod
- Upserts leads (handles duplicates gracefully)
- Sends email delivery via Resend

### 4. ✅ Email Template Created
- Created `emails/lead-magnet-delivery.tsx`
- Matches existing email template style
- Brand colors: #2C5F4D (green), #C87350 (orange)
- Includes download CTA + secondary pricing CTA
- Added `sendLeadMagnetEmail()` function to `lib/email-sender.ts`

### 5. ✅ Landing Page Section Added
- Created `components/lead-magnet.tsx` (client component)
- Added to landing page between Testimonials and Pricing
- Features:
  - First name (optional) + email (required) inputs
  - Submit button with loading state
  - Success state with checkmark
  - Error handling
  - Background: #F5F1EA (light sandstone)

### 6. ✅ Navigation Updated
- Updated both desktop and mobile nav CTAs
- Changed "Leadmagnet - Update?" to "Get Free Checklist"
- Links to `#lead-magnet` anchor

### 7. ✅ Build Verification
- Build completed successfully (exit code 0)
- No TypeScript errors
- Only minor warnings (unrelated to lead magnet)

---

## 🔧 What You Need to Do to Complete Setup

### Step 1: Configure R2 Credentials (if not already done)

Make sure your `.env.local` has valid R2 credentials:

```bash
CLOUDFLARE_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-r2-access-key-id
R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
R2_BUCKET_NAME=paceline
R2_PUBLIC_DOMAIN=pub-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.r2.dev
```

### Step 2: Upload PDF to R2

Run the upload script:

```bash
npx tsx scripts/upload-lead-magnet.ts
```

This will:
1. Read `public/paceline-race-day-readiness-checklist-v4.pdf`
2. Upload it to R2 at `lead-magnets/race-day-readiness-checklist.pdf`
3. Print the public URL

**Copy the URL and add it to your `.env.local`:**

```bash
LEAD_MAGNET_PDF_URL=https://pub-xxxx.r2.dev/lead-magnets/race-day-readiness-checklist.pdf
```

### Step 3: Configure Resend (if not already done)

Make sure your `.env.local` has valid Resend credentials:

```bash
RESEND_API_KEY=re_your-resend-api-key
RESEND_FROM_EMAIL=onboarding@resend.dev  # or your verified domain
```

### Step 4: Test the Flow

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Visit landing page:**
   ```
   http://localhost:3000
   ```

3. **Test the flow:**
   - Click "Get Free Checklist" in navigation
   - Should scroll to lead magnet section
   - Enter your email (and optionally first name)
   - Click "Get Free Checklist" button
   - Check for success message
   - Check your email inbox for the delivery email
   - Click the download link to verify PDF opens

4. **Test duplicate handling:**
   - Submit the same email again
   - Should still send email (lead already exists in database)

5. **Test validation:**
   - Submit invalid email format
   - Should show error message

---

## 📁 Files Created/Modified

### Created Files:
- `scripts/upload-lead-magnet.ts` - PDF upload script
- `app/api/lead-magnet/route.ts` - API endpoint
- `emails/lead-magnet-delivery.tsx` - Email template
- `components/lead-magnet.tsx` - Landing page component
- `LEAD_MAGNET_SETUP.md` - This file

### Modified Files:
- `db/schema.ts` - Added `lead` table
- `.env.example` - Added `LEAD_MAGNET_PDF_URL`
- `lib/email-sender.ts` - Added `sendLeadMagnetEmail()`
- `app/page.tsx` - Added `<LeadMagnet />` component
- `components/navigation.tsx` - Updated CTA button

### Database Migration:
- `db/migrations/0002_solid_lord_hawal.sql` - Lead table migration

---

## 🎨 Design Specifications

### Colors Used:
- **Trail Canopy Green:** `#2C5F4D` (primary CTA, headings)
- **Summit Light Orange:** `#C87350` (secondary CTA, accents)
- **Sand:** `#F5F1EA` (section background)
- **Charcoal:** `#4A5859` (body text)

### Component Styling:
- Follows existing Tailwind patterns from landing page
- Uses shadcn/ui components (Button, Input)
- Responsive: stacked on mobile, side-by-side on desktop

---

## 🐛 Known Issues / Notes

1. **R2 Upload Script:** Requires valid R2 credentials. If you see "Resolved credential object is not valid", check your `.env.local` R2 config.

2. **Email Delivery:** Make sure `RESEND_FROM_EMAIL` is verified in Resend dashboard. Development mode sends to verified emails only.

3. **PDF URL in Email:** The email template reads `LEAD_MAGNET_PDF_URL` from environment variables. Make sure it's set after running the upload script.

4. **Database:** Lead table is already created and pushed to Neon. No additional migrations needed.

---

## 🧪 Testing Checklist

- [ ] R2 credentials configured in `.env.local`
- [ ] PDF uploaded to R2 successfully
- [ ] `LEAD_MAGNET_PDF_URL` added to `.env.local`
- [ ] Resend credentials configured
- [ ] Dev server starts without errors
- [ ] Navigation CTA scrolls to lead magnet section
- [ ] Form accepts email and optional first name
- [ ] Submit button shows loading state
- [ ] Success message appears after submission
- [ ] Email arrives in inbox
- [ ] Download link in email works
- [ ] PDF opens correctly
- [ ] Duplicate email submission works
- [ ] Invalid email shows error
- [ ] Lead data saved to database

---

## 🚀 Next Steps (Optional Enhancements)

1. **Analytics:** Track lead magnet conversions in PostHog
2. **A/B Testing:** Test different copy/CTAs
3. **Automation:** Add leads to email marketing tool (Resend Audiences, Mailchimp, etc.)
4. **Nurture Sequence:** Create follow-up email drip campaign
5. **Social Proof:** Add testimonials to lead magnet section
6. **Exit Intent:** Show lead magnet popup on exit intent

---

## 📞 Support

If you encounter any issues:
1. Check the build output: `npm run build`
2. Check dev server logs: `npm run dev`
3. Check database connection: Verify `DATABASE_URL` in `.env.local`
4. Check R2 connection: Run upload script with valid credentials
5. Check Resend: Verify API key and sender email

**All tasks completed successfully! 🎉**
