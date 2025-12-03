import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

interface ZoomSliderProps {
  zoom: number
  onZoomChange: (zoom: number) => void
}

export default function ZoomSlider({ zoom, onZoomChange }: ZoomSliderProps) {
  const minZoom = 60
  const maxZoom = 120
  const defaultZoom = 100

  const handleReset = () => {
    onZoomChange(defaultZoom)
  }

  return (
    <div className="mx-4 mb-3 glass-card p-3 animate-fade-in">
      <div className="flex items-center gap-3">
        {/* Zoom Out Icon */}
        <button
          onClick={() => onZoomChange(Math.max(minZoom, zoom - 5))}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
          title="Zoom out"
        >
          <ZoomOut size={16} />
        </button>

        {/* Slider */}
        <div className="flex-1 relative">
          <input
            type="range"
            min={minZoom}
            max={maxZoom}
            value={zoom}
            onChange={(e) => onZoomChange(parseInt(e.target.value))}
            className="zoom-slider w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${((zoom - minZoom) / (maxZoom - minZoom)) * 100}%, rgba(255,255,255,0.2) ${((zoom - minZoom) / (maxZoom - minZoom)) * 100}%, rgba(255,255,255,0.2) 100%)`
            }}
          />
          {/* Zoom percentage label */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-gold-400 font-medium">
            {zoom}%
          </div>
        </div>

        {/* Zoom In Icon */}
        <button
          onClick={() => onZoomChange(Math.min(maxZoom, zoom + 5))}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
          title="Zoom in"
        >
          <ZoomIn size={16} />
        </button>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className={`p-1.5 rounded-lg transition-colors ${
            zoom === defaultZoom 
              ? 'text-white/30 cursor-not-allowed' 
              : 'hover:bg-white/10 text-white/60 hover:text-white'
          }`}
          disabled={zoom === defaultZoom}
          title="Reset to 100%"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* Quick zoom buttons */}
      <div className="flex items-center justify-center gap-2 mt-2">
        {[70, 85, 100, 110].map((level) => (
          <button
            key={level}
            onClick={() => onZoomChange(level)}
            className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
              zoom === level
                ? 'bg-gold-500 text-night-900'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            {level}%
          </button>
        ))}
      </div>
    </div>
  )
}


