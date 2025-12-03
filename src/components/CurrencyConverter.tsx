import { useState, useEffect } from 'react'
import { ArrowRightLeft, TrendingUp, TrendingDown, Bell, RefreshCw } from 'lucide-react'

interface ExchangeRate {
  rate: number
  change: number
  lastUpdate: string
}

export default function CurrencyConverter() {
  const [usdAmount, setUsdAmount] = useState<string>('1000')
  const [thbAmount, setThbAmount] = useState<string>('')
  const [isReversed, setIsReversed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rate, setRate] = useState<ExchangeRate>({
    rate: 34.52,
    change: 0.15,
    lastUpdate: 'Just now'
  })

  useEffect(() => {
    calculateConversion()
  }, [usdAmount, rate.rate, isReversed])

  const calculateConversion = () => {
    const amount = parseFloat(usdAmount) || 0
    if (isReversed) {
      // THB to USD
      setThbAmount((amount / rate.rate).toFixed(2))
    } else {
      // USD to THB
      setThbAmount((amount * rate.rate).toFixed(2))
    }
  }

  const handleSwap = () => {
    setIsReversed(!isReversed)
    setUsdAmount(thbAmount)
  }

  const refreshRate = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setRate(prev => ({
      ...prev,
      rate: prev.rate + (Math.random() - 0.5) * 0.1,
      change: (Math.random() - 0.5) * 0.3,
      lastUpdate: 'Just now'
    }))
    setIsLoading(false)
  }

  const formatNumber = (num: string) => {
    const parts = num.split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  }

  const isPositive = rate.change >= 0

  return (
    <div className="glass-card p-4 mb-3 animate-fade-in stagger-2">
      {/* Rate Display */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-display font-bold gold-text">
            $1 = ฿{rate.rate.toFixed(2)}
          </span>
          <span className={`flex items-center gap-0.5 text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {isPositive ? '+' : ''}{rate.change.toFixed(2)}%
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={refreshRate}
            className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors ${isLoading ? 'animate-spin' : ''}`}
            title="Refresh rate"
          >
            <RefreshCw size={14} className="text-white/60" />
          </button>
          <button
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            title="Set alert"
          >
            <Bell size={14} className="text-white/60" />
          </button>
        </div>
      </div>

      {/* Converter */}
      <div className="space-y-3">
        {/* From Currency */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <span className="text-lg">{isReversed ? '🇹🇭' : '🇺🇸'}</span>
            <span className="text-white/60 text-sm font-medium w-10">
              {isReversed ? 'THB' : 'USD'}
            </span>
          </div>
          <input
            type="text"
            value={formatNumber(usdAmount)}
            onChange={(e) => setUsdAmount(e.target.value.replace(/,/g, ''))}
            className="input-field w-full pl-20 pr-4 text-right text-lg font-mono"
            placeholder="0.00"
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="p-2 rounded-full bg-gold-500/20 hover:bg-gold-500/30 transition-colors group"
          >
            <ArrowRightLeft size={18} className="text-gold-400 group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>

        {/* To Currency */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <span className="text-lg">{isReversed ? '🇺🇸' : '🇹🇭'}</span>
            <span className="text-white/60 text-sm font-medium w-10">
              {isReversed ? 'USD' : 'THB'}
            </span>
          </div>
          <div className="input-field w-full pl-20 pr-4 text-right text-lg font-mono bg-white/5">
            {formatNumber(thbAmount)}
          </div>
        </div>
      </div>

      {/* Quick Amounts */}
      <div className="flex gap-2 mt-4">
        {['100', '500', '1000', '5000'].map((amount) => (
          <button
            key={amount}
            onClick={() => setUsdAmount(amount)}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              usdAmount === amount
                ? 'bg-gold-500 text-night-900'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            {isReversed ? '฿' : '$'}{formatNumber(amount)}
          </button>
        ))}
      </div>

      {/* Remittance Info */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/40">Sending home</span>
          <span className="text-white/60">
            ${formatNumber(usdAmount)} → <span className="text-gold-400 font-medium">฿{formatNumber(thbAmount)}</span>
          </span>
        </div>
        <div className="text-white/30 text-[10px] mt-1">
          Mid-market rate • Bank rates may vary
        </div>
      </div>
    </div>
  )
}


