import { useState } from 'react'
import { Languages, BookOpen, ExternalLink } from 'lucide-react'

export default function TranslateToggle() {
  const [isHoverMode, setIsHoverMode] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const showStatus = (message: string, duration = 2000) => {
    setStatus(message)
    setTimeout(() => setStatus(null), duration)
  }

  const handleTranslatePage = async () => {
    setIsLoading(true)
    
    // Check if we're in a Chrome extension context
    if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
      try {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
        
        if (tabs[0]?.id && tabs[0].url) {
          // Simply redirect to Google Translate - no need for content script
          const translateUrl = `https://translate.google.com/translate?sl=en&tl=th&u=${encodeURIComponent(tabs[0].url)}`
          
          try {
            await chrome.tabs.update(tabs[0].id, { url: translateUrl })
            showStatus('✓ Translating page...')
          } catch (err) {
            // Fallback: open in new tab
            window.open(translateUrl, '_blank')
            showStatus('✓ Opened in new tab')
          }
        } else {
          showStatus('⚠ No active tab found')
        }
      } catch (error) {
        console.error('Translation error:', error)
        showStatus('⚠ Could not translate page')
      }
    } else {
      // Development fallback
      window.open('https://translate.google.com/?sl=en&tl=th', '_blank')
      showStatus('✓ Opened Google Translate')
    }
    
    setIsLoading(false)
  }

  const toggleHoverMode = async () => {
    const newMode = !isHoverMode
    setIsLoading(true)
    
    if (typeof chrome !== 'undefined' && chrome.tabs && chrome.scripting) {
      try {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
        
        if (tabs[0]?.id && tabs[0].url && !tabs[0].url.startsWith('chrome://') && !tabs[0].url.startsWith('chrome-extension://')) {
          // Inject content script dynamically
          try {
            await chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              files: ['content.js']
            })
            
            // Inject CSS
            await chrome.scripting.insertCSS({
              target: { tabId: tabs[0].id },
              files: ['content.css']
            })
            
            // Wait a bit for script to initialize, then send message
            setTimeout(async () => {
              try {
                const response = await chrome.tabs.sendMessage(tabs[0].id!, { 
                  action: 'toggleHoverTranslate',
                  enabled: newMode 
                })
                
                if (response?.success) {
                  setIsHoverMode(newMode)
                  showStatus(newMode ? '✓ Dictionary enabled' : '✓ Dictionary disabled')
                  
                  // Save state
                  if (chrome.storage) {
                    chrome.storage.local.set({ hoverTranslateEnabled: newMode })
                  }
                }
              } catch (err) {
                console.error('Message send error:', err)
                showStatus('⚠ Please try again')
              }
            }, 100)
          } catch (err) {
            console.error('Script injection error:', err)
            showStatus('⚠ Cannot inject on this page')
          }
        } else {
          showStatus('⚠ Cannot use on this page')
        }
      } catch (error) {
        console.error('Toggle error:', error)
        showStatus('⚠ Could not toggle dictionary')
      }
    } else {
      // Development mode - just toggle the state
      setIsHoverMode(newMode)
      showStatus(newMode ? '✓ Dictionary enabled (dev mode)' : '✓ Dictionary disabled')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="glass-card p-4 animate-fade-in stagger-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Languages size={16} className="text-gold-400" />
          <span className="text-sm font-medium text-white/80">Translation</span>
        </div>
        {status && (
          <span className="text-xs text-gold-400 animate-pulse">{status}</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* Translate Page Button */}
        <button
          onClick={handleTranslatePage}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-night-900 font-medium text-sm hover:shadow-lg hover:shadow-gold-500/30 transition-all disabled:opacity-50"
        >
          <Languages size={16} />
          <span>Translate Page</span>
        </button>

        {/* Hover Dictionary Toggle */}
        <button
          onClick={toggleHoverMode}
          disabled={isLoading}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition-all disabled:opacity-50 ${
            isHoverMode
              ? 'bg-silk-600 text-white'
              : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
          }`}
        >
          <BookOpen size={16} />
          <span>{isHoverMode ? 'Dict: ON' : 'Hover Dict'}</span>
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-3 text-xs text-white/40">
        {isHoverMode ? (
          <p className="flex items-center gap-1">
            <span className="text-green-400">●</span>
            Double-click any word to see Thai translation
          </p>
        ) : (
          <p>Enable hover dictionary to translate individual words</p>
        )}
      </div>

      {/* Quick Links */}
      <div className="mt-3 pt-3 border-t border-white/10 flex gap-2">
        <a
          href="https://translate.google.com/?sl=en&tl=th"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-white/5 text-white/50 text-xs hover:bg-white/10 hover:text-white/70 transition-colors"
        >
          Google Translate <ExternalLink size={10} />
        </a>
        <a
          href="https://www.thai-language.com/dict"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-white/5 text-white/50 text-xs hover:bg-white/10 hover:text-white/70 transition-colors"
        >
          Thai Dictionary <ExternalLink size={10} />
        </a>
      </div>
    </div>
  )
}
