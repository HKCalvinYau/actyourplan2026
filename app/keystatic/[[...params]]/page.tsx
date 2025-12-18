'use client'

import { makePage } from '@keystatic/next/ui/app'
import config from '@/keystatic.config'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Keystatic 需要處理 GitHub OAuth
// Cloudflare Pages 要求所有路由都必須使用 Edge Runtime
export const runtime = 'edge'

const KeystaticPage = makePage(config)

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // 簡單檢查 cookie 是否存在
    const checkLogin = () => {
      // 檢查有沒有我們自訂的 access token
      const hasToken = document.cookie.includes('keystatic-gh-access-token')
      setIsLoggedIn(hasToken)
      setChecking(false)
    }
    checkLogin()
  }, [])

  // 如果還在檢查，顯示 Loading
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 font-mono">Loading CMS...</div>
      </div>
    )
  }

  // 如果沒登入，顯示我們自己做的登入頁面（繞過 Keystatic 那個壞掉的按鈕）
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Keystatic CMS</h1>
          <p className="mb-8 text-gray-600">
            請點擊下方按鈕登入 GitHub 以管理內容。
          </p>
          
          {/* 直接使用 <a> 標籤觸發後端轉址，保證 100% 能跳轉 */}
          <a
            href="/api/keystatic/github/login"
            className="inline-block w-full py-3 px-4 bg-black text-white font-medium rounded hover:bg-gray-800 transition-colors"
          >
            Log in with GitHub
          </a>
        </div>
      </div>
    )
  }

  // 如果已登入，才顯示 Keystatic 主程式
  return <KeystaticPage />
}
