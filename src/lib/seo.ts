// SEO 相關工具函數

import type { Metadata } from 'next'
import { Locale, defaultLocale } from './i18n'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  locale?: Locale
  alternateLocales?: Locale[]
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = '/images/og-image.jpg',
    url = 'https://actyourplan.com',
    type = 'website',
    locale = defaultLocale,
    alternateLocales = [],
  } = config

  const fullTitle = `${title} | ACT YOUR PLAN`
  const fullUrl = url.startsWith('http') ? url : `https://actyourplan.com${url}`

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    authors: [{ name: 'THE BASE' }],
    creator: 'ACT YOUR PLAN',
    publisher: 'ACT YOUR PLAN',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://actyourplan.com'),
    alternates: {
      canonical: fullUrl,
      languages: {
        'zh-TW': fullUrl.replace(/\/[a-z]{2}-[A-Z]{2}\//, '/'),
        'zh-CN': fullUrl.replace(/\/[a-z]{2}-[A-Z]{2}\//, '/zh-CN'),
        'en': fullUrl.replace(/\/[a-z]{2}-[A-Z]{2}\//, '/en'),
        'ja': fullUrl.replace(/\/[a-z]{2}-[A-Z]{2}\//, '/ja'),
      },
    },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: 'ACT YOUR PLAN',
      images: [
        {
          url: image.startsWith('http') ? image : `https://actyourplan.com${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'zh-TW' ? 'zh_TW' : locale === 'zh-CN' ? 'zh_CN' : locale,
      alternateLocale: alternateLocales.map(loc => 
        loc === 'zh-TW' ? 'zh_TW' : loc === 'zh-CN' ? 'zh_CN' : loc
      ),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.startsWith('http') ? image : `https://actyourplan.com${image}`],
      creator: '@actyourplan',
      site: '@actyourplan',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// 生成結構化數據 (JSON-LD)
export function generateStructuredData(config: {
  type: 'WebSite' | 'Article' | 'Organization'
  name: string
  description: string
  url: string
  image?: string
  datePublished?: string
  dateModified?: string
  author?: {
    name: string
    url?: string
  }
}) {
  const {
    type,
    name,
    description,
    url,
    image,
    datePublished,
    dateModified,
    author,
  } = config

  const baseData: any = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
  }

  if (image) {
    baseData.image = image.startsWith('http') ? image : `https://actyourplan.com${image}`
  }

  if (type === 'Article' && datePublished) {
    baseData.datePublished = datePublished
    baseData.dateModified = dateModified || datePublished
  }

  if (author) {
    baseData.author = {
      '@type': 'Person',
      name: author.name,
      ...(author.url && { url: author.url }),
    }
  }

  if (type === 'Organization') {
    baseData.logo = image || 'https://actyourplan.com/images/logo.png'
  }

  return baseData
}

