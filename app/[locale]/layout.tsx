import { Locale, locales, defaultLocale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  // 驗證語言是否有效
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  return <>{children}</>
}

// 生成靜態參數
export function generateStaticParams() {
  return locales
    .filter(locale => locale !== defaultLocale) // 預設語言不需要前綴
    .map((locale) => ({
      locale,
    }))
}

