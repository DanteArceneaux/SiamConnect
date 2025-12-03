// SiamConnect Content Script
// Handles page translation and hover dictionary

(function() {
  'use strict';
  
  let hoverTranslateEnabled = false;
  let tooltipElement = null;

  // Create tooltip element
  function createTooltip() {
    if (tooltipElement && document.body.contains(tooltipElement)) {
      return tooltipElement;
    }
    
    tooltipElement = document.createElement('div');
    tooltipElement.id = 'siamconnect-tooltip';
    tooltipElement.style.cssText = `
      position: fixed;
      z-index: 2147483647;
      background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
      color: white;
      padding: 12px 16px;
      border-radius: 12px;
      font-family: 'Segoe UI', system-ui, sans-serif;
      font-size: 14px;
      max-width: 300px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
      display: none;
      pointer-events: none;
      backdrop-filter: blur(10px);
    `;
    document.body.appendChild(tooltipElement);
    return tooltipElement;
  }

  // Get Thai translation using Google Translate API
  async function getThaiTranslation(word) {
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=th&dt=t&dt=rm&q=${encodeURIComponent(word)}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        return {
          translation: data[0]?.[0]?.[0] || word,
          romanization: data[0]?.[1]?.[3] || ''
        };
      }
    } catch (error) {
      console.error('SiamConnect Translation error:', error);
    }
    return { translation: word, romanization: '' };
  }

  // Show tooltip with translation
  async function showTranslation(word, x, y) {
    const tooltip = createTooltip();
    
    // Show loading state
    tooltip.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="width: 16px; height: 16px; border: 2px solid #fbbf24; border-top-color: transparent; border-radius: 50%; animation: siamconnect-spin 1s linear infinite;"></div>
        <span style="color: rgba(255,255,255,0.6);">Translating...</span>
      </div>
    `;
    
    // Position tooltip
    const left = Math.min(x, window.innerWidth - 320);
    const top = Math.min(y + 20, window.innerHeight - 100);
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    tooltip.style.display = 'block';
    
    const { translation, romanization } = await getThaiTranslation(word);
    
    tooltip.innerHTML = `
      <div style="margin-bottom: 4px; color: rgba(255,255,255,0.5); font-size: 12px;">${escapeHtml(word)}</div>
      <div style="font-size: 18px; color: #fbbf24; font-weight: 500;">${escapeHtml(translation)}</div>
      ${romanization ? `<div style="font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 4px;">${escapeHtml(romanization)}</div>` : ''}
    `;
  }

  // Escape HTML to prevent XSS
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Hide tooltip
  function hideTooltip() {
    if (tooltipElement) {
      tooltipElement.style.display = 'none';
    }
  }

  // Handle double-click for word translation
  function handleDoubleClick(event) {
    if (!hoverTranslateEnabled) return;
    
    const selection = window.getSelection();
    const word = selection.toString().trim();
    
    // Only translate if it's a valid English word (no Thai characters)
    if (word && word.length > 0 && word.length < 50 && !/[\u0E00-\u0E7F]/.test(word)) {
      showTranslation(word, event.clientX, event.clientY);
    }
  }

  // Handle click to hide tooltip
  function handleClick(event) {
    // Don't hide if clicking on tooltip
    if (tooltipElement && tooltipElement.contains(event.target)) return;
    hideTooltip();
  }

  // Show notification toast
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'siamconnect-notification';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 2147483647;
      background: ${type === 'success' ? 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'};
      color: ${type === 'success' ? '#1a1a2e' : 'white'};
      padding: 12px 20px;
      border-radius: 12px;
      font-family: 'Segoe UI', system-ui, sans-serif;
      font-weight: 600;
      font-size: 14px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      animation: siamconnect-slideIn 0.3s ease-out;
      max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(20px)';
      notification.style.transition = 'all 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Initialize event listeners
  document.addEventListener('dblclick', handleDoubleClick);
  document.addEventListener('click', handleClick);
  document.addEventListener('scroll', hideTooltip);

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes siamconnect-spin {
      to { transform: rotate(360deg); }
    }
    @keyframes siamconnect-slideIn {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `;
  document.head.appendChild(style);

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('SiamConnect: Received message', message);
    
    if (message.action === 'toggleHoverTranslate') {
      hoverTranslateEnabled = message.enabled;
      
      if (hoverTranslateEnabled) {
        showNotification('🇹🇭 SiamConnect: Double-click any word to translate!');
      } else {
        hideTooltip();
        showNotification('🇹🇭 SiamConnect: Hover dictionary disabled');
      }
      
      sendResponse({ success: true, enabled: hoverTranslateEnabled });
      return true; // Keep message channel open
    }
    
    if (message.action === 'translatePage') {
      const url = window.location.href;
      showNotification('🌐 Redirecting to Google Translate...');
      
      setTimeout(() => {
        window.location.href = `https://translate.google.com/translate?sl=en&tl=th&u=${encodeURIComponent(url)}`;
      }, 500);
      
      sendResponse({ success: true });
      return true;
    }
    
    if (message.action === 'ping') {
      sendResponse({ success: true, message: 'SiamConnect content script is active' });
      return true;
    }
    
    return false;
  });

  console.log('SiamConnect content script loaded successfully');
})();
