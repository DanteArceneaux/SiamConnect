// Storage utilities for user preferences

export interface UserSettings {
  hometown: ThaiCity
  usCity: string
  cardOrder: string[]
  favoriteAmounts: number[]
  rateAlert: {
    enabled: boolean
    threshold: number | null
    direction: 'above' | 'below'
  }
  zoom: number
  lastExchangeRate: number | null
}

export interface ThaiCity {
  name: string
  thaiName: string
  lat: number
  lon: number
}

export const THAI_CITIES: ThaiCity[] = [
  { name: 'Bangkok', thaiName: 'กรุงเทพฯ', lat: 13.7563, lon: 100.5018 },
  { name: 'Chiang Mai', thaiName: 'เชียงใหม่', lat: 18.7883, lon: 98.9853 },
  { name: 'Phuket', thaiName: 'ภูเก็ต', lat: 7.8804, lon: 98.3923 },
  { name: 'Pattaya', thaiName: 'พัทยา', lat: 12.9236, lon: 100.8825 },
  { name: 'Khon Kaen', thaiName: 'ขอนแก่น', lat: 16.4322, lon: 102.8236 },
  { name: 'Hat Yai', thaiName: 'หาดใหญ่', lat: 7.0086, lon: 100.4747 },
  { name: 'Udon Thani', thaiName: 'อุดรธานี', lat: 17.4156, lon: 102.7872 },
  { name: 'Nakhon Ratchasima', thaiName: 'นครราชสีมา', lat: 14.9799, lon: 102.0978 },
  { name: 'Chiang Rai', thaiName: 'เชียงราย', lat: 19.9105, lon: 99.8406 },
  { name: 'Surat Thani', thaiName: 'สุราษฎร์ธานี', lat: 9.1382, lon: 99.3217 },
  { name: 'Nonthaburi', thaiName: 'นนทบุรี', lat: 13.8621, lon: 100.5144 },
  { name: 'Rayong', thaiName: 'ระยอง', lat: 12.6814, lon: 101.2816 },
]

export const DEFAULT_CARD_ORDER = [
  'weather',
  'currency',
  'tools',
  'translation',
]

const DEFAULT_SETTINGS: UserSettings = {
  hometown: THAI_CITIES[0], // Bangkok
  usCity: '',
  cardOrder: DEFAULT_CARD_ORDER,
  favoriteAmounts: [100, 500, 1000, 5000],
  rateAlert: {
    enabled: false,
    threshold: null,
    direction: 'above'
  },
  zoom: 100,
  lastExchangeRate: null,
}

const STORAGE_KEY = 'siamconnect-settings'

export function getSettings(): UserSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return { ...DEFAULT_SETTINGS, ...parsed }
    }
  } catch (e) {
    console.error('Error reading settings:', e)
  }
  return DEFAULT_SETTINGS
}

export function saveSettings(settings: Partial<UserSettings>): void {
  try {
    const current = getSettings()
    const updated = { ...current, ...settings }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (e) {
    console.error('Error saving settings:', e)
  }
}

export function updateCardOrder(newOrder: string[]): void {
  saveSettings({ cardOrder: newOrder })
}

export function setHometown(city: ThaiCity): void {
  saveSettings({ hometown: city })
}

export function setRateAlert(alert: UserSettings['rateAlert']): void {
  saveSettings({ rateAlert: alert })
}

export function addFavoriteAmount(amount: number): void {
  const settings = getSettings()
  if (!settings.favoriteAmounts.includes(amount)) {
    const updated = [...settings.favoriteAmounts, amount].sort((a, b) => a - b).slice(0, 6)
    saveSettings({ favoriteAmounts: updated })
  }
}

// Thai words of the day
export const THAI_WORDS = [
  { thai: 'สวัสดี', romanization: 'sa-wat-dee', english: 'Hello', category: 'greeting' },
  { thai: 'ขอบคุณ', romanization: 'khop-khun', english: 'Thank you', category: 'greeting' },
  { thai: 'อร่อย', romanization: 'a-roi', english: 'Delicious', category: 'food' },
  { thai: 'สบายดี', romanization: 'sa-bai-dee', english: 'I\'m fine', category: 'greeting' },
  { thai: 'รัก', romanization: 'rak', english: 'Love', category: 'emotion' },
  { thai: 'คิดถึง', romanization: 'kit-tueng', english: 'Miss (someone)', category: 'emotion' },
  { thai: 'บ้าน', romanization: 'baan', english: 'Home/House', category: 'place' },
  { thai: 'ครอบครัว', romanization: 'krop-krua', english: 'Family', category: 'family' },
  { thai: 'แม่', romanization: 'mae', english: 'Mother', category: 'family' },
  { thai: 'พ่อ', romanization: 'por', english: 'Father', category: 'family' },
  { thai: 'น้ำ', romanization: 'nam', english: 'Water', category: 'food' },
  { thai: 'ข้าว', romanization: 'khao', english: 'Rice', category: 'food' },
  { thai: 'เผ็ด', romanization: 'pet', english: 'Spicy', category: 'food' },
  { thai: 'หิว', romanization: 'hiu', english: 'Hungry', category: 'feeling' },
  { thai: 'เหนื่อย', romanization: 'nuay', english: 'Tired', category: 'feeling' },
  { thai: 'ดีใจ', romanization: 'dee-jai', english: 'Happy', category: 'emotion' },
  { thai: 'เสียใจ', romanization: 'sia-jai', english: 'Sad/Sorry', category: 'emotion' },
  { thai: 'วัด', romanization: 'wat', english: 'Temple', category: 'place' },
  { thai: 'ตลาด', romanization: 'ta-lat', english: 'Market', category: 'place' },
  { thai: 'ทะเล', romanization: 'ta-lay', english: 'Sea/Beach', category: 'place' },
  { thai: 'ร้อน', romanization: 'ron', english: 'Hot', category: 'weather' },
  { thai: 'ฝนตก', romanization: 'fon-tok', english: 'Raining', category: 'weather' },
  { thai: 'สวย', romanization: 'suay', english: 'Beautiful', category: 'adjective' },
  { thai: 'เก่ง', romanization: 'geng', english: 'Skilled/Good at', category: 'adjective' },
  { thai: 'ช้าง', romanization: 'chang', english: 'Elephant', category: 'animal' },
  { thai: 'หมา', romanization: 'maa', english: 'Dog', category: 'animal' },
  { thai: 'แมว', romanization: 'maew', english: 'Cat', category: 'animal' },
  { thai: 'เงิน', romanization: 'ngern', english: 'Money', category: 'business' },
  { thai: 'ทำงาน', romanization: 'tam-ngan', english: 'Work', category: 'business' },
  { thai: 'พรุ่งนี้', romanization: 'prung-nee', english: 'Tomorrow', category: 'time' },
]

export function getWordOfTheDay(): typeof THAI_WORDS[0] {
  // Use day of year to get consistent word for each day
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
  return THAI_WORDS[dayOfYear % THAI_WORDS.length]
}


