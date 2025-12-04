'use client'

import { useEffect } from 'react'

interface ViewTrackerProps {
  type: 'blueprints' | 'armory' | 'signals' | 'experiments'
  slug: string
}

/**
 * 追蹤真實閱讀量的客戶端組件
 */
export default function ViewTracker({ type, slug }: ViewTrackerProps) {
  useEffect(() => {
    // 只在客戶端執行，避免重複計算
    const trackView = async () => {
      try {
        await fetch('/api/views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type, slug }),
        })
      } catch (error) {
        // 靜默失敗，不影響用戶體驗
        console.error('Failed to track view:', error)
      }
    }

    trackView()
  }, [type, slug])

  // 這個組件不渲染任何內容
  return null
}

