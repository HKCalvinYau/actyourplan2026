'use client'

import { useEffect } from 'react'

export default function ServiceWorker() {
  useEffect(() => {
    // 只在生產環境或明確啟用時註冊 Service Worker
    const shouldRegister =
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      (process.env.NODE_ENV === 'production' || 
       process.env.NEXT_PUBLIC_ENABLE_SW === 'true')

    if (shouldRegister) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          })
          console.log('Service Worker registered:', registration.scope)
        } catch (error) {
          console.error('Service Worker registration failed:', error)
        }
      }

      // 等待頁面載入完成後註冊
      if (document.readyState === 'complete') {
        registerSW()
      } else {
        window.addEventListener('load', registerSW)
      }
    }
  }, [])

  return null
}

