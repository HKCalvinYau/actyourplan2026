'use client'

import { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'

/** 依 pathname 決定是否顯示 Header/Footer（Astro 相容，不依賴 next/navigation） */
export default function ConditionalLayout({
  children,
  pathname: pathnameProp,
}: {
  children: React.ReactNode
  /** 可選：由 Astro 傳入 Astro.url.pathname；未傳時在 client 用 window.location.pathname */
  pathname?: string
}) {
  const [clientPathname, setClientPathname] = useState<string>('')
  const pathname = pathnameProp ?? clientPathname

  useEffect(() => {
    if (typeof window !== 'undefined') setClientPathname(window.location.pathname)
  }, [])

  const isKeystatic = pathname.startsWith('/keystatic')
  const isLogin = pathname === '/login'
  const showChrome = !isKeystatic && !isLogin

  return (
    <>
      {showChrome && <Header />}
      {children}
      {showChrome && <Footer />}
    </>
  )
}

