import { ArrowLeft, MapPin, Bell, Palette, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { getSettings, saveSettings, THAI_CITIES, type ThaiCity, type UserSettings } from '../utils/storage'
import ZoomSlider from './ZoomSlider'

interface SettingsPanelProps {
  onBack: () => void
  zoom: number
  onZoomChange: (zoom: number) => void
}

export default function SettingsPanel({ onBack, zoom, onZoomChange }: SettingsPanelProps) {
  const [settings, setSettings] = useState<UserSettings>(getSettings())
  const [rateAlertValue, setRateAlertValue] = useState(settings.rateAlert.threshold?.toString() || '')

  const updateHometown = (city: ThaiCity) => {
    const updated = { ...settings, hometown: city }
    setSettings(updated)
    saveSettings(updated)
  }

  const updateRateAlert = (enabled: boolean, threshold?: number) => {
    const updated = {
      ...settings,
      rateAlert: {
        ...settings.rateAlert,
        enabled,
        threshold: threshold || settings.rateAlert.threshold
      }
    }
    setSettings(updated)
    saveSettings(updated)
  }

  const resetSettings = () => {
    localStorage.removeItem('siamconnect-settings')
    setSettings(getSettings())
    onZoomChange(100)
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
          <h2 className="font-display font-bold text-lg gold-text">Settings</h2>
          <p className="text-white/40 text-xs">Customize your experience</p>
        </div>
      </div>

      {/* Zoom Settings */}
      <div className="glass-card p-4 mb-3">
        <h3 className="text-sm font-medium text-white/80 mb-3 flex items-center gap-2">
          <Palette size={14} className="text-gold-400" />
          Display Size
        </h3>
        <ZoomSlider zoom={zoom} onZoomChange={onZoomChange} />
      </div>

      {/* Hometown Selection */}
      <div className="glass-card p-4 mb-3">
        <h3 className="text-sm font-medium text-white/80 mb-3 flex items-center gap-2">
          <MapPin size={14} className="text-gold-400" />
          Thai Hometown
        </h3>
        <p className="text-xs text-white/40 mb-3">Select your hometown for weather & AQI</p>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
          {THAI_CITIES.map((city) => (
            <button
              key={city.name}
              onClick={() => updateHometown(city)}
              className={`p-2 rounded-lg text-left transition-colors ${
                settings.hometown.name === city.name
                  ? 'bg-gold-500 text-night-900'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              <p className="text-sm font-medium">{city.name}</p>
              <p className="text-xs thai-text opacity-70">{city.thaiName}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Rate Alerts */}
      <div className="glass-card p-4 mb-3">
        <h3 className="text-sm font-medium text-white/80 mb-3 flex items-center gap-2">
          <Bell size={14} className="text-gold-400" />
          Exchange Rate Alert
        </h3>
        <p className="text-xs text-white/40 mb-3">Get notified when rate hits your target</p>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-white/60">Alert when 1 USD &gt;</span>
          <input
            type="number"
            value={rateAlertValue}
            onChange={(e) => setRateAlertValue(e.target.value)}
            placeholder="35.00"
            className="input-field w-24 text-center text-sm"
          />
          <span className="text-sm text-white/60">THB</span>
        </div>
        
        <button
          onClick={() => {
            const threshold = parseFloat(rateAlertValue)
            if (threshold > 0) {
              updateRateAlert(true, threshold)
            }
          }}
          disabled={!rateAlertValue || parseFloat(rateAlertValue) <= 0}
          className="w-full py-2 rounded-lg bg-gold-500/20 text-gold-400 text-sm font-medium hover:bg-gold-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {settings.rateAlert.enabled ? 'Update Alert' : 'Set Alert'}
        </button>
        
        {settings.rateAlert.enabled && settings.rateAlert.threshold && (
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-green-400">✓ Alert active at ฿{settings.rateAlert.threshold}</span>
            <button
              onClick={() => updateRateAlert(false)}
              className="text-red-400 hover:underline"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Reset */}
      <button
        onClick={resetSettings}
        className="w-full glass-card p-3 flex items-center justify-center gap-2 text-red-400 hover:bg-red-500/10 transition-colors"
      >
        <RotateCcw size={14} />
        <span className="text-sm">Reset All Settings</span>
      </button>
    </div>
  )
}

