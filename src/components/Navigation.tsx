import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Language } from '@/types';

interface NavigationProps {
  language: Language;
  toggleLanguage: () => void;
}

const navItems = [
  { label: 'Home', labelZh: '首頁', href: '#home' },
  { label: 'Services', labelZh: '服務', href: '#services' },
  { label: 'Why Us', labelZh: '優勢', href: '#why-us' },
  { label: 'LMM SEO', labelZh: 'LMM 優化', href: '#lmm-seo' },
  { label: 'Blog', labelZh: '博客', href: '#blog' },
];

export function Navigation({ language, toggleLanguage }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy-950/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center group-hover:shadow-glow transition-shadow">
              <span className="text-navy-950 font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-lg tracking-tight">
              ACT<span className="text-cyan-400">YOUR</span>PLAN
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {language === 'zh' ? item.labelZh : item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">{language === 'zh' ? 'EN' : 'ZH'}</span>
            </Button>

            <Button
              className="hidden sm:inline-flex bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-navy-950 font-semibold"
              onClick={() => scrollToSection('#contact')}
            >
              {language === 'zh' ? '聯繫我們' : 'Contact Us'}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 animate-slide-up">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
                >
                  {language === 'zh' ? item.labelZh : item.label}
                </a>
              ))}
              <div className="pt-2 border-t border-white/10 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="w-full justify-start gap-2 text-muted-foreground"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language === 'zh' ? 'Switch to English' : '切換至中文'}</span>
                </Button>
              </div>
              <Button
                className="mt-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-navy-950 font-semibold"
                onClick={() => scrollToSection('#contact')}
              >
                {language === 'zh' ? '聯繫我們' : 'Contact Us'}
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
