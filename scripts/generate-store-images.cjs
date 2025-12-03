/**
 * Generate Chrome Web Store images with exact dimensions
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const storeListingDir = path.join(__dirname, '..', 'store-listing');
const iconsDir = path.join(__dirname, '..', 'public', 'icons');

async function generateImages() {
  console.log('🎨 Generating Chrome Web Store images...\n');

  // 1. Store Icon (128x128) - create from scratch
  console.log('📦 Creating Store Icon (128x128)...');
  await sharp({
    create: {
      width: 128,
      height: 128,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      {
        input: Buffer.from(`
          <svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="iconGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#fbbf24"/>
                <stop offset="100%" style="stop-color:#d97706"/>
              </linearGradient>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.25"/>
              </filter>
            </defs>
            <rect x="16" y="16" width="96" height="96" rx="20" fill="url(#iconGold)" filter="url(#shadow)"/>
            <text x="64" y="80" font-family="Arial, sans-serif" font-size="52" font-weight="bold" fill="#1a1a2e" text-anchor="middle">ส</text>
          </svg>
        `),
        top: 0,
        left: 0
      }
    ])
    .png()
    .toFile(path.join(storeListingDir, 'store-icon-128x128.png'));
  console.log('   ✅ store-icon-128x128.png');

  // 2. Small Promo Tile (440x280)
  console.log('📦 Creating Small Promo Tile (440x280)...');
  await sharp({
    create: {
      width: 440,
      height: 280,
      channels: 4,
      background: { r: 26, g: 26, b: 46, alpha: 1 }
    }
  })
    .composite([
      {
        input: Buffer.from(`
          <svg width="440" height="280" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#1a1a2e"/>
                <stop offset="50%" style="stop-color:#16213e"/>
                <stop offset="100%" style="stop-color:#2d1b4e"/>
              </linearGradient>
              <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#fbbf24"/>
                <stop offset="100%" style="stop-color:#d97706"/>
              </linearGradient>
            </defs>
            <rect width="440" height="280" fill="url(#bg)"/>
            <circle cx="380" cy="40" r="120" fill="#fbbf24" opacity="0.08"/>
            <circle cx="60" cy="240" r="100" fill="#8b5cf6" opacity="0.06"/>
            
            <!-- Logo -->
            <rect x="140" y="40" width="52" height="52" rx="12" fill="url(#gold)"/>
            <text x="166" y="78" font-family="Arial" font-size="28" font-weight="bold" fill="#1a1a2e" text-anchor="middle">ส</text>
            
            <!-- Title -->
            <text x="200" y="70" font-family="Arial" font-size="28" font-weight="bold" fill="#fbbf24" text-anchor="left">SiamConnect</text>
            
            <!-- Tagline -->
            <text x="220" y="115" font-family="Arial" font-size="13" fill="rgba(255,255,255,0.7)" text-anchor="middle">The Ultimate Companion for Thai Expats</text>
            
            <!-- Features -->
            <rect x="50" y="145" width="80" height="28" rx="14" fill="rgba(255,255,255,0.1)"/>
            <text x="90" y="164" font-family="Arial" font-size="11" fill="white" text-anchor="middle">💰 Currency</text>
            
            <rect x="140" y="145" width="70" height="28" rx="14" fill="rgba(255,255,255,0.1)"/>
            <text x="175" y="164" font-family="Arial" font-size="11" fill="white" text-anchor="middle">📅 วันพระ</text>
            
            <rect x="220" y="145" width="75" height="28" rx="14" fill="rgba(255,255,255,0.1)"/>
            <text x="257" y="164" font-family="Arial" font-size="11" fill="white" text-anchor="middle">🌡️ Weather</text>
            
            <rect x="305" y="145" width="70" height="28" rx="14" fill="rgba(255,255,255,0.1)"/>
            <text x="340" y="164" font-family="Arial" font-size="11" fill="white" text-anchor="middle">🍜 Food</text>
            
            <rect x="130" y="185" width="80" height="28" rx="14" fill="rgba(255,255,255,0.1)"/>
            <text x="170" y="204" font-family="Arial" font-size="11" fill="white" text-anchor="middle">🌐 Translate</text>
            
            <rect x="220" y="185" width="90" height="28" rx="14" fill="rgba(255,255,255,0.1)"/>
            <text x="265" y="204" font-family="Arial" font-size="11" fill="white" text-anchor="middle">💸 Remittance</text>
            
            <!-- Flags -->
            <text x="200" y="255" font-family="Arial" font-size="22" text-anchor="middle">🇹🇭</text>
            <text x="240" y="255" font-family="Arial" font-size="22" text-anchor="middle">🇺🇸</text>
          </svg>
        `),
        top: 0,
        left: 0
      }
    ])
    .png()
    .toFile(path.join(storeListingDir, 'small-promo-440x280.png'));
  console.log('   ✅ small-promo-440x280.png');

  // 3. Screenshot (1280x800)
  console.log('📦 Creating Screenshot (1280x800)...');
  await sharp({
    create: {
      width: 1280,
      height: 800,
      channels: 4,
      background: { r: 26, g: 26, b: 46, alpha: 1 }
    }
  })
    .composite([
      {
        input: Buffer.from(`
          <svg width="1280" height="800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#1a1a2e"/>
                <stop offset="50%" style="stop-color:#16213e"/>
                <stop offset="100%" style="stop-color:#2d1b4e"/>
              </linearGradient>
              <linearGradient id="gold2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#fbbf24"/>
                <stop offset="100%" style="stop-color:#d97706"/>
              </linearGradient>
            </defs>
            <rect width="1280" height="800" fill="url(#bg2)"/>
            
            <!-- Decorative circles -->
            <circle cx="200" cy="100" r="300" fill="#fbbf24" opacity="0.05"/>
            <circle cx="1100" cy="700" r="250" fill="#8b5cf6" opacity="0.04"/>
            
            <!-- Left side text -->
            <rect x="100" y="180" width="200" height="36" rx="18" fill="rgba(251,191,36,0.15)"/>
            <text x="200" y="205" font-family="Arial" font-size="14" fill="#fbbf24" text-anchor="middle">🇹🇭 For Thai Expats 🇺🇸</text>
            
            <text x="100" y="290" font-family="Arial" font-size="52" font-weight="bold" fill="white">Stay Connected</text>
            <text x="100" y="355" font-family="Arial" font-size="52" font-weight="bold" fill="white">to <tspan fill="#fbbf24">Home</tspan></text>
            
            <text x="100" y="420" font-family="Arial" font-size="18" fill="rgba(255,255,255,0.7)">Currency converter, Buddhist calendar, weather</text>
            <text x="100" y="448" font-family="Arial" font-size="18" fill="rgba(255,255,255,0.7)">comparison, Thai food finder, and translation</text>
            <text x="100" y="476" font-family="Arial" font-size="18" fill="rgba(255,255,255,0.7)">tools — all in one Chrome extension.</text>
            
            <!-- Feature tags -->
            <rect x="100" y="520" width="130" height="36" rx="18" fill="rgba(255,255,255,0.08)"/>
            <text x="165" y="544" font-family="Arial" font-size="13" fill="white" text-anchor="middle">💰 Real-time Rates</text>
            
            <rect x="245" y="520" width="130" height="36" rx="18" fill="rgba(255,255,255,0.08)"/>
            <text x="310" y="544" font-family="Arial" font-size="13" fill="white" text-anchor="middle">📅 วันพระ Calendar</text>
            
            <rect x="390" y="520" width="120" height="36" rx="18" fill="rgba(255,255,255,0.08)"/>
            <text x="450" y="544" font-family="Arial" font-size="13" fill="white" text-anchor="middle">🌡️ Dual Weather</text>
            
            <rect x="100" y="570" width="130" height="36" rx="18" fill="rgba(255,255,255,0.08)"/>
            <text x="165" y="594" font-family="Arial" font-size="13" fill="white" text-anchor="middle">🍜 Find Thai Food</text>
            
            <rect x="245" y="570" width="145" height="36" rx="18" fill="rgba(255,255,255,0.08)"/>
            <text x="317" y="594" font-family="Arial" font-size="13" fill="white" text-anchor="middle">💸 Compare Remittance</text>
            
            <rect x="405" y="570" width="105" height="36" rx="18" fill="rgba(255,255,255,0.08)"/>
            <text x="457" y="594" font-family="Arial" font-size="13" fill="white" text-anchor="middle">📚 Learn Thai</text>
            
            <!-- Phone mockup -->
            <rect x="750" y="100" width="380" height="600" rx="32" fill="#0a0a14"/>
            <rect x="762" y="112" width="356" height="576" rx="24" fill="url(#bg2)"/>
            
            <!-- Phone header -->
            <rect x="782" y="132" width="32" height="32" rx="8" fill="url(#gold2)"/>
            <text x="798" y="155" font-family="Arial" font-size="16" font-weight="bold" fill="#1a1a2e" text-anchor="middle">ส</text>
            <text x="825" y="153" font-family="Arial" font-size="14" font-weight="bold" fill="#fbbf24">SiamConnect</text>
            
            <!-- Weather card -->
            <rect x="782" y="180" width="316" height="140" rx="12" fill="rgba(255,255,255,0.05)"/>
            <text x="802" y="205" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.5)">📍 Seattle</text>
            <text x="802" y="240" font-family="Arial" font-size="28" font-weight="bold" fill="white">52°F ☁️</text>
            <text x="802" y="265" font-family="Arial" font-size="14" fill="rgba(255,255,255,0.8)">1:09 PM</text>
            
            <text x="1078" y="205" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.5)" text-anchor="end">กรุงเทพฯ 📍</text>
            <text x="1078" y="240" font-family="Arial" font-size="28" font-weight="bold" fill="white" text-anchor="end">🌙 32°C</text>
            <text x="1078" y="265" font-family="Arial" font-size="14" fill="rgba(255,255,255,0.8)" text-anchor="end">4:09 AM</text>
            
            <text x="940" y="300" font-family="Arial" font-size="12" fill="#f87171" text-anchor="middle">😴 People are sleeping</text>
            
            <!-- Currency card -->
            <rect x="782" y="335" width="316" height="100" rx="12" fill="rgba(255,255,255,0.05)"/>
            <text x="802" y="365" font-family="Arial" font-size="16" fill="rgba(255,255,255,0.6)">$1 =</text>
            <text x="860" y="365" font-family="Arial" font-size="22" font-weight="bold" fill="#fbbf24">฿34.52</text>
            <text x="970" y="365" font-family="Arial" font-size="11" fill="#4ade80">↗ +0.15%</text>
            
            <rect x="802" y="385" width="276" height="36" rx="8" fill="rgba(255,255,255,0.08)"/>
            <text x="822" y="408" font-family="Arial" font-size="11" fill="rgba(255,255,255,0.5)">🇺🇸 USD</text>
            <text x="1058" y="408" font-family="Arial" font-size="14" font-weight="bold" fill="white" text-anchor="end">1,000</text>
            
            <!-- Tools grid -->
            <rect x="782" y="450" width="70" height="70" rx="10" fill="rgba(255,255,255,0.05)"/>
            <text x="817" y="485" font-family="Arial" font-size="20" text-anchor="middle">⌨️</text>
            <text x="817" y="505" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.7)" text-anchor="middle">Fix Text</text>
            
            <rect x="862" y="450" width="70" height="70" rx="10" fill="rgba(255,255,255,0.05)"/>
            <text x="897" y="485" font-family="Arial" font-size="20" text-anchor="middle">📏</text>
            <text x="897" y="505" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.7)" text-anchor="middle">Sizes</text>
            
            <rect x="942" y="450" width="70" height="70" rx="10" fill="rgba(255,255,255,0.05)"/>
            <text x="977" y="485" font-family="Arial" font-size="20" text-anchor="middle">📅</text>
            <text x="977" y="505" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.7)" text-anchor="middle">วันพระ</text>
            
            <rect x="1022" y="450" width="70" height="70" rx="10" fill="rgba(255,255,255,0.05)"/>
            <text x="1057" y="485" font-family="Arial" font-size="20" text-anchor="middle">🏛️</text>
            <text x="1057" y="505" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.7)" text-anchor="middle">Embassy</text>
            
            <rect x="782" y="530" width="70" height="70" rx="10" fill="rgba(255,255,255,0.05)"/>
            <text x="817" y="565" font-family="Arial" font-size="20" text-anchor="middle">🎉</text>
            <text x="817" y="585" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.7)" text-anchor="middle">Festivals</text>
            
            <rect x="862" y="530" width="70" height="70" rx="10" fill="rgba(255,255,255,0.05)"/>
            <text x="897" y="565" font-family="Arial" font-size="20" text-anchor="middle">🍜</text>
            <text x="897" y="585" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.7)" text-anchor="middle">Food</text>
            
            <rect x="942" y="530" width="70" height="70" rx="10" fill="rgba(255,255,255,0.05)"/>
            <text x="977" y="565" font-family="Arial" font-size="20" text-anchor="middle">📚</text>
            <text x="977" y="585" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.7)" text-anchor="middle">Learn</text>
            
            <rect x="1022" y="530" width="70" height="70" rx="10" fill="rgba(255,255,255,0.05)"/>
            <text x="1057" y="565" font-family="Arial" font-size="20" text-anchor="middle">💸</text>
            <text x="1057" y="585" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.7)" text-anchor="middle">Send $</text>
          </svg>
        `),
        top: 0,
        left: 0
      }
    ])
    .png()
    .toFile(path.join(storeListingDir, 'screenshot-1280x800.png'));
  console.log('   ✅ screenshot-1280x800.png');

  // 4. Marquee (1400x560)
  console.log('📦 Creating Marquee (1400x560)...');
  await sharp({
    create: {
      width: 1400,
      height: 560,
      channels: 4,
      background: { r: 26, g: 26, b: 46, alpha: 1 }
    }
  })
    .composite([
      {
        input: Buffer.from(`
          <svg width="1400" height="560" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#1a1a2e"/>
                <stop offset="40%" style="stop-color:#16213e"/>
                <stop offset="100%" style="stop-color:#2d1b4e"/>
              </linearGradient>
              <linearGradient id="gold3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#fbbf24"/>
                <stop offset="100%" style="stop-color:#d97706"/>
              </linearGradient>
            </defs>
            <rect width="1400" height="560" fill="url(#bg3)"/>
            
            <!-- Decorative -->
            <circle cx="1200" cy="100" r="300" fill="#fbbf24" opacity="0.06"/>
            <circle cx="100" cy="500" r="200" fill="#8b5cf6" opacity="0.05"/>
            
            <!-- Left content -->
            <rect x="80" y="100" width="240" height="36" rx="18" fill="rgba(251,191,36,0.12)"/>
            <text x="200" y="125" font-family="Arial" font-size="14" fill="#fbbf24" text-anchor="middle">🇹🇭 Built for Thai Expats in USA 🇺🇸</text>
            
            <text x="80" y="200" font-family="Arial" font-size="52" font-weight="bold" fill="white">Your Bridge</text>
            <text x="80" y="265" font-family="Arial" font-size="52" font-weight="bold" fill="white">Between <tspan fill="#fbbf24">Two Worlds</tspan></text>
            
            <text x="80" y="320" font-family="Arial" font-size="18" fill="rgba(255,255,255,0.7)">Currency converter, Buddhist calendar, weather comparison,</text>
            <text x="80" y="348" font-family="Arial" font-size="18" fill="rgba(255,255,255,0.7)">Thai food finder, and more — everything you need to stay</text>
            <text x="80" y="376" font-family="Arial" font-size="18" fill="rgba(255,255,255,0.7)">connected to home.</text>
            
            <!-- Feature tags -->
            <rect x="80" y="420" width="120" height="34" rx="17" fill="rgba(255,255,255,0.08)"/>
            <text x="140" y="443" font-family="Arial" font-size="12" fill="white" text-anchor="middle">💰 Real-time Rates</text>
            
            <rect x="210" y="420" width="120" height="34" rx="17" fill="rgba(255,255,255,0.08)"/>
            <text x="270" y="443" font-family="Arial" font-size="12" fill="white" text-anchor="middle">📅 วันพระ Calendar</text>
            
            <rect x="340" y="420" width="130" height="34" rx="17" fill="rgba(255,255,255,0.08)"/>
            <text x="405" y="443" font-family="Arial" font-size="12" fill="white" text-anchor="middle">🌡️ Dual Weather + AQI</text>
            
            <rect x="80" y="464" width="110" height="34" rx="17" fill="rgba(255,255,255,0.08)"/>
            <text x="135" y="487" font-family="Arial" font-size="12" fill="white" text-anchor="middle">🍜 Find Thai Food</text>
            
            <rect x="200" y="464" width="140" height="34" rx="17" fill="rgba(255,255,255,0.08)"/>
            <text x="270" y="487" font-family="Arial" font-size="12" fill="white" text-anchor="middle">💸 Compare Remittance</text>
            
            <rect x="350" y="464" width="100" height="34" rx="17" fill="rgba(255,255,255,0.08)"/>
            <text x="400" y="487" font-family="Arial" font-size="12" fill="white" text-anchor="middle">📚 Learn Thai</text>
            
            <!-- Phone mockups -->
            <rect x="700" y="60" width="280" height="440" rx="28" fill="#0a0a14"/>
            <rect x="710" y="70" width="260" height="420" rx="22" fill="url(#bg3)"/>
            
            <!-- Phone 1 content -->
            <rect x="730" y="90" width="24" height="24" rx="6" fill="url(#gold3)"/>
            <text x="742" y="108" font-family="Arial" font-size="12" font-weight="bold" fill="#1a1a2e" text-anchor="middle">ส</text>
            <text x="762" y="106" font-family="Arial" font-size="10" font-weight="bold" fill="#fbbf24">SiamConnect</text>
            
            <rect x="730" y="125" width="220" height="90" rx="10" fill="rgba(255,255,255,0.05)"/>
            <text x="745" y="145" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.5)">📍 Seattle</text>
            <text x="745" y="170" font-family="Arial" font-size="20" font-weight="bold" fill="white">52°F</text>
            <text x="935" y="145" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.5)" text-anchor="end">กรุงเทพฯ 📍</text>
            <text x="935" y="170" font-family="Arial" font-size="20" font-weight="bold" fill="white" text-anchor="end">32°C</text>
            
            <rect x="730" y="225" width="220" height="50" rx="10" fill="rgba(255,255,255,0.05)"/>
            <text x="745" y="250" font-family="Arial" font-size="12" fill="rgba(255,255,255,0.6)">$1 =</text>
            <text x="785" y="250" font-family="Arial" font-size="16" font-weight="bold" fill="#fbbf24">฿34.52</text>
            
            <!-- Phone 2 -->
            <rect x="1010" y="100" width="280" height="440" rx="28" fill="#0a0a14"/>
            <rect x="1020" y="110" width="260" height="420" rx="22" fill="url(#bg3)"/>
            
            <rect x="1040" y="130" width="24" height="24" rx="6" fill="url(#gold3)"/>
            <text x="1052" y="148" font-family="Arial" font-size="12" font-weight="bold" fill="#1a1a2e" text-anchor="middle">ส</text>
            <text x="1072" y="146" font-family="Arial" font-size="10" font-weight="bold" fill="#fbbf24">วันพระ Calendar</text>
            
            <rect x="1040" y="165" width="220" height="140" rx="10" fill="rgba(255,255,255,0.05)"/>
            <text x="1150" y="185" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.6)" text-anchor="middle">December 2024</text>
            
            <rect x="1040" y="320" width="220" height="70" rx="10" fill="rgba(255,255,255,0.05)"/>
            <text x="1055" y="345" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.5)">🎉 Next Festival</text>
            <text x="1055" y="365" font-family="Arial" font-size="13" font-weight="bold" fill="white">Chinese New Year</text>
            <text x="1055" y="380" font-family="Arial" font-size="16" font-weight="bold" fill="#fbbf24">60 days</text>
          </svg>
        `),
        top: 0,
        left: 0
      }
    ])
    .png()
    .toFile(path.join(storeListingDir, 'marquee-1400x560.png'));
  console.log('   ✅ marquee-1400x560.png');

  console.log('\n✅ All images generated successfully!');
  console.log(`\n📁 Files saved to: ${storeListingDir}`);
  console.log('\nUpload these files to Chrome Web Store:');
  console.log('  • store-icon-128x128.png → Store icon');
  console.log('  • screenshot-1280x800.png → Screenshots');
  console.log('  • small-promo-440x280.png → Small promo tile');
  console.log('  • marquee-1400x560.png → Marquee promo tile');
}

generateImages().catch(console.error);

