'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { locales, localeNames, type Locale, getLocaleFromPath, removeLocaleFromPath } from '@/lib/i18n'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const currentLocale = getLocaleFromPath(pathname)
  const pathWithoutLocale = removeLocaleFromPath(pathname)

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return

    // 構建新路徑
    let newPath = ''
    if (newLocale === 'zh-TW') {
      // 預設語言，移除前綴
      newPath = pathWithoutLocale || '/'
    } else {
      // 其他語言，添加前綴
      newPath = `/${newLocale}${pathWithoutLocale || ''}`
    }

    router.push(newPath)
  }

  return (
    <div className="relative">
      <select
        value={currentLocale}
        onChange={(e) => handleLanguageChange(e.target.value as Locale)}
        className="appearance-none bg-background border border-border text-text-main font-mono text-xs uppercase tracking-wider px-3 py-1.5 pr-8 focus:border-primary focus:outline-none cursor-pointer hover:border-primary transition-colors"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeNames[locale]}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-text-muted pointer-events-none" />
    </div>
  )
}

