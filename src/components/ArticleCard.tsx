// import Link from 'next/link' // Astro 不需要 Next.js 的 Link

interface ArticleCardProps {
  slug: string
  title: string
  date: string
  type: string
  rank?: 'PVT' | 'SGT' | 'CDR'
  href: string
}

// 軍階徽章配置
const rankConfig = {
  PVT: {
    icon: '🔰',
    label: 'PVT',
    fullLabel: 'Private (二等兵)',
    color: 'text-gray-400',
    bgColor: 'bg-gray-800',
    borderColor: 'border-gray-600',
  },
  SGT: {
    icon: '🎖️',
    label: 'SGT',
    fullLabel: 'Sergeant (士官)',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary',
  },
  CDR: {
    icon: '⭐️',
    label: 'CDR',
    fullLabel: 'Commander (指揮官)',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500',
  },
}

export default function ArticleCard({
  slug: _,
  title,
  date,
  type,
  rank = 'PVT',
  href,
}: ArticleCardProps) {
  const rankInfo = rankConfig[rank] || rankConfig.PVT // 增加 fallback

  // 格式化日期：只取 YYYY-MM-DD
  const formattedDate = date.split('T')[0]

  return (
    <a
      href={href}
      className="block group hover:bg-surface-hover transition-colors duration-200"
    >
      <div className="flex items-start gap-3 font-mono text-sm py-2">
        {/* 軍階徽章 */}
        <div className={`flex-shrink-0 px-2 py-0.5 border ${rankInfo.borderColor} ${rankInfo.bgColor} ${rankInfo.color} text-xs uppercase tracking-wider`}>
            <span className="mr-1">{rankInfo.icon}</span>
            <span>{rankInfo.label}</span>
          </div>
        
        {/* 日期 */}
        <span className="text-text-muted flex-shrink-0 py-0.5">
          [ {formattedDate} ]
        </span>
        
        {/* 類型 */}
        <span className="text-primary flex-shrink-0 py-0.5 uppercase">
          [TYPE: {type} ]
        </span>
        
        {/* 標題 */}
        <span className="text-text-main group-hover:text-primary transition-colors flex-1 py-0.5">
          {title}
        </span>
      </div>
    </a>
  )
}

