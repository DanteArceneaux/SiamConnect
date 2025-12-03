// SiamConnect Background Service Worker

// Currency rate cache
let cachedRate = {
  rate: 34.52,
  timestamp: Date.now(),
  change: 0.15
}

// Fetch exchange rate from API
async function fetchExchangeRate() {
  try {
    // Using exchangerate-api.com (free tier)
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
    if (response.ok) {
      const data = await response.json()
      const newRate = data.rates.THB
      const change = ((newRate - cachedRate.rate) / cachedRate.rate) * 100
      
      cachedRate = {
        rate: newRate,
        timestamp: Date.now(),
        change: change
      }
      
      // Store in chrome.storage
      chrome.storage.local.set({ exchangeRate: cachedRate })
      
      return cachedRate
    }
  } catch (error) {
    console.error('Failed to fetch exchange rate:', error)
  }
  return cachedRate
}

// Set up alarms for periodic updates
chrome.runtime.onInstalled.addListener(() => {
  // Fetch rate immediately
  fetchExchangeRate()
  
  // Set up alarm to fetch rate every 30 minutes
  chrome.alarms.create('fetchRate', { periodInMinutes: 30 })
  
  // Initialize default settings
  chrome.storage.local.set({
    settings: {
      homeTown: 'Bangkok',
      notificationsEnabled: true,
      rateAlertThreshold: null,
      hoverTranslateEnabled: false
    }
  })
})

// Handle alarms
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'fetchRate') {
    fetchExchangeRate()
  }
})

// Message handler
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getRate') {
    // Check if cache is stale (older than 30 minutes)
    if (Date.now() - cachedRate.timestamp > 30 * 60 * 1000) {
      fetchExchangeRate().then(rate => sendResponse(rate))
      return true // Keep message channel open for async response
    }
    sendResponse(cachedRate)
  }
  
  if (message.action === 'refreshRate') {
    fetchExchangeRate().then(rate => sendResponse(rate))
    return true
  }
  
  if (message.action === 'setRateAlert') {
    chrome.storage.local.get(['settings'], (result) => {
      const settings = result.settings || {}
      settings.rateAlertThreshold = message.threshold
      chrome.storage.local.set({ settings })
      sendResponse({ success: true })
    })
    return true
  }
})

// Check rate alerts when rate is updated
async function checkRateAlerts() {
  const { settings, exchangeRate } = await chrome.storage.local.get(['settings', 'exchangeRate'])
  
  if (settings?.rateAlertThreshold && exchangeRate) {
    if (exchangeRate.rate >= settings.rateAlertThreshold) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: 'SiamConnect Rate Alert 🎉',
        message: `USD to THB rate is now ${exchangeRate.rate.toFixed(2)}! Your target was ${settings.rateAlertThreshold}.`,
        priority: 2
      })
    }
  }
}

console.log('SiamConnect background service worker initialized')


