import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
// import { usePathname } from 'next/navigation' // Astro 不支援
import AuthButton from './AuthButton'
import LanguageSwitcher from './LanguageSwitcher'
import { getTranslations, getLocaleFromPath, getLocalePath } from '../lib/i18n' // 路徑調整

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [pathname, setPathname] = useState('/') // 改用 state

  useEffect(() => {
    setPathname(window.location.pathname)
  }, [])

  const locale = getLocaleFromPath(pathname)
  const t = getTranslations(locale)

  const menuItems = [
    { label: t.nav.blueprints, href: getLocalePath(locale, '/blueprints') },
    { label: t.nav.armory, href: getLocalePath(locale, '/armory') },
    { label: t.nav.signals, href: getLocalePath(locale, '/signals') },
    { label: t.nav.experiments, href: getLocalePath(locale, '/experiments') },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b-2 border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo with blinking cursor */}
          <div className="flex-shrink-0">
            <a href="/" className="font-mono text-primary text-lg font-bold tracking-wider hover:text-primary/80 transition-colors">
              [ ACT YOUR PLAN ]<span className="animate-blink">_</span>
            </a>
          </div>

          {/* Center: Menu (Desktop) */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono text-text-main text-sm uppercase tracking-wider hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Utility */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="hidden md:flex items-center gap-2">
              <span className="font-mono text-text-muted text-xs uppercase tracking-wider">
                {t.nav.lang}
              </span>
              <LanguageSwitcher />
            </div>

            {/* Auth Button (Login/Access/Logout) */}
            <AuthButton />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-text-main hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t-2 border-border py-4">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-mono text-text-main text-sm uppercase tracking-wider hover:text-primary transition-colors py-2 border-l-2 border-transparent hover:border-primary pl-4"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-2 py-2 pl-4">
                <span className="font-mono text-text-muted text-xs uppercase tracking-wider">
                  {t.nav.lang}
                </span>
                <LanguageSwitcher />
              </div>
              <AuthButton />
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

