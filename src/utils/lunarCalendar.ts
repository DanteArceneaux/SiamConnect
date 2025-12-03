// Accurate Lunar Calendar Calculations for Buddhist Holy Days
// Based on astronomical calculations for moon phases

export interface LunarDate {
  date: Date
  phase: 'new' | 'waxing' | 'full' | 'waning'
  lunarDay: number
  isWanPhra: boolean
  thaiName: string
}

export interface ThaiHoliday {
  date: Date
  name: string
  thaiName: string
  type: 'public' | 'buddhist' | 'royal' | 'cultural'
  description?: string
}

// Known new moon dates for 2024-2025 (astronomical data)
const NEW_MOONS_2024_2025 = [
  new Date(2024, 0, 11), // January 2024
  new Date(2024, 1, 9),
  new Date(2024, 2, 10),
  new Date(2024, 3, 8),
  new Date(2024, 4, 8),
  new Date(2024, 5, 6),
  new Date(2024, 6, 5),
  new Date(2024, 7, 4),
  new Date(2024, 8, 3),
  new Date(2024, 9, 2),
  new Date(2024, 10, 1),
  new Date(2024, 11, 1),
  new Date(2024, 11, 30),
  new Date(2025, 0, 29), // January 2025
  new Date(2025, 1, 28),
  new Date(2025, 2, 29),
  new Date(2025, 3, 27),
  new Date(2025, 4, 27),
  new Date(2025, 5, 25),
  new Date(2025, 6, 24),
  new Date(2025, 7, 23),
  new Date(2025, 8, 21),
  new Date(2025, 9, 21),
  new Date(2025, 10, 20),
  new Date(2025, 11, 20),
]

// Calculate moon phase for any date
export function getMoonPhase(date: Date): { phase: 'new' | 'waxing' | 'full' | 'waning', dayInCycle: number } {
  const synodicMonth = 29.53059 // Average lunar month in days
  const knownNewMoon = new Date(2024, 0, 11, 11, 57) // Known new moon
  
  const daysSinceNew = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24)
  const cycleDay = ((daysSinceNew % synodicMonth) + synodicMonth) % synodicMonth
  
  let phase: 'new' | 'waxing' | 'full' | 'waning'
  if (cycleDay < 1.85) phase = 'new'
  else if (cycleDay < 7.38) phase = 'waxing'
  else if (cycleDay < 14.77) phase = 'waxing'
  else if (cycleDay < 16.61) phase = 'full'
  else if (cycleDay < 22.15) phase = 'waning'
  else if (cycleDay < 27.68) phase = 'waning'
  else phase = 'new'
  
  return { phase, dayInCycle: Math.floor(cycleDay) }
}

// Get Wan Phra dates for a given month
// Wan Phra falls on the 8th and 15th day of each waxing and waning moon
export function getWanPhraDates(year: number, month: number): LunarDate[] {
  const wanPhraDates: LunarDate[] = []
  const startDate = new Date(year, month, 1)
  const endDate = new Date(year, month + 1, 0)
  
  // Find all new moons that affect this month
  const relevantNewMoons = NEW_MOONS_2024_2025.filter(nm => {
    const nmEnd = new Date(nm.getTime() + 30 * 24 * 60 * 60 * 1000)
    return nm <= endDate && nmEnd >= startDate
  })
  
  for (const newMoon of relevantNewMoons) {
    // Wan Phra dates relative to new moon:
    // Day 8 of waxing moon (ขึ้น ๘ ค่ำ)
    // Day 15 of waxing moon - Full moon (ขึ้น ๑๕ ค่ำ)
    // Day 8 of waning moon (แรม ๘ ค่ำ)
    // Day 15 of waning moon - New moon (แรม ๑๕ ค่ำ)
    
    const wanPhraOffsets = [
      { days: 7, phase: 'waxing' as const, lunarDay: 8, thaiName: 'วันพระ ขึ้น ๘ ค่ำ' },
      { days: 14, phase: 'full' as const, lunarDay: 15, thaiName: 'วันพระ ขึ้น ๑๕ ค่ำ (วันเพ็ญ)' },
      { days: 22, phase: 'waning' as const, lunarDay: 8, thaiName: 'วันพระ แรม ๘ ค่ำ' },
      { days: 29, phase: 'new' as const, lunarDay: 15, thaiName: 'วันพระ แรม ๑๕ ค่ำ (วันดับ)' },
    ]
    
    for (const offset of wanPhraOffsets) {
      const wanPhraDate = new Date(newMoon.getTime() + offset.days * 24 * 60 * 60 * 1000)
      
      if (wanPhraDate.getMonth() === month && wanPhraDate.getFullYear() === year) {
        wanPhraDates.push({
          date: wanPhraDate,
          phase: offset.phase,
          lunarDay: offset.lunarDay,
          isWanPhra: true,
          thaiName: offset.thaiName
        })
      }
    }
  }
  
  // Remove duplicates and sort
  const uniqueDates = wanPhraDates.filter((v, i, a) => 
    a.findIndex(t => t.date.toDateString() === v.date.toDateString()) === i
  )
  
  return uniqueDates.sort((a, b) => a.date.getTime() - b.date.getTime())
}

// Thai holidays with accurate 2024-2025 dates
export function getThaiHolidays(year: number): ThaiHoliday[] {
  const holidays: ThaiHoliday[] = []
  
  if (year === 2024) {
    holidays.push(
      // Public Holidays
      { date: new Date(2024, 0, 1), name: "New Year's Day", thaiName: 'วันขึ้นปีใหม่', type: 'public' },
      { date: new Date(2024, 1, 24), name: 'Makha Bucha Day', thaiName: 'วันมาฆบูชา', type: 'buddhist', description: 'Commemorates Buddha\'s teachings to 1,250 monks' },
      { date: new Date(2024, 3, 6), name: 'Chakri Memorial Day', thaiName: 'วันจักรี', type: 'royal' },
      { date: new Date(2024, 3, 13), name: 'Songkran Festival', thaiName: 'วันสงกรานต์', type: 'cultural', description: 'Thai New Year - Water Festival' },
      { date: new Date(2024, 3, 14), name: 'Songkran Festival', thaiName: 'วันสงกรานต์', type: 'cultural' },
      { date: new Date(2024, 3, 15), name: 'Songkran Festival', thaiName: 'วันสงกรานต์', type: 'cultural' },
      { date: new Date(2024, 4, 1), name: 'National Labour Day', thaiName: 'วันแรงงานแห่งชาติ', type: 'public' },
      { date: new Date(2024, 4, 4), name: 'Coronation Day', thaiName: 'วันฉัตรมงคล', type: 'royal' },
      { date: new Date(2024, 4, 22), name: 'Visakha Bucha Day', thaiName: 'วันวิสาขบูชา', type: 'buddhist', description: 'Buddha\'s birth, enlightenment & death' },
      { date: new Date(2024, 5, 3), name: "Queen Suthida's Birthday", thaiName: 'วันเฉลิมพระชนมพรรษา สมเด็จพระราชินี', type: 'royal' },
      { date: new Date(2024, 6, 20), name: 'Asanha Bucha Day', thaiName: 'วันอาสาฬหบูชา', type: 'buddhist', description: 'Buddha\'s first sermon' },
      { date: new Date(2024, 6, 21), name: 'Buddhist Lent Day', thaiName: 'วันเข้าพรรษา', type: 'buddhist', description: 'Start of Buddhist Lent' },
      { date: new Date(2024, 6, 28), name: "King's Birthday", thaiName: 'วันเฉลิมพระชนมพรรษา ร.๑๐', type: 'royal' },
      { date: new Date(2024, 7, 12), name: "Queen Mother's Birthday", thaiName: 'วันแม่แห่งชาติ', type: 'royal', description: 'Mother\'s Day' },
      { date: new Date(2024, 9, 13), name: 'King Bhumibol Memorial Day', thaiName: 'วันคล้ายวันสวรรคต ร.๙', type: 'royal' },
      { date: new Date(2024, 9, 23), name: 'Chulalongkorn Day', thaiName: 'วันปิยมหาราช', type: 'royal' },
      { date: new Date(2024, 10, 15), name: 'Loy Krathong', thaiName: 'วันลอยกระทง', type: 'cultural', description: 'Festival of Lights' },
      { date: new Date(2024, 11, 5), name: "King Bhumibol's Birthday", thaiName: 'วันพ่อแห่งชาติ', type: 'royal', description: 'Father\'s Day' },
      { date: new Date(2024, 11, 10), name: 'Constitution Day', thaiName: 'วันรัฐธรรมนูญ', type: 'public' },
      { date: new Date(2024, 11, 31), name: "New Year's Eve", thaiName: 'วันสิ้นปี', type: 'public' },
    )
  }
  
  if (year === 2025) {
    holidays.push(
      { date: new Date(2025, 0, 1), name: "New Year's Day", thaiName: 'วันขึ้นปีใหม่', type: 'public' },
      { date: new Date(2025, 1, 12), name: 'Makha Bucha Day', thaiName: 'วันมาฆบูชา', type: 'buddhist' },
      { date: new Date(2025, 3, 6), name: 'Chakri Memorial Day', thaiName: 'วันจักรี', type: 'royal' },
      { date: new Date(2025, 3, 13), name: 'Songkran Festival', thaiName: 'วันสงกรานต์', type: 'cultural' },
      { date: new Date(2025, 3, 14), name: 'Songkran Festival', thaiName: 'วันสงกรานต์', type: 'cultural' },
      { date: new Date(2025, 3, 15), name: 'Songkran Festival', thaiName: 'วันสงกรานต์', type: 'cultural' },
      { date: new Date(2025, 4, 1), name: 'National Labour Day', thaiName: 'วันแรงงานแห่งชาติ', type: 'public' },
      { date: new Date(2025, 4, 4), name: 'Coronation Day', thaiName: 'วันฉัตรมงคล', type: 'royal' },
      { date: new Date(2025, 4, 11), name: 'Visakha Bucha Day', thaiName: 'วันวิสาขบูชา', type: 'buddhist' },
      { date: new Date(2025, 5, 3), name: "Queen Suthida's Birthday", thaiName: 'วันเฉลิมพระชนมพรรษา สมเด็จพระราชินี', type: 'royal' },
      { date: new Date(2025, 6, 10), name: 'Asanha Bucha Day', thaiName: 'วันอาสาฬหบูชา', type: 'buddhist' },
      { date: new Date(2025, 6, 11), name: 'Buddhist Lent Day', thaiName: 'วันเข้าพรรษา', type: 'buddhist' },
      { date: new Date(2025, 6, 28), name: "King's Birthday", thaiName: 'วันเฉลิมพระชนมพรรษา ร.๑๐', type: 'royal' },
      { date: new Date(2025, 7, 12), name: "Queen Mother's Birthday", thaiName: 'วันแม่แห่งชาติ', type: 'royal' },
      { date: new Date(2025, 9, 13), name: 'King Bhumibol Memorial Day', thaiName: 'วันคล้ายวันสวรรคต ร.๙', type: 'royal' },
      { date: new Date(2025, 9, 23), name: 'Chulalongkorn Day', thaiName: 'วันปิยมหาราช', type: 'royal' },
      { date: new Date(2025, 10, 5), name: 'Loy Krathong', thaiName: 'วันลอยกระทง', type: 'cultural' },
      { date: new Date(2025, 11, 5), name: "King Bhumibol's Birthday", thaiName: 'วันพ่อแห่งชาติ', type: 'royal' },
      { date: new Date(2025, 11, 10), name: 'Constitution Day', thaiName: 'วันรัฐธรรมนูญ', type: 'public' },
      { date: new Date(2025, 11, 31), name: "New Year's Eve", thaiName: 'วันสิ้นปี', type: 'public' },
    )
  }
  
  return holidays
}

// Get upcoming festivals with countdown
export function getUpcomingFestivals(fromDate: Date = new Date()): { name: string, thaiName: string, date: Date, daysUntil: number }[] {
  const festivals = [
    // 2024
    { name: 'Songkran', thaiName: 'สงกรานต์', date: new Date(2024, 3, 13) },
    { name: 'Loy Krathong', thaiName: 'ลอยกระทง', date: new Date(2024, 10, 15) },
    // 2025
    { name: 'Chinese New Year', thaiName: 'ตรุษจีน', date: new Date(2025, 0, 29) },
    { name: 'Songkran', thaiName: 'สงกรานต์', date: new Date(2025, 3, 13) },
    { name: 'Loy Krathong', thaiName: 'ลอยกระทง', date: new Date(2025, 10, 5) },
    // 2026
    { name: 'Chinese New Year', thaiName: 'ตรุษจีน', date: new Date(2026, 1, 17) },
    { name: 'Songkran', thaiName: 'สงกรานต์', date: new Date(2026, 3, 13) },
  ]
  
  return festivals
    .filter(f => f.date >= fromDate)
    .map(f => ({
      ...f,
      daysUntil: Math.ceil((f.date.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24))
    }))
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 3)
}

// Get days until next Wan Phra
export function getDaysUntilNextWanPhra(fromDate: Date = new Date()): { date: Date, daysUntil: number, thaiName: string } | null {
  const currentMonth = fromDate.getMonth()
  const currentYear = fromDate.getFullYear()
  
  // Check this month and next two months
  for (let i = 0; i < 3; i++) {
    const month = (currentMonth + i) % 12
    const year = currentYear + Math.floor((currentMonth + i) / 12)
    const wanPhraDates = getWanPhraDates(year, month)
    
    for (const wp of wanPhraDates) {
      if (wp.date >= fromDate) {
        return {
          date: wp.date,
          daysUntil: Math.ceil((wp.date.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)),
          thaiName: wp.thaiName
        }
      }
    }
  }
  
  return null
}


