import { copyFileSync, mkdirSync, existsSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const distDir = join(rootDir, 'dist')
const publicDir = join(rootDir, 'public')

// Ensure dist directory exists
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true })
}

// Files to copy from public to dist
const filesToCopy = [
  'manifest.json',
  'background.js',
  'content.js',
  'content.css'
]

// Copy individual files
filesToCopy.forEach(file => {
  const src = join(publicDir, file)
  const dest = join(distDir, file)
  if (existsSync(src)) {
    copyFileSync(src, dest)
    console.log(`✓ Copied ${file}`)
  } else {
    console.log(`⚠ ${file} not found`)
  }
})

// Copy icons directory
const iconsDir = join(publicDir, 'icons')
const distIconsDir = join(distDir, 'icons')

if (!existsSync(distIconsDir)) {
  mkdirSync(distIconsDir, { recursive: true })
}

if (existsSync(iconsDir)) {
  const icons = readdirSync(iconsDir)
  icons.forEach(icon => {
    copyFileSync(join(iconsDir, icon), join(distIconsDir, icon))
    console.log(`✓ Copied icons/${icon}`)
  })
}

console.log('\n✅ Extension files copied to dist/')
console.log('\nTo load the extension in Chrome:')
console.log('1. Open chrome://extensions/')
console.log('2. Enable "Developer mode"')
console.log('3. Click "Load unpacked"')
console.log('4. Select the dist/ folder')


