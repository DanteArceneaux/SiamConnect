import { Keyboard, Ruler, Calendar, Newspaper, PartyPopper, Utensils, BookOpen, DollarSign } from 'lucide-react'

export type ToolId = 'keyboard' | 'size' | 'calendar' | 'embassy' | 'festivals' | 'food' | 'word' | 'remittance'

interface ToolsGridProps {
  onSelectTool: (tool: ToolId) => void
}

const tools: { id: ToolId; icon: typeof Keyboard; label: string; description: string; color: string; hoverGlow: string }[] = [
  {
    id: 'keyboard',
    icon: Keyboard,
    label: 'Fix Text',
    description: 'Convert keyboard',
    color: 'from-silk-500 to-silk-600',
    hoverGlow: 'hover:shadow-silk-500/30'
  },
  {
    id: 'size',
    icon: Ruler,
    label: 'Size Convert',
    description: 'Clothes & Kitchen',
    color: 'from-tropical-500 to-tropical-600',
    hoverGlow: 'hover:shadow-tropical-500/30'
  },
  {
    id: 'calendar',
    icon: Calendar,
    label: 'วันพระ',
    description: 'Buddhist Calendar',
    color: 'from-gold-500 to-gold-600',
    hoverGlow: 'hover:shadow-gold-500/30'
  },
  {
    id: 'embassy',
    icon: Newspaper,
    label: 'Embassy',
    description: 'News & Alerts',
    color: 'from-temple-500 to-temple-600',
    hoverGlow: 'hover:shadow-temple-500/30'
  },
  {
    id: 'festivals',
    icon: PartyPopper,
    label: 'Festivals',
    description: 'Countdown',
    color: 'from-pink-500 to-pink-600',
    hoverGlow: 'hover:shadow-pink-500/30'
  },
  {
    id: 'food',
    icon: Utensils,
    label: 'Thai Food',
    description: 'Find nearby',
    color: 'from-orange-500 to-orange-600',
    hoverGlow: 'hover:shadow-orange-500/30'
  },
  {
    id: 'word',
    icon: BookOpen,
    label: 'Learn Thai',
    description: 'Word of day',
    color: 'from-cyan-500 to-cyan-600',
    hoverGlow: 'hover:shadow-cyan-500/30'
  },
  {
    id: 'remittance',
    icon: DollarSign,
    label: 'Send Money',
    description: 'Compare rates',
    color: 'from-green-500 to-green-600',
    hoverGlow: 'hover:shadow-green-500/30'
  }
]

export default function ToolsGrid({ onSelectTool }: ToolsGridProps) {
  return (
    <div className="grid grid-cols-4 gap-2 mb-3 animate-fade-in stagger-3">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => onSelectTool(tool.id)}
          className={`glass-card p-2.5 flex flex-col items-center gap-1.5 hover:scale-105 transition-all duration-200 hover:shadow-lg ${tool.hoverGlow} group`}
        >
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <tool.icon size={18} className="text-white" />
          </div>
          <div className="text-center">
            <div className="text-[11px] font-medium text-white/90 leading-tight">{tool.label}</div>
            <div className="text-[9px] text-white/40 leading-tight">{tool.description}</div>
          </div>
        </button>
      ))}
    </div>
  )
}
