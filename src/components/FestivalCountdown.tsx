import { ArrowLeft, PartyPopper, Sparkles } from 'lucide-react'
import { format } from 'date-fns'
import { getUpcomingFestivals, getDaysUntilNextWanPhra } from '../utils/lunarCalendar'

interface FestivalCountdownProps {
  onBack: () => void
}

const festivalEmojis: Record<string, string> = {
  'Songkran': '💦',
  'Loy Krathong': '🪷',
  'Chinese New Year': '🧧',
}

const festivalDescriptions: Record<string, string> = {
  'Songkran': 'Thai New Year water festival. Streets become water battlegrounds!',
  'Loy Krathong': 'Festival of lights. Float krathongs on water to pay respect to the water goddess.',
  'Chinese New Year': 'Celebrate with red envelopes, lion dances, and family reunions.',
}

export default function FestivalCountdown({ onBack }: FestivalCountdownProps) {
  const festivals = getUpcomingFestivals()
  const nextWanPhra = getDaysUntilNextWanPhra()

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
            <PartyPopper size={20} />
            Festival Countdown
          </h2>
          <p className="text-white/40 text-xs">Upcoming Thai celebrations</p>
        </div>
      </div>

      {/* Main Countdown - Next Festival */}
      {festivals[0] && (
        <div className="glass-card p-5 mb-4 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 left-4 text-4xl">{festivalEmojis[festivals[0].name] || '🎉'}</div>
            <div className="absolute bottom-2 right-4 text-4xl">{festivalEmojis[festivals[0].name] || '🎉'}</div>
          </div>
          
          <p className="text-white/60 text-sm mb-1">Next Festival</p>
          <h3 className="text-2xl font-display font-bold text-white mb-1">
            {festivals[0].name}
          </h3>
          <p className="thai-text text-gold-400 text-lg mb-4">{festivals[0].thaiName}</p>
          
          <div className="flex justify-center gap-3 mb-4">
            <div className="bg-gold-500/20 rounded-xl p-3 min-w-[70px]">
              <span className="text-3xl font-bold text-gold-400">
                {Math.floor(festivals[0].daysUntil / 30)}
              </span>
              <p className="text-xs text-white/50">months</p>
            </div>
            <div className="bg-gold-500/20 rounded-xl p-3 min-w-[70px]">
              <span className="text-3xl font-bold text-gold-400">
                {festivals[0].daysUntil % 30}
              </span>
              <p className="text-xs text-white/50">days</p>
            </div>
          </div>
          
          <p className="text-xs text-white/40">
            {format(festivals[0].date, 'EEEE, MMMM d, yyyy')}
          </p>
          
          <p className="text-sm text-white/60 mt-3 px-4">
            {festivalDescriptions[festivals[0].name] || ''}
          </p>
        </div>
      )}

      {/* Other Upcoming */}
      <div className="glass-card p-4 mb-4">
        <h4 className="text-sm font-medium text-white/80 mb-3 flex items-center gap-2">
          <Sparkles size={14} className="text-gold-400" />
          Coming Up
        </h4>
        <div className="space-y-3">
          {festivals.slice(1).map((festival, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                <span className="text-xl">{festivalEmojis[festival.name] || '🎉'}</span>
                <div>
                  <p className="text-sm text-white/80">{festival.name}</p>
                  <p className="text-xs thai-text text-white/50">{festival.thaiName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gold-400">{festival.daysUntil} days</p>
                <p className="text-xs text-white/40">{format(festival.date, 'MMM d')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wan Phra */}
      {nextWanPhra && (
        <div className="glass-card p-4">
          <h4 className="text-sm font-medium text-white/80 mb-3 flex items-center gap-2">
            🙏 Next Wan Phra (Buddhist Holy Day)
          </h4>
          <div className="flex items-center justify-between">
            <div>
              <p className="thai-text text-gold-400">{nextWanPhra.thaiName}</p>
              <p className="text-xs text-white/40">{format(nextWanPhra.date, 'EEEE, MMMM d')}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-gold-400">{nextWanPhra.daysUntil}</span>
              <p className="text-xs text-white/50">days</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

