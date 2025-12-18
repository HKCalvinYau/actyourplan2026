import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

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
      applyBaseStyles: false, // 我們會自己匯入 globals.css
    }),
    react(),
  ],
});
