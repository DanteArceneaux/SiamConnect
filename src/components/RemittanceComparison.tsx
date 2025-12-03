import { ArrowLeft, ExternalLink, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getRemittanceRates, type RemittanceRate } from '../utils/weatherApi'

interface RemittanceComparisonProps {
  onBack: () => void
}

export default function RemittanceComparison({ onBack }: RemittanceComparisonProps) {
  const [amount, setAmount] = useState(1000)
  const [midMarketRate] = useState(34.52)
  const [rates, setRates] = useState<RemittanceRate[]>([])
  const [sortBy, setSortBy] = useState<'rate' | 'fee' | 'total'>('total')

  useEffect(() => {
    setRates(getRemittanceRates(midMarketRate))
  }, [midMarketRate])

  const calculateReceived = (rate: RemittanceRate) => {
    return (amount - rate.fee) * rate.rate
  }

  const sortedRates = [...rates].sort((a, b) => {
    if (sortBy === 'rate') return b.rate - a.rate
    if (sortBy === 'fee') return a.fee - b.fee
    return calculateReceived(b) - calculateReceived(a)
  })

  const bestRate = sortedRates[0]

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
            💸 Remittance Rates
          </h2>
          <p className="text-white/40 text-xs">Compare services to send money home</p>
        </div>
      </div>

      {/* Amount Input */}
      <div className="glass-card p-4 mb-3">
        <label className="text-sm text-white/60 mb-2 block">Amount to Send (USD)</label>
        <div className="flex gap-2">
          {[500, 1000, 2000, 5000].map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(amt)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                amount === amt
                  ? 'bg-gold-500 text-night-900'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              ${amt.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Mid-market Rate Reference */}
      <div className="glass-card p-3 mb-3 flex items-center justify-between">
        <span className="text-xs text-white/50">Mid-market rate</span>
        <span className="text-sm text-white/80">$1 = ฿{midMarketRate.toFixed(2)}</span>
      </div>

      {/* Sort Options */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setSortBy('total')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            sortBy === 'total' ? 'bg-silk-600 text-white' : 'bg-white/10 text-white/60'
          }`}
        >
          Best Value
        </button>
        <button
          onClick={() => setSortBy('rate')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            sortBy === 'rate' ? 'bg-silk-600 text-white' : 'bg-white/10 text-white/60'
          }`}
        >
          Best Rate
        </button>
        <button
          onClick={() => setSortBy('fee')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            sortBy === 'fee' ? 'bg-silk-600 text-white' : 'bg-white/10 text-white/60'
          }`}
        >
          Lowest Fee
        </button>
      </div>

      {/* Rate Comparison */}
      <div className="space-y-2">
        {sortedRates.map((rate) => {
          const received = calculateReceived(rate)
          const isBest = rate === bestRate
          
          return (
            <a
              key={rate.provider}
              href={rate.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-card p-4 block transition-all hover:scale-[1.02] ${
                isBest ? 'ring-1 ring-gold-500/50' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{rate.logo}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white/90">{rate.provider}</span>
                      {isBest && (
                        <span className="px-1.5 py-0.5 text-[10px] bg-gold-500 text-night-900 rounded font-medium">
                          BEST
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <Clock size={10} />
                      <span>{rate.deliveryTime}</span>
                    </div>
                  </div>
                </div>
                <ExternalLink size={14} className="text-white/30" />
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-white/40">Rate</p>
                  <p className="text-sm font-mono text-white/80">฿{rate.rate.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40">Fee</p>
                  <p className="text-sm font-mono text-white/80">
                    {rate.fee === 0 ? 'Free' : `$${rate.fee}`}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-white/40">They Get</p>
                  <p className={`text-sm font-mono font-bold ${isBest ? 'text-gold-400' : 'text-white/80'}`}>
                    ฿{received.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            </a>
          )
        })}
      </div>

      {/* Disclaimer */}
      <p className="text-[10px] text-white/30 mt-3 text-center">
        Rates are estimates and may vary. Check provider websites for current rates.
      </p>
    </div>
  )
}

