import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        // 戰術設計系統顏色
        background: '#0a0a0a',      // 深黑背景
        surface: '#171717',          // 炭灰表面
        primary: '#22c55e',          // 戰術綠 (green-500)
        'text-main': '#e5e5e5',      // 主要文字
        'text-muted': '#737373',     // 次要文字
        border: '#262626',           // 邊框顏色
      },
      fontFamily: {
        // 預設無襯線字體 (Inter) - 用於標題和內文
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-inter)', 'sans-serif'],
        
        // 等寬字體 (JetBrains Mono) - 僅用於數據、代碼、戰術標籤
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        // 網格線背景效果
        'grid-pattern': `
          linear-gradient(to right, rgba(34, 197, 94, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(34, 197, 94, 0.03) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid-size': '20px 20px',
      },
    },
  },
  plugins: [],
}
export default config
