/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      // Cloudflare Images CDN
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
      },
    ],
    // 如果使用自定義 CDN，在這裡添加域名
    // domains: process.env.NEXT_PUBLIC_CDN_DOMAIN ? [process.env.NEXT_PUBLIC_CDN_DOMAIN] : [],
  },
}

module.exports = nextConfig

