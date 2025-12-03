import { useState, useEffect } from 'react'
import { Cloud, Sun, CloudRain, Moon, Wind, MapPin } from 'lucide-react'
import { format } from 'date-fns'
import { getAqiStatus, getAqiColor } from '../utils/weatherApi'
import { getSettings } from '../utils/storage'

interface WeatherData {
  temp: number
  condition: 'sunny' | 'cloudy' | 'rainy' | 'night'
  humidity: number
  city: string
}

interface AqiData {
  aqi: number
  status: string
  color: string
}

interface TimeInfo {
  time: string
  date: string
  timezone: string
  isNight: boolean
}

const getWeatherIcon = (condition: string, isNight: boolean, size = 20) => {
  if (isNight) return <Moon size={size} className="text-silk-300" />
  switch (condition) {
    case 'sunny':
      return <Sun size={size} className="text-gold-400" />
    case 'cloudy':
      return <Cloud size={size} className="text-gray-300" />
    case 'rainy':
      return <CloudRain size={size} className="text-blue-400" />
    default:
      return <Sun size={size} className="text-gold-400" />
  }
}

export default function Header() {
  const [usTime, setUsTime] = useState<TimeInfo | null>(null)
  const [thTime, setThTime] = useState<TimeInfo | null>(null)
  const [settings] = useState(getSettings())
  
  // Mock weather data - in production, this would come from API
  const [usWeather] = useState<WeatherData>({
    temp: 52,
    condition: 'cloudy',
    humidity: 68,
    city: 'Seattle'
  })
  
  const [thWeather] = useState<WeatherData>({
    temp: 32,
    condition: 'sunny',
    humidity: 75,
    city: settings.hometown.name
  })
  
  // Mock AQI data - in production, this would come from API
  const [usAqi] = useState<AqiData>({
    aqi: 42,
    status: getAqiStatus(42),
    color: getAqiColor(42)
  })
  
  const [thAqi] = useState<AqiData>({
    aqi: 142,
    status: getAqiStatus(142),
    color: getAqiColor(142)
  })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      
      // US Time (Pacific as example)
      const usTimeStr = format(now, 'h:mm a')
      const usDateStr = format(now, 'EEE, MMM d')
      const usHour = now.getHours()
      
      setUsTime({
        time: usTimeStr,
        date: usDateStr,
        timezone: 'PST',
        isNight: usHour < 6 || usHour >= 20
      })
      
      // Thailand Time (UTC+7)
      const thaiTime = new Date(now.getTime() + (7 * 60 * 60 * 1000) + (now.getTimezoneOffset() * 60 * 1000))
      const thTimeStr = format(thaiTime, 'h:mm a')
      const thDateStr = format(thaiTime, 'EEE, MMM d')
      const thHour = thaiTime.getHours()
      
      setThTime({
        time: thTimeStr,
        date: thDateStr,
        timezone: 'ICT',
        isNight: thHour < 6 || thHour >= 20
      })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const getCallStatus = () => {
    if (!thTime) return null
    const timeParts = thTime.time.match(/(\d+):(\d+)\s*(AM|PM)/i)
    if (!timeParts) return null
    
    let hour = parseInt(timeParts[1])
    const isPM = timeParts[3].toUpperCase() === 'PM'
    
    if (isPM && hour !== 12) hour += 12
    if (!isPM && hour === 12) hour = 0
    
    if (hour >= 6 && hour < 9) return { text: 'Early morning in TH', color: 'text-yellow-400', icon: '🌅' }
    if (hour >= 9 && hour < 12) return { text: 'Good time to call!', color: 'text-green-400', icon: '✓' }
    if (hour >= 12 && hour < 14) return { text: 'Lunch time in TH', color: 'text-yellow-400', icon: '🍜' }
    if (hour >= 14 && hour < 18) return { text: 'Good time to call!', color: 'text-green-400', icon: '✓' }
    if (hour >= 18 && hour < 21) return { text: 'Evening in TH', color: 'text-yellow-400', icon: '🌆' }
    return { text: 'People are sleeping', color: 'text-red-400', icon: '😴' }
  }

  const callStatus = getCallStatus()

  return (
    <div className="mx-4 mb-3 glass-card p-4 animate-fade-in stagger-1">
      {/* Dual Location Display */}
      <div className="grid grid-cols-2 gap-4">
        {/* US Location */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-white/60 text-xs">
            <MapPin size={12} />
            <span>{usWeather.city}</span>
          </div>
          <div className="flex items-center gap-2">
            {getWeatherIcon(usWeather.condition, usTime?.isNight || false, 24)}
            <span className="text-2xl font-display font-bold">{usWeather.temp}°F</span>
          </div>
          <div className="text-white/80 text-lg font-medium">
            {usTime?.time}
          </div>
          <div className="text-white/40 text-xs">
            {usTime?.date} • {usTime?.timezone}
          </div>
        </div>

        {/* Thailand Location */}
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-1.5 text-white/60 text-xs justify-end">
            <span className="thai-text">{settings.hometown.thaiName || thWeather.city}</span>
            <MapPin size={12} />
          </div>
          <div className="flex items-center gap-2 justify-end">
            <span className="text-2xl font-display font-bold">{thWeather.temp}°C</span>
            {getWeatherIcon(thWeather.condition, thTime?.isNight || false, 24)}
          </div>
          <div className="text-white/80 text-lg font-medium">
            {thTime?.time}
          </div>
          <div className="text-white/40 text-xs">
            {thTime?.date} • {thTime?.timezone}
          </div>
        </div>
      </div>

      {/* Call Status Bar */}
      {callStatus && (
        <div className={`mt-3 pt-3 border-t border-white/10 flex items-center justify-center gap-2 ${callStatus.color}`}>
          <span className="text-base">{callStatus.icon}</span>
          <span className="text-sm font-medium">{callStatus.text}</span>
        </div>
      )}

      {/* Air Quality Comparison */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-white/50 flex items-center gap-1">
            <Wind size={12} />
            Air Quality (PM2.5)
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* Local AQI */}
          <div className="bg-white/5 rounded-lg p-2">
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-xs">{usWeather.city}</span>
              <span className={`text-xs font-medium ${usAqi.color}`}>AQI {usAqi.aqi}</span>
            </div>
            <div className={`text-[10px] ${usAqi.color}`}>{usAqi.status}</div>
          </div>
          {/* Thai AQI */}
          <div className="bg-white/5 rounded-lg p-2">
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-xs thai-text">{settings.hometown.thaiName}</span>
              <span className={`text-xs font-medium ${thAqi.color}`}>AQI {thAqi.aqi}</span>
            </div>
            <div className={`text-[10px] ${thAqi.color}`}>{thAqi.status}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
