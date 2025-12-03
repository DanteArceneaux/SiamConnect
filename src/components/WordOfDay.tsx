import { Volume2, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { getWordOfTheDay, THAI_WORDS } from '../utils/storage'

export default function WordOfDay() {
  const [word, setWord] = useState(getWordOfTheDay())
  const [isAnimating, setIsAnimating] = useState(false)

  const getRandomWord = () => {
    setIsAnimating(true)
    const randomIndex = Math.floor(Math.random() * THAI_WORDS.length)
    setTimeout(() => {
      setWord(THAI_WORDS[randomIndex])
      setIsAnimating(false)
    }, 300)
  }

  const speakWord = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.thai)
      utterance.lang = 'th-TH'
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="glass-card p-4 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-white/80 flex items-center gap-2">
          📚 Thai Word of the Day
        </h3>
        <button
          onClick={getRandomWord}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          title="Random word"
        >
          <RefreshCw size={14} className={`text-white/60 ${isAnimating ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl thai-text text-gold-400 font-bold">{word.thai}</span>
          <button
            onClick={speakWord}
            className="p-2 rounded-lg bg-gold-500/20 hover:bg-gold-500/30 transition-colors"
            title="Listen to pronunciation"
          >
            <Volume2 size={16} className="text-gold-400" />
          </button>
        </div>

        <div className="space-y-1">
          <p className="text-white/60 text-sm italic">/{word.romanization}/</p>
          <p className="text-white/80 text-lg">{word.english}</p>
          <span className="inline-block px-2 py-0.5 text-xs bg-silk-600/30 text-silk-300 rounded">
            {word.category}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-white/10">
        <p className="text-xs text-white/40">
          💡 Tip: Click the speaker icon to hear the pronunciation
        </p>
      </div>
    </div>
  )
}


