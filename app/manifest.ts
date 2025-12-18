// PWA Manifest 配置

import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ACT YOUR PLAN | THE BASE',
    short_name: 'THE BASE',
    description: '建立你的基地。執行你的計畫。Digital Survival Protocols.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#22c55e',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/images/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['business', 'productivity', 'education'],
    lang: 'zh-TW',
    dir: 'ltr',
  }
}

