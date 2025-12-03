// Weather and Air Quality API utilities
// Note: In production, you'd want to use environment variables for API keys

export interface WeatherData {
  temp: number
  tempUnit: 'F' | 'C'
  condition: string
  conditionCode: string
  humidity: number
  windSpeed: number
  city: string
  country: string
  icon: string
}

export interface AirQualityData {
  aqi: number
  pm25: number
  pm10: number
  status: string
  color: string
  city: string
}

export interface LocationCoords {
  lat: number
  lon: number
}

// API keys would be stored in environment variables in production
// const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
// const WAQI_API_KEY = import.meta.env.VITE_WAQI_API_KEY

// Get user's current location
export async function getCurrentLocation(): Promise<LocationCoords | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null)
      return
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      },
      () => resolve(null),
      { timeout: 5000 }
    )
  })
}

// Fetch weather data from OpenWeatherMap
export async function fetchWeather(_lat: number, _lon: number, units: 'imperial' | 'metric' = 'imperial'): Promise<WeatherData | null> {
  try {
    // For demo purposes, return mock data
    // In production, uncomment the API call below
    
    /*
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${OPENWEATHER_API_KEY}`
    )
    
    if (!response.ok) throw new Error('Weather API error')
    
    const data = await response.json()
    
    return {
      temp: Math.round(data.main.temp),
      tempUnit: units === 'imperial' ? 'F' : 'C',
      condition: data.weather[0].main,
      conditionCode: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed),
      city: data.name,
      country: data.sys.country,
      icon: data.weather[0].icon
    }
    */
    
    // Mock data for demo
    return {
      temp: units === 'imperial' ? 52 : 11,
      tempUnit: units === 'imperial' ? 'F' : 'C',
      condition: 'Cloudy',
      conditionCode: '04d',
      humidity: 75,
      windSpeed: 8,
      city: 'Your City',
      country: 'US',
      icon: '04d'
    }
  } catch (error) {
    console.error('Weather fetch error:', error)
    return null
  }
}

// Fetch air quality data
export async function fetchAirQuality(_lat: number, _lon: number): Promise<AirQualityData | null> {
  try {
    // For demo purposes, return mock data
    // In production, uncomment the API call below
    
    /*
    const response = await fetch(
      `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${WAQI_API_KEY}`
    )
    
    if (!response.ok) throw new Error('AQI API error')
    
    const data = await response.json()
    
    if (data.status !== 'ok') throw new Error('AQI data unavailable')
    
    const aqi = data.data.aqi
    
    return {
      aqi,
      pm25: data.data.iaqi?.pm25?.v || 0,
      pm10: data.data.iaqi?.pm10?.v || 0,
      status: getAqiStatus(aqi),
      color: getAqiColor(aqi),
      city: data.data.city.name
    }
    */
    
    // Mock data for demo
    return {
      aqi: 42,
      pm25: 12,
      pm10: 18,
      status: 'Good',
      color: 'text-green-400',
      city: 'Your City'
    }
  } catch (error) {
    console.error('AQI fetch error:', error)
    return null
  }
}

// Get AQI status text
export function getAqiStatus(aqi: number): string {
  if (aqi <= 50) return 'Good'
  if (aqi <= 100) return 'Moderate'
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups'
  if (aqi <= 200) return 'Unhealthy'
  if (aqi <= 300) return 'Very Unhealthy'
  return 'Hazardous'
}

// Get AQI color class
export function getAqiColor(aqi: number): string {
  if (aqi <= 50) return 'text-green-400'
  if (aqi <= 100) return 'text-yellow-400'
  if (aqi <= 150) return 'text-orange-400'
  if (aqi <= 200) return 'text-red-400'
  if (aqi <= 300) return 'text-purple-400'
  return 'text-rose-900'
}

// Get weather icon based on condition code
export function getWeatherIcon(code: string): string {
  const iconMap: Record<string, string> = {
    '01d': '☀️', // clear sky day
    '01n': '🌙', // clear sky night
    '02d': '⛅', // few clouds day
    '02n': '☁️', // few clouds night
    '03d': '☁️', // scattered clouds
    '03n': '☁️',
    '04d': '☁️', // broken clouds
    '04n': '☁️',
    '09d': '🌧️', // shower rain
    '09n': '🌧️',
    '10d': '🌦️', // rain day
    '10n': '🌧️', // rain night
    '11d': '⛈️', // thunderstorm
    '11n': '⛈️',
    '13d': '❄️', // snow
    '13n': '❄️',
    '50d': '🌫️', // mist
    '50n': '🌫️',
  }
  return iconMap[code] || '☁️'
}

// Fetch exchange rate
export async function fetchExchangeRate(): Promise<{ rate: number, timestamp: number } | null> {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
    
    if (!response.ok) throw new Error('Exchange rate API error')
    
    const data = await response.json()
    
    return {
      rate: data.rates.THB,
      timestamp: Date.now()
    }
  } catch (error) {
    console.error('Exchange rate fetch error:', error)
    return null
  }
}

// Mock remittance rates (in production, these would come from actual APIs)
export interface RemittanceRate {
  provider: string
  logo: string
  rate: number
  fee: number
  deliveryTime: string
  url: string
}

export function getRemittanceRates(midMarketRate: number): RemittanceRate[] {
  // These are approximate - actual rates vary
  return [
    {
      provider: 'Wise',
      logo: '💸',
      rate: midMarketRate * 0.995, // ~0.5% spread
      fee: 4.99,
      deliveryTime: '1-2 days',
      url: 'https://wise.com'
    },
    {
      provider: 'Remitly',
      logo: '💵',
      rate: midMarketRate * 0.985, // ~1.5% spread
      fee: 0,
      deliveryTime: 'Minutes',
      url: 'https://remitly.com'
    },
    {
      provider: 'Western Union',
      logo: '🏦',
      rate: midMarketRate * 0.96, // ~4% spread
      fee: 5,
      deliveryTime: 'Minutes - 1 day',
      url: 'https://westernunion.com'
    },
    {
      provider: 'PayPal/Xoom',
      logo: '🅿️',
      rate: midMarketRate * 0.975, // ~2.5% spread
      fee: 0,
      deliveryTime: 'Minutes - 3 days',
      url: 'https://xoom.com'
    },
  ]
}

