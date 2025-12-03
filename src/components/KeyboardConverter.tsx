import { useState } from 'react'
import { ArrowLeft, Copy, Check, ArrowRightLeft, Keyboard } from 'lucide-react'

interface KeyboardConverterProps {
  onBack: () => void
}

// English QWERTY to Thai Kedmanee mapping
const engToThai: Record<string, string> = {
  // Row 1
  '`': '_', '1': 'ๅ', '2': '/', '3': '-', '4': 'ภ', '5': 'ถ', '6': 'ุ', '7': 'ึ', '8': 'ค', '9': 'ต', '0': 'จ', '-': 'ข', '=': 'ช',
  '~': '%', '!': '+', '@': '๑', '#': '๒', '$': '๓', '%': '๔', '^': 'ู', '&': '฿', '*': '๕', '(': '๖', ')': '๗', '_': '๘', '+': '๙',
  // Row 2
  'q': 'ๆ', 'w': 'ไ', 'e': 'ำ', 'r': 'พ', 't': 'ะ', 'y': 'ั', 'u': 'ี', 'i': 'ร', 'o': 'น', 'p': 'ย', '[': 'บ', ']': 'ล', '\\': 'ฃ',
  'Q': '๐', 'W': '"', 'E': 'ฎ', 'R': 'ฑ', 'T': 'ธ', 'Y': 'ํ', 'U': '๊', 'I': 'ณ', 'O': 'ฯ', 'P': 'ญ', '{': 'ฐ', '}': ',', '|': 'ฅ',
  // Row 3
  'a': 'ฟ', 's': 'ห', 'd': 'ก', 'f': 'ด', 'g': 'เ', 'h': '้', 'j': '่', 'k': 'า', 'l': 'ส', ';': 'ว', "'": 'ง',
  'A': 'ฤ', 'S': 'ฆ', 'D': 'ฏ', 'F': 'โ', 'G': 'ฌ', 'H': '็', 'J': '๋', 'K': 'ษ', 'L': 'ศ', ':': 'ซ', '"': '.',
  // Row 4
  'z': 'ผ', 'x': 'ป', 'c': 'แ', 'v': 'อ', 'b': 'ิ', 'n': 'ื', 'm': 'ท', ',': 'ม', '.': 'ใ', '/': 'ฝ',
  'Z': '(', 'X': ')', 'C': 'ฉ', 'V': 'ฮ', 'B': 'ฺ', 'N': '์', 'M': '?', '<': 'ฒ', '>': 'ฬ', '?': 'ฦ',
}

// Thai to English reverse mapping
const thaiToEng: Record<string, string> = Object.fromEntries(
  Object.entries(engToThai).map(([eng, thai]) => [thai, eng])
)

export default function KeyboardConverter({ onBack }: KeyboardConverterProps) {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [direction, setDirection] = useState<'engToThai' | 'thaiToEng'>('engToThai')
  const [copied, setCopied] = useState(false)

  const convert = (text: string, dir: 'engToThai' | 'thaiToEng') => {
    const mapping = dir === 'engToThai' ? engToThai : thaiToEng
    return text.split('').map(char => mapping[char] || char).join('')
  }

  const handleInputChange = (text: string) => {
    setInputText(text)
    setOutputText(convert(text, direction))
  }

  const handleSwapDirection = () => {
    const newDirection = direction === 'engToThai' ? 'thaiToEng' : 'engToThai'
    setDirection(newDirection)
    // Swap input and output
    const temp = inputText
    setInputText(outputText)
    setOutputText(temp)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
          <h2 className="font-display font-bold text-lg gold-text">Keyboard Converter</h2>
          <p className="text-white/40 text-xs">Fix mistyped text from wrong keyboard</p>
        </div>
      </div>

      {/* Direction Toggle */}
      <div className="glass-card p-3 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            direction === 'engToThai' ? 'bg-silk-600 text-white' : 'bg-white/10 text-white/60'
          }`}>
            🇺🇸 English → 🇹🇭 Thai
          </div>
          <button
            onClick={handleSwapDirection}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ArrowRightLeft size={16} className="text-white/60" />
          </button>
          <div className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            direction === 'thaiToEng' ? 'bg-silk-600 text-white' : 'bg-white/10 text-white/60'
          }`}>
            🇹🇭 Thai → 🇺🇸 English
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="glass-card p-4 mb-3">
        <div className="flex items-center gap-2 mb-2 text-white/40 text-xs">
          <Keyboard size={12} />
          <span>{direction === 'engToThai' ? 'Type English (wrong keyboard)' : 'Type Thai (wrong keyboard)'}</span>
        </div>
        <textarea
          value={inputText}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={direction === 'engToThai' ? 'e.g., "g-jo" → "เกม"' : 'e.g., "เกม" → "game"'}
          className="input-field w-full h-24 resize-none text-base"
        />
      </div>

      {/* Output Area */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/40 text-xs">Converted text</span>
          <button
            onClick={handleCopy}
            disabled={!outputText}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              copied
                ? 'bg-green-500/20 text-green-400'
                : outputText
                ? 'bg-gold-500/20 text-gold-400 hover:bg-gold-500/30'
                : 'bg-white/5 text-white/20 cursor-not-allowed'
            }`}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className={`input-field w-full min-h-24 text-base thai-text ${!outputText && 'text-white/30'}`}>
          {outputText || 'Converted text will appear here...'}
        </div>
      </div>

      {/* Example */}
      <div className="mt-4 p-3 rounded-lg bg-silk-900/30 border border-silk-700/30">
        <div className="text-xs text-white/60 mb-2">💡 Common Example:</div>
        <div className="text-sm">
          <span className="text-white/40">You typed:</span>{' '}
          <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/80">g-jo</code>
          <br />
          <span className="text-white/40">Should be:</span>{' '}
          <span className="thai-text text-gold-400 font-medium">เกม</span>
        </div>
      </div>
    </div>
  )
}


