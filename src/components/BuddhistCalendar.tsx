import { useState, useEffect } from 'react'
import { ArrowLeft, Moon, ChevronLeft, ChevronRight, Sun, Star } from 'lucide-react'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay } from 'date-fns'
import { getWanPhraDates, getThaiHolidays, getUpcomingFestivals, getDaysUntilNextWanPhra, type LunarDate, type ThaiHoliday } from '../utils/lunarCalendar'

interface BuddhistCalendarProps {
  onBack: () => void
}

const usHolidays2024_2025 = [
  { date: new Date(2024, 0, 1), name: 'New Year\'s Day' },
  { date: new Date(2024, 0, 15), name: 'MLK Day' },
  { date: new Date(2024, 1, 19), name: 'Presidents\' Day' },
  { date: new Date(2024, 4, 27), name: 'Memorial Day' },
  { date: new Date(2024, 6, 4), name: 'Independence Day' },
  { date: new Date(2024, 8, 2), name: 'Labor Day' },
  { date: new Date(2024, 9, 14), name: 'Columbus Day' },
  { date: new Date(2024, 10, 11), name: 'Veterans Day' },
  { date: new Date(2024, 10, 28), name: 'Thanksgiving' },
  { date: new Date(2024, 11, 25), name: 'Christmas' },
  { date: new Date(2025, 0, 1), name: 'New Year\'s Day' },
  { date: new Date(2025, 0, 20), name: 'MLK Day' },
  { date: new Date(2025, 1, 17), name: 'Presidents\' Day' },
  { date: new Date(2025, 4, 26), name: 'Memorial Day' },
  { date: new Date(2025, 6, 4), name: 'Independence Day' },
  { date: new Date(2025, 8, 1), name: 'Labor Day' },
  { date: new Date(2025, 9, 13), name: 'Columbus Day' },
  { date: new Date(2025, 10, 11), name: 'Veterans Day' },
  { date: new Date(2025, 10, 27), name: 'Thanksgiving' },
  { date: new Date(2025, 11, 25), name: 'Christmas' },
]

export default function BuddhistCalendar({ onBack }: BuddhistCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [wanPhraDates, setWanPhraDates] = useState<LunarDate[]>([])
  const [thaiHolidays, setThaiHolidays] = useState<ThaiHoliday[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    
    setWanPhraDates(getWanPhraDates(year, month))
    setThaiHolidays(getThaiHolidays(year))
  }, [currentMonth])

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const startOffset = monthStart.getDay()
  
  const isWanPhra = (date: Date) => wanPhraDates.some(wp => isSameDay(wp.date, date))
  const getWanPhraInfo = (date: Date) => wanPhraDates.find(wp => isSameDay(wp.date, date))
  const isThaiHoliday = (date: Date) => thaiHolidays.some(h => isSameDay(h.date, date))
  const getThaiHolidayInfo = (date: Date) => thaiHolidays.find(h => isSameDay(h.date, date))
  const isUSHoliday = (date: Date) => usHolidays2024_2025.some(h => isSameDay(h.date, date))
  const getUSHolidayInfo = (date: Date) => usHolidays2024_2025.find(h => isSameDay(h.date, date))
  
  const upcomingFestivals = getUpcomingFestivals()
  const nextWanPhra = getDaysUntilNextWanPhra()
  
  const getDateInfo = (date: Date) => {
    const wp = getWanPhraInfo(date)
    const th = getThaiHolidayInfo(date)
    const us = getUSHolidayInfo(date)
    return { wp, th, us }
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={20} className="text-white/60" />
        </button>
        <div>
          <h2 className="font-display font-bold text-lg gold-text flex items-center gap-2">
            <span className="thai-text">วันพระ</span> Calendar
          </h2>
          <p className="text-white/40 text-xs">Buddhist holy days & Thai holidays</p>
        </div>
      </div>

      {/* Next Wan Phra Countdown */}
      {nextWanPhra && (
        <div className="glass-card p-3 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon size={16} className="text-gold-400" />
            <span className="text-sm text-white/80">Next Wan Phra</span>
          </div>
          <div className="text-right">
            <span className="text-gold-400 font-bold">{nextWanPhra.daysUntil} days</span>
            <p className="text-xs text-white/40 thai-text">{nextWanPhra.thaiName}</p>
          </div>
        </div>
      )}

      {/* Calendar */}
      <div className="glass-card p-4 mb-3">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={20} className="text-white/60" />
          </button>
          <h3 className="font-display font-bold text-white">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ChevronRight size={20} className="text-white/60" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="text-center text-xs text-white/40 py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: startOffset }).map((_, i) => (
            <div key={`empty-${i}`} className="h-9" />
          ))}
          
          {days.map(day => {
            const isWP = isWanPhra(day)
            const isTH = isThaiHoliday(day)
            const isUS = isUSHoliday(day)
            const isCurrentDay = isToday(day)
            const isSelected = selectedDate && isSameDay(day, selectedDate)
            const { th } = getDateInfo(day)
            
            return (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDate(isSelected ? null : day)}
                className={`h-9 rounded-lg text-sm relative transition-all hover:scale-105 ${
                  isCurrentDay
                    ? 'bg-gold-500 text-night-900 font-bold'
                    : isSelected
                    ? 'bg-silk-600 text-white ring-2 ring-gold-400'
                    : isWP
                    ? 'bg-silk-600/50 text-white'
                    : isTH
                    ? th?.type === 'buddhist' ? 'bg-gold-500/30 text-gold-200' : 'bg-temple-600/40 text-temple-200'
                    : isUS
                    ? 'bg-blue-600/30 text-blue-200'
                    : 'text-white/60 hover:bg-white/10'
                }`}
              >
                {format(day, 'd')}
                {isWP && (
                  <Moon size={8} className="absolute top-0.5 right-0.5 text-gold-400" />
                )}
                {isTH && !isWP && (
                  <span className={`absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full ${
                    th?.type === 'buddhist' ? 'bg-gold-400' : 
                    th?.type === 'cultural' ? 'bg-pink-400' : 'bg-temple-400'
                  }`} />
                )}
                {isUS && !isTH && !isWP && (
                  <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-blue-400 rounded-full" />
                )}
              </button>
            )
          })}
        </div>

        {/* Selected Date Info */}
        {selectedDate && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-sm font-medium text-white/80 mb-2">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </p>
            {(() => {
              const { wp, th, us } = getDateInfo(selectedDate)
              return (
                <div className="space-y-1">
                  {wp && (
                    <div className="flex items-center gap-2 text-xs">
                      <Moon size={12} className="text-gold-400" />
                      <span className="thai-text text-gold-400">{wp.thaiName}</span>
                    </div>
                  )}
                  {th && (
                    <div className="flex items-start gap-2 text-xs">
                      <Star size={12} className={th.type === 'buddhist' ? 'text-gold-400' : 'text-temple-400'} />
                      <div>
                        <span className="text-white/80">{th.name}</span>
                        <span className="thai-text text-white/50 ml-2">{th.thaiName}</span>
                        {th.description && (
                          <p className="text-white/40 mt-0.5">{th.description}</p>
                        )}
                      </div>
                    </div>
                  )}
                  {us && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-blue-400">🇺🇸</span>
                      <span className="text-blue-300">{us.name}</span>
                    </div>
                  )}
                  {!wp && !th && !us && (
                    <p className="text-xs text-white/40">No holidays on this day</p>
                  )}
                </div>
              )
            })()}
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 pt-3 border-t border-white/10 text-xs">
          <div className="flex items-center gap-1.5">
            <Moon size={12} className="text-gold-400" />
            <span className="text-white/60">Wan Phra</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-gold-400 rounded-full" />
            <span className="text-white/60">Buddhist</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-pink-400 rounded-full" />
            <span className="text-white/60">Cultural</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-blue-400 rounded-full" />
            <span className="text-white/60">US Holiday</span>
          </div>
        </div>
      </div>

      {/* Upcoming Festivals */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-medium text-white/80 mb-3 flex items-center gap-2">
          <Sun size={14} className="text-gold-400" />
          Upcoming Festivals
        </h3>
        <div className="space-y-2">
          {upcomingFestivals.map((festival, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-lg bg-white/5"
            >
              <div>
                <div className="text-sm text-white/80">{festival.name}</div>
                <div className="text-xs thai-text text-gold-400">{festival.thaiName}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gold-400">{festival.daysUntil} days</div>
                <div className="text-xs text-white/40">
                  {format(festival.date, 'MMM d, yyyy')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
