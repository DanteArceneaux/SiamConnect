import { useState, useEffect } from 'react'
import Header from './components/Header'
import CurrencyConverter from './components/CurrencyConverter'
import ToolsGrid, { type ToolId } from './components/ToolsGrid'
import KeyboardConverter from './components/KeyboardConverter'
import SizeConverter from './components/SizeConverter'
import BuddhistCalendar from './components/BuddhistCalendar'
import EmbassyFeed from './components/EmbassyFeed'
import TranslateToggle from './components/TranslateToggle'
import FestivalCountdown from './components/FestivalCountdown'
import ThaiFoodFinder from './components/ThaiFoodFinder'
import WordOfDay from './components/WordOfDay'
import RemittanceComparison from './components/RemittanceComparison'
import SettingsPanel from './components/SettingsPanel'
import { Settings, X, GripVertical } from 'lucide-react'
import { getSettings, saveSettings, DEFAULT_CARD_ORDER } from './utils/storage'

type ActiveTool = 'home' | ToolId | 'settings'

function App() {
  const [activeTool, setActiveTool] = useState<ActiveTool>('home')
  const [isLoaded, setIsLoaded] = useState(false)
  const [isReordering, setIsReordering] = useState(false)
  const [cardOrder, setCardOrder] = useState<string[]>(() => {
    return getSettings().cardOrder || DEFAULT_CARD_ORDER
  })
  const [zoom, setZoom] = useState(() => {
    const saved = localStorage.getItem('siamconnect-zoom')
    return saved ? parseFloat(saved) : 100
  })
  const [draggedCard, setDraggedCard] = useState<string | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    localStorage.setItem('siamconnect-zoom', zoom.toString())
  }, [zoom])

  useEffect(() => {
    saveSettings({ cardOrder })
  }, [cardOrder])

  const handleDragStart = (cardId: string) => {
    setDraggedCard(cardId)
  }

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (!draggedCard || draggedCard === targetId) return
    
    const newOrder = [...cardOrder]
    const draggedIndex = newOrder.indexOf(draggedCard)
    const targetIndex = newOrder.indexOf(targetId)
    
    newOrder.splice(draggedIndex, 1)
    newOrder.splice(targetIndex, 0, draggedCard)
    
    setCardOrder(newOrder)
  }

  const handleDragEnd = () => {
    setDraggedCard(null)
  }

  const cards: Record<string, React.ReactNode> = {
    weather: <Header key="weather" />,
    currency: <CurrencyConverter key="currency" />,
    tools: <ToolsGrid key="tools" onSelectTool={(tool) => setActiveTool(tool)} />,
    translation: <TranslateToggle key="translation" />,
  }

  const renderContent = () => {
    switch (activeTool) {
      case 'keyboard':
        return <KeyboardConverter onBack={() => setActiveTool('home')} />
      case 'size':
        return <SizeConverter onBack={() => setActiveTool('home')} />
      case 'calendar':
        return <BuddhistCalendar onBack={() => setActiveTool('home')} />
      case 'embassy':
        return <EmbassyFeed onBack={() => setActiveTool('home')} />
      case 'festivals':
        return <FestivalCountdown onBack={() => setActiveTool('home')} />
      case 'food':
        return <ThaiFoodFinder onBack={() => setActiveTool('home')} />
      case 'word':
        return (
          <div className="animate-fade-in">
            <button
              onClick={() => setActiveTool('home')}
              className="flex items-center gap-2 mb-4 text-white/60 hover:text-white/80"
            >
              ← Back
            </button>
            <WordOfDay />
          </div>
        )
      case 'remittance':
        return <RemittanceComparison onBack={() => setActiveTool('home')} />
      case 'settings':
        return (
          <SettingsPanel
            onBack={() => setActiveTool('home')}
            zoom={zoom}
            onZoomChange={setZoom}
          />
        )
      default:
        return (
          <>
            {/* Reorder Toggle */}
            <div className="flex justify-end mb-2 px-4">
              <button
                onClick={() => setIsReordering(!isReordering)}
                className={`text-xs flex items-center gap-1 px-2 py-1 rounded-lg transition-colors ${
                  isReordering
                    ? 'bg-gold-500/20 text-gold-400'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                <GripVertical size={12} />
                {isReordering ? 'Done' : 'Reorder'}
              </button>
            </div>
            
            {/* Render cards in order */}
            {cardOrder.map((cardId) => {
              const card = cards[cardId]
              if (!card) return null
              
              if (cardId === 'weather') {
                // Weather card is not in the scrollable area
                return null
              }
              
              return (
                <div
                  key={cardId}
                  draggable={isReordering}
                  onDragStart={() => handleDragStart(cardId)}
                  onDragOver={(e) => handleDragOver(e, cardId)}
                  onDragEnd={handleDragEnd}
                  className={`${isReordering ? 'cursor-move' : ''} ${
                    draggedCard === cardId ? 'opacity-50' : ''
                  } transition-opacity`}
                >
                  {isReordering && (
                    <div className="flex items-center justify-center gap-1 text-white/30 text-xs mb-1">
                      <GripVertical size={10} />
                      <span>Drag to reorder</span>
                    </div>
                  )}
                  {card}
                </div>
              )
            })}
          </>
        )
    }
  }

  return (
    <div 
      className={`min-h-[580px] w-[420px] thai-pattern flex flex-col ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
      style={{ 
        zoom: `${zoom}%`,
      }}
    >
      {/* Top bar with logo and settings */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <button
          onClick={() => setActiveTool('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
            <span className="text-night-900 font-bold text-sm">ส</span>
          </div>
          <span className="font-display text-lg gold-text font-bold tracking-tight">
            SiamConnect
          </span>
        </button>
        <button 
          onClick={() => setActiveTool(activeTool === 'settings' ? 'home' : 'settings')}
          className={`p-2 rounded-lg transition-colors ${
            activeTool === 'settings' 
              ? 'bg-gold-500/20 text-gold-400' 
              : 'hover:bg-white/10 text-white/60 hover:text-white/80'
          }`}
        >
          {activeTool === 'settings' ? <X size={18} /> : <Settings size={18} />}
        </button>
      </div>

      {/* Header with weather and time - always visible on home */}
      {activeTool === 'home' && <Header />}

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {renderContent()}
      </div>
    </div>
  )
}

export default App
