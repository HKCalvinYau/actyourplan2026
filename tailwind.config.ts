import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
        // 標題使用 Inter (Bold, Uppercase)
        heading: ['var(--font-inter)', 'sans-serif'],
        // 內文和程式碼使用 JetBrains Mono (等寬字體，像終端機)
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        body: ['var(--font-jetbrains-mono)', 'monospace'],
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

