/**
 * Regenerate all extension icons from SVG
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '..', 'public', 'icons');
const iconSvg = path.join(iconsDir, 'icon.svg');

async function regenerateIcons() {
  console.log('🎨 Regenerating extension icons from SVG...\n');

  if (!fs.existsSync(iconSvg)) {
    console.error('❌ Error: icon.svg not found at', iconSvg);
    return;
  }

  const sizes = [16, 32, 48, 128];

  try {
    for (const size of sizes) {
      const outputPath = path.join(iconsDir, `icon${size}.png`);
      console.log(`📦 Creating icon${size}.png (${size}x${size})...`);
      
      await sharp(iconSvg)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png({
          quality: 100,
          compressionLevel: 9
        })
        .toFile(outputPath);
      
      console.log(`   ✅ icon${size}.png`);
    }

    console.log('\n✅ All icons regenerated successfully!');
    console.log(`\n📁 Files saved to: ${iconsDir}`);
    
    // Verify files exist
    console.log('\n🔍 Verifying files...');
    for (const size of sizes) {
      const filePath = path.join(iconsDir, `icon${size}.png`);
      const stats = fs.statSync(filePath);
      console.log(`   ✓ icon${size}.png: ${stats.size} bytes`);
    }

  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

regenerateIcons();

