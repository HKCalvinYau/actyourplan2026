import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import path from 'path';

// https://astro.build/config
export default defineConfig({
  output: 'server', // 為了支援 D1 和動態內容，我們使用 SSR 模式
  adapter: cloudflare({
    mode: 'directory', // Pages 使用 directory 模式
    platformProxy: {
      enabled: true, // 本地開發時模擬 Cloudflare 環境 (D1, R2)
    },
  }),
  integrations: [
    tailwind({
      // 修正：移除 applyBaseStyles: false，讓 Astro 自動注入 Tailwind 基礎樣式
      // 這能確保即使 globals.css 載入有問題，Tailwind 的 class 依然能運作
      // applyBaseStyles: false, 
    }),
    react(),
  ],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), './src'),
      },
    },
  },
});
