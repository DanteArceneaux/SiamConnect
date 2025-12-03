import { useState } from 'react'
import { ArrowLeft, ExternalLink, Bell, BellOff, MapPin, FileText, AlertTriangle, Plane } from 'lucide-react'

interface EmbassyFeedProps {
  onBack: () => void
}

interface NewsItem {
  id: string
  title: string
  titleTh?: string
  date: string
  category: 'news' | 'alert' | 'service' | 'travel'
  summary: string
  url: string
  isImportant?: boolean
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Passport Renewal: New Online Appointment System',
    titleTh: 'การต่ออายุหนังสือเดินทาง: ระบบนัดหมายออนไลน์ใหม่',
    date: '2024-11-28',
    category: 'service',
    summary: 'The Royal Thai Embassy now offers online appointment booking for passport renewals. Walk-ins are no longer accepted.',
    url: 'https://thaiembdc.org',
    isImportant: true
  },
  {
    id: '2',
    title: 'Mobile Consular Services - Texas (December 2024)',
    titleTh: 'บริการกงสุลสัญจร - เท็กซัส',
    date: '2024-11-25',
    category: 'service',
    summary: 'Mobile consular services will be available in Houston and Dallas on December 14-15, 2024.',
    url: 'https://thaiembdc.org/mobile'
  },
  {
    id: '3',
    title: 'Travel Advisory: Thailand Entry Requirements Updated',
    titleTh: 'ประกาศการเดินทาง: อัปเดตข้อกำหนดการเข้าประเทศไทย',
    date: '2024-11-20',
    category: 'travel',
    summary: 'New visa exemption rules effective January 2025. US citizens can stay up to 60 days.',
    url: 'https://thaiembdc.org/travel'
  },
  {
    id: '4',
    title: 'Thai ID Card Renewal Now Available in LA Consulate',
    titleTh: 'ต่ออายุบัตรประชาชนไทยที่สถานกงสุล LA',
    date: '2024-11-15',
    category: 'news',
    summary: 'Thai nationals can now renew their national ID cards at the Los Angeles consulate.',
    url: 'https://thaicgla.com'
  },
  {
    id: '5',
    title: 'Emergency: Scam Alert - Fake Embassy Calls',
    titleTh: 'แจ้งเตือน: ระวังโทรศัพท์หลอกลวง',
    date: '2024-11-10',
    category: 'alert',
    summary: 'Be aware of phone scams claiming to be from the embassy demanding immediate payment.',
    url: 'https://thaiembdc.org/alert',
    isImportant: true
  }
]

const consulates = [
  { name: 'Washington D.C. (Embassy)', url: 'https://thaiembdc.org', phone: '202-944-3600' },
  { name: 'Los Angeles', url: 'https://thaicgla.com', phone: '323-962-9574' },
  { name: 'New York', url: 'https://thaicgny.com', phone: '212-754-1770' },
  { name: 'Chicago', url: 'https://thaiconsulatechicago.org', phone: '312-236-2447' },
]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'alert':
      return <AlertTriangle size={14} className="text-temple-400" />
    case 'service':
      return <FileText size={14} className="text-tropical-400" />
    case 'travel':
      return <Plane size={14} className="text-silk-400" />
    default:
      return <FileText size={14} className="text-white/40" />
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'alert':
      return 'border-temple-500/30 bg-temple-500/10'
    case 'service':
      return 'border-tropical-500/30 bg-tropical-500/10'
    case 'travel':
      return 'border-silk-500/30 bg-silk-500/10'
    default:
      return 'border-white/10 bg-white/5'
  }
}

export default function EmbassyFeed({ onBack }: EmbassyFeedProps) {
  const [activeTab, setActiveTab] = useState<'news' | 'consulates'>('news')
  const [notifications, setNotifications] = useState(true)

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
        <div className="flex-1">
          <h2 className="font-display font-bold text-lg gold-text">Embassy & Consulates</h2>
          <p className="text-white/40 text-xs">News, alerts & services</p>
        </div>
        <button
          onClick={() => setNotifications(!notifications)}
          className={`p-2 rounded-lg transition-colors ${
            notifications ? 'bg-gold-500/20 text-gold-400' : 'bg-white/10 text-white/40'
          }`}
          title={notifications ? 'Notifications on' : 'Notifications off'}
        >
          {notifications ? <Bell size={18} /> : <BellOff size={18} />}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('news')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'news'
              ? 'bg-gold-500 text-night-900'
              : 'glass-card text-white/60 hover:text-white'
          }`}
        >
          News & Alerts
        </button>
        <button
          onClick={() => setActiveTab('consulates')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'consulates'
              ? 'bg-gold-500 text-night-900'
              : 'glass-card text-white/60 hover:text-white'
          }`}
        >
          Consulates
        </button>
      </div>

      {/* News Tab */}
      {activeTab === 'news' && (
        <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
          {mockNews.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-3 rounded-xl border transition-all hover:scale-[1.02] ${getCategoryColor(item.category)} ${
                item.isImportant ? 'ring-1 ring-gold-500/50' : ''
              }`}
            >
              <div className="flex items-start gap-2">
                {getCategoryIcon(item.category)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {item.isImportant && (
                      <span className="px-1.5 py-0.5 text-[10px] font-medium bg-gold-500 text-night-900 rounded">
                        IMPORTANT
                      </span>
                    )}
                    <span className="text-[10px] text-white/40">{item.date}</span>
                  </div>
                  <h4 className="text-sm font-medium text-white/90 leading-tight mb-0.5">
                    {item.title}
                  </h4>
                  {item.titleTh && (
                    <p className="text-xs thai-text text-gold-400/80 mb-1">{item.titleTh}</p>
                  )}
                  <p className="text-xs text-white/50 line-clamp-2">{item.summary}</p>
                </div>
                <ExternalLink size={14} className="text-white/30 flex-shrink-0 mt-1" />
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Consulates Tab */}
      {activeTab === 'consulates' && (
        <div className="space-y-3">
          {consulates.map((consulate, idx) => (
            <div
              key={idx}
              className="glass-card p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-gold-400" />
                  <span className="font-medium text-white/90">{consulate.name}</span>
                </div>
                <a
                  href={consulate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gold-400 hover:underline flex items-center gap-1"
                >
                  Website <ExternalLink size={10} />
                </a>
              </div>
              <div className="text-sm text-white/50">
                📞 {consulate.phone}
              </div>
            </div>
          ))}
          
          <div className="p-3 rounded-lg bg-silk-900/30 border border-silk-700/30 text-xs text-white/50">
            💡 <strong className="text-white/70">Pro Tip:</strong> Always check the embassy website for
            the latest appointment requirements before visiting. Most services now require
            pre-booking.
          </div>
        </div>
      )}

      {/* Passport Reminder */}
      <div className="mt-4 glass-card p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🛂</span>
            <span className="text-sm text-white/60">Passport Reminder</span>
          </div>
          <button className="btn-secondary text-xs py-1 px-2">
            Set Reminder
          </button>
        </div>
        <p className="text-xs text-white/40 mt-1 ml-7">
          Get notified 6 months before your passport expires
        </p>
      </div>
    </div>
  )
}


