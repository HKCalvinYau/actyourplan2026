import { Github, Linkedin, Twitter } from 'lucide-react';
import type { Language } from '@/types';

interface FooterProps {
  language: Language;
}

const footerLinks = {
  services: [
    { label: 'LMM SEO', labelZh: 'LMM SEO', href: '#lmm-seo' },
    { label: 'Digital Marketing', labelZh: '數位行銷', href: '#services' },
    { label: 'Business Consultant', labelZh: '商業顧問', href: '#services' },
  ],
  company: [
    { label: 'About Us', labelZh: '關於我們', href: '#why-us' },
    { label: 'Blog', labelZh: '博客', href: '#blog' },
    { label: 'Contact', labelZh: '聯繫', href: '#contact' },
  ],
  legal: [
    { label: 'Privacy Policy', labelZh: '隱私政策', href: '#' },
    { label: 'Terms of Service', labelZh: '服務條款', href: '#' },
    { label: 'Cookie Policy', labelZh: 'Cookie 政策', href: '#' },
  ],
};

export function Footer({ language }: FooterProps) {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative pt-16 pb-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <span className="text-navy-950 font-bold">A</span>
              </div>
              <span className="font-bold text-xl tracking-tight">
                ACT<span className="text-cyan-400">YOUR</span>PLAN
              </span>
            </a>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              {language === 'zh'
                ? '全球領先的 LMM SEO 與 AI 商業策略顧問，幫助企業在生成式 AI 時代建立權威形象。'
                : 'Leading global consultancy specializing in LMM SEO and AI-driven business strategies.'}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-cyan-500/20 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-cyan-500/20 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-cyan-500/20 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">
              {language === 'zh' ? '服務' : 'Services'}
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors"
                  >
                    {language === 'zh' ? link.labelZh : link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">
              {language === 'zh' ? '公司' : 'Company'}
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors"
                  >
                    {language === 'zh' ? link.labelZh : link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">
              {language === 'zh' ? '法律' : 'Legal'}
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors"
                  >
                    {language === 'zh' ? link.labelZh : link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ACTYOURPLAN. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {language === 'zh' ? '系統運行正常' : 'All systems operational'}
            </span>
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'ACTYOURPLAN',
            url: 'https://www.actyourplan.com',
            logo: 'https://www.actyourplan.com/logo.png',
            email: 'info@actyourplan.com',
            description:
              'Leading global consultancy specializing in LMM SEO and AI-driven business growth.',
            sameAs: [
              'https://twitter.com/actyourplan',
              'https://linkedin.com/company/actyourplan',
            ],
            address: {
              '@type': 'PostalAddress',
              streetAddress: '8 Finance Street',
              addressLocality: 'Central',
              addressRegion: 'Hong Kong',
            },
          }),
        }}
      />
    </footer>
  );
}
