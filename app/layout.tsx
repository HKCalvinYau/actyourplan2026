import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import ConditionalLayout from '@/components/ConditionalLayout'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import ServiceWorker from '@/components/ServiceWorker'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import './globals.css'

// 設定 Inter 字體（用於標題）
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

// 設定 JetBrains Mono 字體（用於內文和程式碼，像終端機）
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = generateSEOMetadata({
  title: 'THE BASE',
  description: '建立你的基地。執行你的計畫。Digital Survival Protocols. 亂世中的生存戰略與數位實驗室。',
  keywords: ['數位轉型', '商業戰略', '創業', 'IT', 'AI', 'Digital Transformation', 'Business Strategy', 'Startup'],
  type: 'website',
  locale: 'zh-TW',
  alternateLocales: ['zh-CN', 'en', 'ja'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 從環境變數獲取 Google Analytics ID
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="zh-TW" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        {/* Google Analytics */}
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {/* Service Worker for PWA */}
        <ServiceWorker />
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}

