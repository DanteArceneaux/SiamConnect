# SiamConnect 🇹🇭

The ultimate Chrome extension for Thai expats living in the USA. Stay connected to home with real-time currency rates, weather comparisons, time zone displays, and essential tools for navigating life between two cultures.

![SiamConnect Preview](preview.png)

## Features

### 🏠 Core Features

- **Smart Weather Display** - Side-by-side view of your US city and Thai hometown with real-time conditions
- **PM2.5 Air Quality** - Track Bangkok's air quality (a major concern for Thais)
- **Time Zone Bridge** - Visual "Is it okay to call home?" indicator
- **Currency Converter** - Real-time THB ↔ USD with remittance calculator
- **Rate Alerts** - Get notified when exchange rates hit your target

### 🛠️ Tools

- **⌨️ Keyboard Converter** - Fix mistyped text when you forgot to switch keyboards (g-jo → เกม)
- **📏 Size Converter** - Convert US clothing sizes to Asian standards
- **🍳 Kitchen Helper** - Fahrenheit ↔ Celsius, pounds ↔ kilograms
- **🥬 Ingredient Substitutes** - Find alternatives for Thai ingredients in the US

### 📅 Calendar & Culture

- **วันพระ Calendar** - Buddhist holy days (Wan Phra) based on lunar cycles
- **Holiday Tracker** - Thai holidays with US overlap highlighting
- **Embassy News** - Latest updates from Royal Thai Embassy & Consulates

### 🌐 Translation

- **Page Translation** - One-click translate any webpage to Thai
- **Hover Dictionary** - Double-click any English word to see Thai translation

## Installation

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Load in Chrome

1. Run `npm run build` to create the dist folder
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top right)
4. Click **Load unpacked**
5. Select the `dist` folder from this project

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite 7
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Extension**: Chrome Manifest V3

## Project Structure

```
siamconnect/
├── public/
│   ├── manifest.json      # Chrome extension manifest
│   ├── background.js      # Service worker
│   ├── content.js         # Content script for translation
│   └── icons/             # Extension icons
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Weather & time zones
│   │   ├── CurrencyConverter.tsx
│   │   ├── ToolsGrid.tsx
│   │   ├── KeyboardConverter.tsx
│   │   ├── SizeConverter.tsx
│   │   ├── BuddhistCalendar.tsx
│   │   ├── EmbassyFeed.tsx
│   │   └── TranslateToggle.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css          # Tailwind + custom Thai theme
└── scripts/
    ├── copy-extension.js  # Build helper
    └── generate-icons.js  # Icon generator
```

## APIs Used

- **Currency**: [ExchangeRate-API](https://exchangerate-api.com)
- **Translation**: Google Translate (unofficial)
- Weather & AQI: Configurable (OpenWeatherMap, WAQI)

## Customization

### Change Hometown
Edit the default hometown in `src/components/Header.tsx` or add settings storage.

### Add More Thai Holidays
Edit the `thaiHolidays2024` array in `src/components/BuddhistCalendar.tsx`.

### Customize Theme
The Thai-inspired color palette is defined in `src/index.css` under `@theme`.

## Creating Production Icons

The placeholder icons are 1x1 pixels. For production:

1. Open `public/icons/icon.svg` in Figma, Sketch, or Illustrator
2. Export as PNG at sizes: 16x16, 32x32, 48x48, 128x128
3. Save to `public/icons/` as `icon16.png`, `icon32.png`, etc.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - Feel free to use and modify for your own projects.

---

Made with ❤️ for the Thai community abroad

สร้างด้วยความรักเพื่อชุมชนไทยในต่างแดน 🙏


