/**
 * Package SiamConnect for Chrome Web Store submission
 * 
 * This script creates a ZIP file from the dist folder
 * ready for upload to the Chrome Web Store.
 */

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const distDir = path.join(__dirname, '..', 'dist');
const outputDir = path.join(__dirname, '..', 'releases');

// Read version from manifest
const manifestPath = path.join(distDir, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const version = manifest.version;

// Create releases directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, `siamconnect-v${version}.zip`);

// Create output stream
const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  const size = (archive.pointer() / 1024).toFixed(2);
  console.log('');
  console.log('✅ Package created successfully!');
  console.log('');
  console.log(`📦 File: ${outputPath}`);
  console.log(`📊 Size: ${size} KB`);
  console.log(`🏷️  Version: ${version}`);
  console.log('');
  console.log('Next steps:');
  console.log('1. Go to https://chrome.google.com/webstore/devconsole');
  console.log('2. Click "New Item" or select your extension');
  console.log('3. Upload the ZIP file');
  console.log('4. Fill in store listing details');
  console.log('5. Submit for review');
  console.log('');
});

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.warn('Warning:', err);
  } else {
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// Add all files from dist directory
archive.directory(distDir, false);

archive.finalize();

console.log('');
console.log('🔧 Packaging SiamConnect for Chrome Web Store...');
console.log('');

