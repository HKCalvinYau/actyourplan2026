'use client'

import { useState, FormEvent, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // 登入成功，重定向到後台或原始請求的頁面
        const redirect = searchParams.get('redirect') || '/keystatic'
        // 使用 window.location 確保 cookie 被正確設置
        window.location.href = redirect
      } else {
        setError(data.error || data.details || '登入失敗')
        console.error('Login failed:', data)
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('登入時發生錯誤，請稍後再試')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-mono text-primary text-2xl font-bold tracking-wider mb-2">
            [ ACT YOUR PLAN ]
          </h1>
          <p className="font-mono text-text-muted text-sm uppercase">
            ACCESS CONTROL
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-surface border-2 border-border p-8">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-primary" />
            <h2 className="font-mono font-bold text-lg uppercase text-text-main">
              OPERATOR LOGIN
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block font-mono text-xs uppercase text-text-muted mb-2"
              >
                USERNAME:
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-background border-2 border-border text-text-main font-mono text-sm focus:border-primary focus:outline-none"
                placeholder="ENTER USERNAME"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block font-mono text-xs uppercase text-text-muted mb-2"
              >
                PASSWORD:
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-background border-2 border-border text-text-main font-mono text-sm focus:border-primary focus:outline-none"
                placeholder="ENTER PASSWORD"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 font-mono text-xs p-3">
                ERROR: {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-primary text-background font-mono text-sm uppercase tracking-wider hover:bg-primary/90 transition-all duration-200 border-2 border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'AUTHENTICATING...' : '[ ACCESS ]'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="font-mono text-text-muted">LOADING...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}

