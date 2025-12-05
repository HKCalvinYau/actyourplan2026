/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Cloudflare Pages 配置
  output: 'standalone',
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
  },
}

module.exports = nextConfig

