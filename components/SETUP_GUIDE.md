# KodaCars Website Setup Guide
## Complete Step-by-Step Instructions for Deployment

This guide will walk you through setting up your KodaCars website with all the new features: Google Analytics tracking, form submissions, PDF downloads, and reCAPTCHA protection.

---

## 📋 What We Added

We've added four major features to your website:

1. **Google Analytics 4 (GA4) Tracking** - Track visitor behavior and form submissions
2. **Form Submission System** - Automatically send emails to sales@kodacars.com
3. **PDF Whitepaper Downloads** - Let users download whitepapers after filling forms
4. **reCAPTCHA Protection** - Prevent spam on your contact form

---

## 🚀 PART 1: Setting Up Your Development Environment

### Step 1: Install Cursor (Already Done ✓)

You mentioned you already have Cursor installed. Great! Cursor is a code editor that will let you test your website locally.

### Step 2: Open Your Project in Cursor

1. Open Cursor
2. Click "File" → "Open Folder"
3. Create a new folder on your Mac called "kodacars-website"
4. Select that folder

### Step 3: Copy All Project Files

Copy all the files I've provided into your "kodacars-website" folder. The structure should look like this:

```
kodacars-website/
├── index.html
├── index.tsx
├── App.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ClientsSection.tsx
│   ├── SolutionsGrid.tsx
│   ├── BenefitsSection.tsx
│   ├── AiPlatformSection.tsx
│   ├── HowItWorks.tsx
│   ├── CtaSection.tsx
│   ├── Footer.tsx
│   ├── ContactPage.tsx
│   ├── CustomerLoyaltyPage.tsx
│   ├── LargeVehiclePage.tsx
│   ├── ReputationManagementPage.tsx
│   ├── SelfCheckInPage.tsx
│   ├── ShuttleServicesPage.tsx
│   ├── NearAirportPage.tsx
│   ├── HotelParkingPage.tsx
│   ├── NewsSection.tsx
│   └── TeamSection.tsx
├── services/
│   ├── emailService.ts
│   └── geminiService.ts
└── utils/
    └── pdfUtils.ts
```

---

## 🔧 PART 2: Getting Your API Keys and Configuration

### A. Google Analytics 4 (GA4)

**What it does:** Tracks how many people visit your website and what they do on it.

**How to get it:**

1. Go to https://analytics.google.com
2. Sign in with your Google account
3. Click "Start measuring"
4. Enter "KodaCars" as property name
5. Complete the setup wizard
6. You'll receive a **Measurement ID** that looks like: `G-XXXXXXXXXX`

**Where to use it:**

Open `index.html` and find these two lines:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```
and
```javascript
gtag('config', 'G-XXXXXXXXXX');
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

---

### B. Web3Forms (For Email Submissions)

**What it does:** Sends form submissions to your email (sales@kodacars.com) without needing a backend server.

**How to get it:**

1. Go to https://web3forms.com
2. Click "Get Started - It's Free"
3. Enter your email: sales@kodacars.com
4. Check your email for the **Access Key**
5. The access key looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

**Where to use it:**

Open `services/emailService.ts` and find this line:
```typescript
const ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
```

Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual access key from Web3Forms.

---

### C. Google reCAPTCHA

**What it does:** Protects your contact form from spam and bots.

**How to get it:**

1. Go to https://www.google.com/recaptcha/admin
2. Sign in with your Google account
3. Click the "+" button to register a new site
4. Fill in:
   - **Label:** KodaCars Website
   - **reCAPTCHA type:** Select "reCAPTCHA v3"
   - **Domains:** Add your domain (e.g., kodacars.com)
   - Accept the terms
5. Click "Submit"
6. You'll receive two keys:
   - **Site Key** (starts with 6Le...)
   - **Secret Key** (keep this private)

**Where to use it:**

**In `index.html`**, find this line:
```html
<script src="https://www.google.com/recaptcha/api.js?render=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"></script>
```
Replace `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI` with your **Site Key**.

**In `services/emailService.ts`**, find this line:
```typescript
const token = await window.grecaptcha.execute('6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', {
```
Replace the site key here too.

---

### D. PDF Whitepaper Files

**What you need:** Upload your 5 whitepaper PDF files somewhere online.

**Best options:**

1. **Google Drive** (Recommended for you):
   - Upload each PDF to Google Drive
   - Right-click → "Get link" → "Anyone with the link can view"
   - Copy the sharing link
   
2. **Dropbox**:
   - Upload PDFs
   - Create sharing links
   
3. **Your web hosting service** (if you have one)

**Where to use the PDF links:**

Open `utils/pdfUtils.ts` and update each URL:

```typescript
export const WHITEPAPERS: Record<string, WhitepaperPDF> = {
  'customer-loyalty': {
    id: 'customer-loyalty',
    title: 'Customer Loyalty: Building Customer Loyalty in Off-Airport Parking',
    filename: 'KodaCars-Customer-Loyalty-Whitepaper.pdf',
    url: 'PASTE_YOUR_GOOGLE_DRIVE_LINK_HERE', // ← Update this
    size: '3.1 MB'
  },
  'large-vehicle': {
    id: 'large-vehicle',
    title: 'Large Vehicle: Capturing Lost Revenue from Large Vehicles',
    filename: 'KodaCars-Large-Vehicle-Whitepaper.pdf',
    url: 'PASTE_YOUR_GOOGLE_DRIVE_LINK_HERE', // ← Update this
    size: '2.6 MB'
  },
  // ... and so on for each whitepaper
};
```

**Important:** If you're using Google Drive links, they look like:
```
https://drive.google.com/file/d/1ABC123XYZ/view?usp=sharing
```

You need to convert them to direct download links:
```
https://drive.google.com/uc?export=download&id=1ABC123XYZ
```

---

## 🧪 PART 3: Testing Locally in Cursor

Now let's test everything on your Mac before going live.

### Step 1: Open Terminal in Cursor

In Cursor, press:
- **Mac:** `Control + ~` (tilde key)
- Or click "Terminal" → "New Terminal" from the menu

### Step 2: Install Dependencies

In the terminal, type:
```bash
npm install
```

Press Enter and wait. This downloads all the necessary code libraries your website needs.

### Step 3: Start the Development Server

In the terminal, type:
```bash
npm run dev
```

Press Enter. You should see something like:
```
VITE v6.2.0  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: http://192.168.1.x:3000/
```

### Step 4: Open Your Website

1. Hold **Command** and click on `http://localhost:3000/`
2. Your website will open in your default browser
3. You can now browse around and test everything!

### Step 5: Test Each Feature

**Test the Contact Form:**
1. Go to the Contact page (click "Contact Sales" in navigation)
2. Fill out the form with test data
3. Submit it
4. Check if you receive an email at sales@kodacars.com

**Test Whitepaper Downloads:**
1. Click on "Insights" in the navigation
2. Click on any whitepaper (e.g., "Customer Loyalty")
3. Fill out the form
4. Submit it
5. Click the download button
6. Check if you receive an email AND if the PDF downloads

**Test Google Analytics:**
1. Go to your Google Analytics dashboard
2. Click "Realtime" in the left sidebar
3. You should see yourself as an active user
4. Navigate around your site and watch the realtime data

---

## 🌐 PART 4: Deploying to Your Domain

Once everything works locally, you're ready to deploy to kodacars.com.

### Option A: Using Your Current Hosting (Recommended)

Since your site is already live at https://kodacars-587811268102.us-west1.run.app/, you're likely using Google Cloud Run.

**Steps to deploy:**

1. In Cursor terminal, build your production files:
```bash
npm run build
```

2. This creates a `dist` folder with all your website files

3. Deploy these files using your current Google Cloud deployment process

If you need help with the Google Cloud deployment specifically, I can provide detailed instructions for that too.

### Option B: Using Netlify (Easiest for Beginners)

Netlify is free and very easy to use:

1. Go to https://netlify.com
2. Sign up with your email
3. Click "Add new site" → "Import an existing project"
4. Connect to your GitHub account (you'll need to upload your code to GitHub first)
5. Netlify will automatically detect it's a Vite project
6. Click "Deploy"
7. Netlify gives you a free URL (e.g., kodacars.netlify.app)
8. Later, you can connect your custom domain (kodacars.com)

---

## ✅ PART 5: Checklist Before Going Live

Before you deploy to production, make sure:

- [ ] You've replaced all placeholder API keys with real ones
- [ ] Google Analytics Measurement ID is correct
- [ ] Web3Forms Access Key is set
- [ ] reCAPTCHA Site Key is set in TWO places
- [ ] All 5 PDF URLs are updated with real links
- [ ] You've tested the contact form and received the email
- [ ] You've tested each whitepaper download
- [ ] All images are loading correctly
- [ ] The site works on mobile (test on your phone)

---

## 🆘 Troubleshooting Common Issues

### "I'm not receiving form submission emails"

**Check:**
1. Is the Web3Forms access key correct in `emailService.ts`?
2. Did you verify your email with Web3Forms?
3. Check your spam folder
4. Try using a test form at web3forms.com to verify your access key works

### "PDFs aren't downloading"

**Check:**
1. Are your PDF URLs correct in `pdfUtils.ts`?
2. If using Google Drive, did you make the files publicly accessible?
3. Did you convert Google Drive links to direct download format?
4. Try opening one of your PDF URLs directly in a browser

### "reCAPTCHA badge not showing"

**Check:**
1. Is the reCAPTCHA script loading in `index.html`?
2. Is your site key correct (it should start with 6Le...)?
3. Did you add your domain in the reCAPTCHA admin console?
4. Try opening the browser console (F12) and look for any errors

### "Google Analytics not tracking"

**Check:**
1. Did you replace BOTH instances of G-XXXXXXXXXX in index.html?
2. Wait 24-48 hours for data to appear (realtime should work immediately)
3. Make sure you're checking the correct GA4 property
4. Check if you have ad blockers that might block GA

---

## 📞 Need More Help?

If you get stuck at any point:

1. **Check the browser console:**
   - Open your website
   - Press F12 (or right-click → "Inspect")
   - Click on "Console" tab
   - Look for any red error messages
   - Send me a screenshot of any errors

2. **Test each file individually:**
   - Make sure each file is in the correct folder
   - Check for typos in file names
   - Verify all imports at the top of each file

3. **Start fresh:**
   - Delete the `node_modules` folder
   - Run `npm install` again
   - Run `npm run dev` again

---

## 🎉 You're All Set!

Once you've completed all these steps:
1. Your website will be tracking visitors with Google Analytics
2. Contact forms will send emails to sales@kodacars.com
3. Whitepaper forms will send notifications and trigger PDF downloads
4. Your contact form will be protected from spam with reCAPTCHA

The design remains exactly as you created it - we've only added the functionality you requested!

---

## Quick Reference: Files You Need to Edit

Here's a quick summary of what needs your attention:

**1. index.html** → Add GA4 ID and reCAPTCHA Site Key
**2. services/emailService.ts** → Add Web3Forms Access Key and reCAPTCHA Site Key
**3. utils/pdfUtils.ts** → Add PDF URLs for all 5 whitepapers

That's it! Everything else is ready to go.
