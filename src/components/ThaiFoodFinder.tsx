import { ArrowLeft, ExternalLink, Search, Utensils } from 'lucide-react'
import { useState } from 'react'

interface ThaiFoodFinderProps {
  onBack: () => void
}

const popularDishes = [
  { name: 'Pad Thai', thai: 'ผัดไทย', emoji: '🍜' },
  { name: 'Tom Yum', thai: 'ต้มยำ', emoji: '🍲' },
  { name: 'Green Curry', thai: 'แกงเขียวหวาน', emoji: '🍛' },
  { name: 'Som Tam', thai: 'ส้มตำ', emoji: '🥗' },
  { name: 'Khao Pad', thai: 'ข้าวผัด', emoji: '🍚' },
  { name: 'Massaman Curry', thai: 'แกงมัสมั่น', emoji: '🍛' },
  { name: 'Pad Kra Pao', thai: 'ผัดกะเพรา', emoji: '🌶️' },
  { name: 'Mango Sticky Rice', thai: 'ข้าวเหนียวมะม่วง', emoji: '🥭' },
]

const searchOptions = [
  { label: 'Thai Restaurant', query: 'Thai restaurant', icon: '🍽️' },
  { label: 'Thai Grocery', query: 'Thai grocery store', icon: '🛒' },
  { label: 'Asian Market', query: 'Asian supermarket', icon: '🏪' },
  { label: 'Bubble Tea', query: 'Bubble tea boba', icon: '🧋' },
]

export default function ThaiFoodFinder({ onBack }: ThaiFoodFinderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const openGoogleMaps = (query: string) => {
    const encodedQuery = encodeURIComponent(query + ' near me')
    window.open(`https://www.google.com/maps/search/${encodedQuery}`, '_blank')
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
            🍜 Thai Food Finder
          </h2>
          <p className="text-white/40 text-xs">Find authentic Thai food near you</p>
        </div>
      </div>

      {/* Quick Search */}
      <div className="glass-card p-4 mb-3">
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for Thai food..."
            className="input-field w-full pl-10"
            onKeyDown={(e) => e.key === 'Enter' && searchQuery && openGoogleMaps(searchQuery)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {searchOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => openGoogleMaps(option.query)}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left"
            >
              <span className="text-lg">{option.icon}</span>
              <span className="text-sm text-white/80">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Dishes */}
      <div className="glass-card p-4 mb-3">
        <h3 className="text-sm font-medium text-white/80 mb-3 flex items-center gap-2">
          <Utensils size={14} className="text-gold-400" />
          Craving Something Specific?
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {popularDishes.map((dish) => (
            <button
              key={dish.name}
              onClick={() => openGoogleMaps(dish.name + ' Thai food')}
              className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-gold-500/20 transition-colors text-left group"
            >
              <span className="text-lg">{dish.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/80 truncate">{dish.name}</p>
                <p className="text-xs thai-text text-white/40 truncate">{dish.thai}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* External Links */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-medium text-white/80 mb-3">
          🔗 Find More Options
        </h3>
        <div className="space-y-2">
          <a
            href="https://www.yelp.com/search?find_desc=Thai+Restaurant"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-red-400 font-bold">Yelp</span>
              <span className="text-white/60 text-sm">- Read reviews</span>
            </div>
            <ExternalLink size={14} className="text-white/40" />
          </a>
          <a
            href="https://www.doordash.com/cuisine/thai-food-near-me/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg bg-red-600/10 hover:bg-red-600/20 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-red-500 font-bold">DoorDash</span>
              <span className="text-white/60 text-sm">- Order delivery</span>
            </div>
            <ExternalLink size={14} className="text-white/40" />
          </a>
          <a
            href="https://www.ubereats.com/category/thai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg bg-green-600/10 hover:bg-green-600/20 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-green-500 font-bold">Uber Eats</span>
              <span className="text-white/60 text-sm">- Quick delivery</span>
            </div>
            <ExternalLink size={14} className="text-white/40" />
          </a>
        </div>
      </div>
    </div>
  )
}

