# 🚀 SiamConnect Chrome Web Store Submission Guide

## 📦 What's in This Folder

```
store-listing/
├── description.txt          # Store listing text (copy/paste this)
├── privacy-policy.html      # Host this on GitHub Pages or your website
├── promo-tile-440x280.html  # Open in browser, screenshot at 440x280
├── screenshot-template-1280x800.html  # Template for store screenshots
└── SUBMISSION-GUIDE.md      # This file
```

---

## ✅ Pre-Submission Checklist

### 1. Create Developer Account
- [ ] Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
- [ ] Sign in with Google account
- [ ] Pay $5 registration fee
- [ ] Agree to developer terms

### 2. Host Privacy Policy
- [ ] Create a GitHub repository (or use GitHub Pages)
- [ ] Upload `privacy-policy.html`
- [ ] Get the public URL (e.g., `https://yourusername.github.io/siamconnect/privacy-policy.html`)

### 3. Prepare Images

#### Promotional Tile (Required: 440x280)
1. Open `promo-tile-440x280.html` in Chrome
2. Press F12 → Device Toolbar → Set dimensions to 440x280
3. Take screenshot (Ctrl+Shift+P → "Capture screenshot")
4. Save as `promo-tile.png`

#### Screenshots (Required: 1-5 images, 1280x800 or 640x400)
Take screenshots of the extension showing:
1. **Home screen** - Weather, currency converter, tools grid
2. **Buddhist Calendar** - Wan Phra dates and holidays
3. **Festival Countdown** - Songkran, Loy Krathong countdowns
4. **Thai Food Finder** - Search and popular dishes
5. **Remittance Comparison** - Wise, Remitly rates

### 4. Create Extension Package
```powershell
# Run in project root
npm run build

# Create ZIP from dist folder contents (not the folder itself)
cd dist
# Select all files → Right-click → Send to → Compressed folder
# Name it: siamconnect-v1.0.0.zip
```

---

## 📝 Store Listing Information

### Basic Information
| Field | Value |
|-------|-------|
| **Name** | SiamConnect |
| **Summary** | Essential tools for Thai expats: currency converter, Buddhist calendar, weather comparison, Thai food finder & translation tools. |
| **Category** | Productivity |
| **Language** | English |

### Description
Copy the **DETAILED DESCRIPTION** from `description.txt`

### Additional Details
| Field | Value |
|-------|-------|
| **Website** | (Your website or GitHub repo URL) |
| **Support URL** | (Your email or GitHub issues URL) |
| **Privacy Policy URL** | (Your hosted privacy policy URL) |

---

## 🔐 Permissions Justification

When asked to justify permissions, use these explanations:

| Permission | Justification |
|------------|---------------|
| `storage` | Stores user preferences locally (hometown selection, zoom level, card arrangement, rate alerts) |
| `activeTab` | Required for the "Translate Page" feature to access the current webpage |
| `tabs` | Gets the URL of the current page for translation functionality |
| `scripting` | Injects the hover dictionary tooltip functionality into webpages |
| `alarms` | Schedules periodic exchange rate checks for user-set price alerts |
| `notifications` | Sends alerts when exchange rates hit user's target threshold |

---

## 🔄 Future Updates

### To publish an update:

1. **Increment version** in `public/manifest.json`:
   ```json
   "version": "1.0.0" → "1.0.1"
   ```

2. **Rebuild**:
   ```powershell
   npm run build
   ```

3. **Create new ZIP** from `dist/` contents

4. **Upload to Developer Dashboard**:
   - Go to your extension
   - Click "Package" tab
   - Upload new package
   - Submit for review

---

## 📊 Version History Template

Keep track of changes for your store listing:

### Version 1.0.0 (Initial Release)
- 💰 Currency converter with USD/THB rates
- 🌡️ Dual weather display (US + Thailand)
- 📅 Buddhist calendar with Wan Phra dates
- 🎉 Festival countdown (Songkran, Loy Krathong)
- 🍜 Thai food finder
- 📚 Thai word of the day
- 💸 Remittance rate comparison
- ⌨️ Keyboard fix (Thai ↔ English)
- 📏 Size converter
- 🌐 Translation tools
- 🏛️ Embassy news feed
- ⚙️ Customizable settings

---

## 🆘 Common Issues & Solutions

### Rejection: "Missing privacy policy"
→ Host `privacy-policy.html` and provide the URL

### Rejection: "Excessive permissions"
→ Remove any unused permissions from manifest.json

### Rejection: "Broken functionality"
→ Test in a fresh Chrome profile with no other extensions

### Slow review
→ First submissions take 1-3 days. Updates are usually faster.

---

## 📧 Contact Template

For user support, create a canned response:

```
Thank you for using SiamConnect! 🇹🇭

If you're experiencing issues:
1. Try refreshing the page and reopening the extension
2. Check if you have the latest version installed
3. Clear Chrome cache and reload

Still having problems? Please describe:
- What you were trying to do
- What happened instead
- Your Chrome version

ขอบคุณครับ/ค่ะ!
The SiamConnect Team
```

---

## 🎉 You're Ready!

Once you have:
- [ ] Developer account set up
- [ ] Privacy policy hosted
- [ ] Promotional images ready
- [ ] Screenshots captured
- [ ] ZIP package created

Go to the Developer Dashboard and submit! 🚀

---

*Made with ❤️ for the Thai expat community*

