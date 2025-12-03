import { useState } from 'react'
import { ArrowLeft, Shirt, ChefHat, Thermometer, Scale } from 'lucide-react'

interface SizeConverterProps {
  onBack: () => void
}

type Category = 'clothes' | 'kitchen' | 'temperature' | 'weight'

const usSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const sizeMapping: Record<string, { asian: string; numericUS: string; numericAsian: string }> = {
  'XS': { asian: '155/80A', numericUS: '0-2', numericAsian: '32-34' },
  'S': { asian: '160/84A', numericUS: '4-6', numericAsian: '36-38' },
  'M': { asian: '165/88A', numericUS: '8-10', numericAsian: '40-42' },
  'L': { asian: '170/92A', numericUS: '12-14', numericAsian: '44' },
  'XL': { asian: '175/96A', numericUS: '16', numericAsian: '46' },
  'XXL': { asian: '180/100A', numericUS: '18', numericAsian: '48' },
}

const ingredientSubs: { us: string; thai: string; sub: string }[] = [
  { us: 'Holy Basil', thai: 'กะเพรา', sub: 'Thai basil + mint, or Italian basil with basil seeds' },
  { us: 'Galangal', thai: 'ข่า', sub: 'Ginger (milder, but similar texture)' },
  { us: 'Kaffir Lime Leaves', thai: 'ใบมะกรูด', sub: 'Lime zest + bay leaf' },
  { us: 'Palm Sugar', thai: 'น้ำตาลปีบ', sub: 'Brown sugar + molasses' },
  { us: 'Fish Sauce', thai: 'น้ำปลา', sub: 'Soy sauce + lime juice + salt' },
  { us: 'Shrimp Paste', thai: 'กะปิ', sub: 'Anchovy paste + soy sauce' },
]

export default function SizeConverter({ onBack }: SizeConverterProps) {
  const [category, setCategory] = useState<Category>('clothes')
  const [selectedSize, setSelectedSize] = useState<string>('M')
  const [fahrenheit, setFahrenheit] = useState<string>('350')
  const [pounds, setPounds] = useState<string>('1')

  const categories: { id: Category; icon: typeof Shirt; label: string }[] = [
    { id: 'clothes', icon: Shirt, label: 'Clothes' },
    { id: 'kitchen', icon: ChefHat, label: 'Cooking' },
    { id: 'temperature', icon: Thermometer, label: 'Temp' },
    { id: 'weight', icon: Scale, label: 'Weight' },
  ]

  const fahrenheitToCelsius = (f: number) => ((f - 32) * 5 / 9).toFixed(0)
  const poundsToKg = (lb: number) => (lb * 0.453592).toFixed(2)
  const poundsToGrams = (lb: number) => (lb * 453.592).toFixed(0)

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
          <h2 className="font-display font-bold text-lg gold-text">Size & Measurements</h2>
          <p className="text-white/40 text-xs">US to Asian conversions</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg transition-all ${
              category === cat.id
                ? 'bg-tropical-500 text-white'
                : 'glass-card text-white/60 hover:text-white'
            }`}
          >
            <cat.icon size={18} />
            <span className="text-xs font-medium">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Clothes Converter */}
      {category === 'clothes' && (
        <div className="glass-card p-4">
          <h3 className="text-sm font-medium text-white/80 mb-3">Select US Size</h3>
          <div className="grid grid-cols-6 gap-2 mb-4">
            {usSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedSize === size
                    ? 'bg-gold-500 text-night-900'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          
          {selectedSize && sizeMapping[selectedSize] && (
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-sm">Asian Size (Letter)</span>
                <span className="text-gold-400 font-medium">{sizeMapping[selectedSize].asian}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-sm">US Numeric</span>
                <span className="text-white/80">{sizeMapping[selectedSize].numericUS}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-sm">Asian Numeric</span>
                <span className="text-gold-400 font-medium">{sizeMapping[selectedSize].numericAsian}</span>
              </div>
            </div>
          )}
          
          <div className="mt-3 p-2 rounded-lg bg-silk-900/30 text-xs text-white/50">
            💡 Tip: Asian sizes often run 1-2 sizes smaller. When in doubt, size up!
          </div>
        </div>
      )}

      {/* Kitchen Substitutes */}
      {category === 'kitchen' && (
        <div className="glass-card p-4">
          <h3 className="text-sm font-medium text-white/80 mb-3">Thai Ingredient Substitutes</h3>
          <div className="space-y-3 max-h-[280px] overflow-y-auto">
            {ingredientSubs.map((item, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gold-400">{item.us}</span>
                  <span className="text-white/40">•</span>
                  <span className="thai-text text-white/60 text-sm">{item.thai}</span>
                </div>
                <p className="text-xs text-white/50">→ {item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Temperature Converter */}
      {category === 'temperature' && (
        <div className="glass-card p-4">
          <h3 className="text-sm font-medium text-white/80 mb-3">Oven Temperature</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <label className="text-xs text-white/40 mb-1 block">Fahrenheit (°F)</label>
              <input
                type="number"
                value={fahrenheit}
                onChange={(e) => setFahrenheit(e.target.value)}
                className="input-field w-full text-center text-lg font-mono"
              />
            </div>
            <span className="text-gold-400 text-xl mt-4">=</span>
            <div className="flex-1">
              <label className="text-xs text-white/40 mb-1 block">Celsius (°C)</label>
              <div className="input-field w-full text-center text-lg font-mono bg-white/5">
                {fahrenheitToCelsius(parseFloat(fahrenheit) || 0)}
              </div>
            </div>
          </div>
          
          <h4 className="text-xs text-white/60 mb-2">Common Oven Temps</h4>
          <div className="grid grid-cols-3 gap-2">
            {[{ f: 300, label: 'Low' }, { f: 350, label: 'Medium' }, { f: 400, label: 'High' }, { f: 425, label: 'Hot' }, { f: 450, label: 'Very Hot' }, { f: 500, label: 'Broil' }].map((temp) => (
              <button
                key={temp.f}
                onClick={() => setFahrenheit(temp.f.toString())}
                className={`p-2 rounded-lg text-xs transition-colors ${
                  fahrenheit === temp.f.toString()
                    ? 'bg-gold-500 text-night-900'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                <div className="font-medium">{temp.f}°F</div>
                <div className="text-[10px] opacity-70">{fahrenheitToCelsius(temp.f)}°C • {temp.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Weight Converter */}
      {category === 'weight' && (
        <div className="glass-card p-4">
          <h3 className="text-sm font-medium text-white/80 mb-3">Weight Conversion</h3>
          <div className="mb-4">
            <label className="text-xs text-white/40 mb-1 block">Pounds (lb)</label>
            <input
              type="number"
              value={pounds}
              onChange={(e) => setPounds(e.target.value)}
              className="input-field w-full text-lg font-mono"
              step="0.1"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-white/5 text-center">
              <div className="text-xs text-white/40 mb-1">Kilograms</div>
              <div className="text-xl font-mono text-gold-400">
                {poundsToKg(parseFloat(pounds) || 0)} kg
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 text-center">
              <div className="text-xs text-white/40 mb-1">Grams</div>
              <div className="text-xl font-mono text-gold-400">
                {poundsToGrams(parseFloat(pounds) || 0)} g
              </div>
            </div>
          </div>
          
          <div className="mt-3 grid grid-cols-4 gap-2">
            {['0.25', '0.5', '1', '2'].map((lb) => (
              <button
                key={lb}
                onClick={() => setPounds(lb)}
                className={`py-1.5 rounded-lg text-xs transition-colors ${
                  pounds === lb
                    ? 'bg-gold-500 text-night-900'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {lb} lb
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

