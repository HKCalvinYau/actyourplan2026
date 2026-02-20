import { useState, useEffect } from 'react'
import { Lock, LogOut } from 'lucide-react'

export default function AuthButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 檢查登入狀態
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // 這裡暫時先假裝沒登入，之後需要寫 Astro 的 API endpoint
      // const response = await fetch('/api/auth/check')
      // if (response.ok) {
      //   const data = await response.json()
      //   setIsAuthenticated(data.authenticated)
      //   setUsername(data.username)
      // }
      setIsAuthenticated(false)
    } catch (error) {
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      // await fetch('/api/auth/logout', { method: 'POST' })
      setIsAuthenticated(false)
      setUsername(null)
      if (typeof window !== 'undefined') {
        window.location.href = '/'
      }
    } catch (error) {
      console.error('登出失敗:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="hidden md:flex items-center gap-2 px-4 py-2 border-2 border-border bg-transparent text-text-muted font-mono text-sm uppercase tracking-wider">
        <Lock className="w-4 h-4" />
        LOADING...
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-3">
        {/* Desktop: Logged In */}
        <div className="hidden md:flex items-center gap-3">
          <span className="font-mono text-text-muted text-xs uppercase">
            ID: {username}
          </span>
          <a
            href="/admin" // 改成 Astro 的 admin 路徑
            className="flex items-center gap-2 px-4 py-2 border-2 border-primary bg-transparent text-primary font-mono text-sm uppercase tracking-wider hover:bg-primary hover:text-background transition-all duration-200"
          >
            <Lock className="w-4 h-4" />
            ACCESS
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border-2 border-border bg-transparent text-text-muted font-mono text-sm uppercase tracking-wider hover:border-primary hover:text-primary transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            LOGOUT
          </button>
        </div>
        {/* Mobile: Logged In */}
        <div className="md:hidden flex flex-col gap-2">
          <div className="font-mono text-text-muted text-xs uppercase">
            ID: {username}
          </div>
          <a
            href="/admin"
            className="flex items-center gap-2 px-4 py-2 border-2 border-primary bg-transparent text-primary font-mono text-sm uppercase tracking-wider hover:bg-primary hover:text-background transition-all duration-200 w-fit"
          >
            <Lock className="w-4 h-4" />
            ACCESS
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border-2 border-border bg-transparent text-text-muted font-mono text-sm uppercase tracking-wider hover:border-primary hover:text-primary transition-all duration-200 w-fit"
          >
            <LogOut className="w-4 h-4" />
            LOGOUT
          </button>
        </div>
      </div>
    )
  }

  return (
    <a
      href="/admin" // 登入連結指向 admin
      className="flex items-center gap-2 px-4 py-2 border-2 border-primary bg-transparent text-primary font-mono text-sm uppercase tracking-wider hover:bg-primary hover:text-background transition-all duration-200"
    >
      <Lock className="w-4 h-4" />
      LOGIN
    </a>
  )
}
