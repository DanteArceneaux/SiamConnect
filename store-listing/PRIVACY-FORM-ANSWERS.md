# 🔒 Chrome Web Store Privacy Form - Complete Answers

Copy and paste these answers into the Privacy form:

---

## 1. Single Purpose Description (1,000 characters max)

```
SiamConnect provides essential tools for Thai expats living in the USA, including real-time currency conversion (USD to THB), Buddhist calendar with Wan Phra dates, dual weather comparison between US and Thai cities, air quality monitoring, Thai food finder, translation tools, remittance rate comparison, and Thai language learning features. All features are designed to help Thai expats stay connected to their home country while navigating life in America.
```

---

## 2. Permission Justifications (1,000 characters max each)

### storage justification*
```
The storage permission is used to save user preferences locally on their device, including their selected Thai hometown, preferred zoom level, card arrangement order, and currency rate alert settings. No data is transmitted to external servers - all settings are stored locally using Chrome's built-in storage API.
```

### alarms justification*
```
The alarms permission is used to schedule periodic checks of exchange rates so users can receive notifications when USD to THB rates reach their target threshold. This allows users to be alerted at optimal times to send money home.
```

### notifications justification*
```
The notifications permission is used to alert users when exchange rates hit their user-set target threshold. For example, if a user sets an alert for when 1 USD exceeds 36 THB, they will receive a browser notification. This helps users make timely decisions about remittances.
```

### activeTab justification*
```
The activeTab permission is required for the "Translate Page" feature, which allows users to translate the current webpage from English to Thai (or vice versa) using Google Translate. This permission is only used when the user explicitly clicks the "Translate Page" button.
```

### tabs justification*
```
The tabs permission is used to get the URL of the current active tab when users click the "Translate Page" button. This URL is then passed to Google Translate to translate the entire webpage. The permission is only accessed when the user explicitly requests page translation.
```

### scripting justification*
```
The scripting permission is used to inject the hover dictionary functionality into webpages. When users enable "Hover Dict" mode, they can double-click any English word on a webpage to see its Thai translation in a tooltip. This is only active when explicitly enabled by the user.
```

### Host permission justification*
```
Host permissions are required for:
1. ExchangeRate-API (api.exchangerate-api.com) - To fetch real-time USD to THB exchange rates
2. OpenWeatherMap API (api.openweathermap.org) - To fetch weather data for US and Thai cities
3. WAQI API (api.waqi.info) - To fetch air quality (PM2.5) data
4. Google Translate (translate.googleapis.com, translate.google.com) - To provide translation features
5. <all_urls> - Required for the content script that enables the hover dictionary feature on any webpage

No user data is collected or transmitted through these API calls. All API requests are made directly from the user's browser, and responses are only used to display information in the extension popup.
```

---

## 3. Remote Code Usage

**Select:** ✅ **"No, I am not using remote code"**

**Explanation:**
- All JavaScript code is bundled and included in the extension package
- No external `<script>` tags loading remote files
- No `eval()` or dynamic code execution
- API calls fetch data only, they don't execute code

---

## 4. Data Usage

**Check:** ✅ **None of the above** (leave all checkboxes unchecked)

**Explanation:**
- SiamConnect does NOT collect any personal data
- No account or registration required
- All settings stored locally on user's device
- No analytics or tracking
- API calls are made directly from user's browser (no data sent to our servers)

---

## 📝 Quick Copy-Paste Checklist

- [ ] Single Purpose: Copy the description above
- [ ] storage: Copy justification
- [ ] alarms: Copy justification  
- [ ] notifications: Copy justification
- [ ] activeTab: Copy justification
- [ ] tabs: Copy justification
- [ ] scripting: Copy justification
- [ ] Host permission: Copy justification
- [ ] Remote Code: Select "No"
- [ ] Data Usage: Leave all unchecked

---

**Note:** The warning about "in-depth review" is normal when using host permissions. Your extension will still be approved, it just may take 1-3 business days instead of same-day approval.



