'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isKeystatic = pathname?.startsWith('/keystatic')
  const isLogin = pathname === '/login'

  return (
    <>
      {!isKeystatic && !isLogin && <Header />}
      {children}
      {!isKeystatic && !isLogin && <Footer />}
    </>
  )
}

