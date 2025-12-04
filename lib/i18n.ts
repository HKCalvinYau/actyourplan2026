// 多語言系統配置和工具函數

export type Locale = 'zh-TW' | 'zh-CN' | 'en' | 'ja'

export const locales: Locale[] = ['zh-TW', 'zh-CN', 'en', 'ja']

export const localeNames: Record<Locale, string> = {
  'zh-TW': '繁',
  'zh-CN': '简',
  'en': 'EN',
  'ja': 'JP',
}

export const defaultLocale: Locale = 'zh-TW'

// 語言對照表
export const translations = {
  'zh-TW': {
    // 導航
    nav: {
      blueprints: 'B. BLUEPRINTS',
      armory: 'A. ARMORY',
      signals: 'S. SIGNALS',
      experiments: 'E. EXPERIMENTS',
      lang: 'LANG:',
    },
    // 首頁
    home: {
      hero: {
        headline1: '建立你的基地。執行你的計畫。',
        headline2: 'BUILD YOUR BASE. ACT YOUR PLAN.',
        headline3: '基地を築け。計画を実行せよ。',
        subtitle: 'Digital Survival Protocols',
        description: '這裡不是心靈雞湯。這是關於商業戰略、數位武裝與實戰藍圖的生存筆記。',
        cta1: 'ENTER THE BASE (進入基地)',
        cta2: 'VIEW PROTOCOLS (查看藍圖)',
      },
      glitch: {
        title: 'SYSTEM DIAGNOSTIC: THE GLITCH',
        question: '你是否有過這種感覺？',
        points: [
          '讀了 100 本書，卻依然原地踏步。',
          '下載了無數工具，效率卻沒有提升。',
          '腦中有完美的創業計畫，但遲遲沒有寫下第一行代碼。',
        ],
        error: 'ERROR CODE: INACTION (行動癱瘓).',
        solution: '本基地存在的唯一目的，就是修復這個 Bug。我們將「知識」編譯成「可執行的行動」。',
      },
      transmissions: {
        title: 'INCOMING TRANSMISSIONS (最新訊號)',
        noPosts: '目前沒有文章',
      },
      operator: {
        title: 'OPERATOR ID: THE RECRUIT (新兵)',
        realWorldRank: 'REAL WORLD RANK:',
        digitalRank: 'DIGITAL RANK:',
        weapon: 'WEAPON:',
        status: 'STATUS:',
        story: [
          '雖然我在現實世界經營生意多年，但在 IT 領域，我只是個剛入伍的新兵。',
          '我本來不懂 IT，但我擅長「指揮」。',
          '這個網站的所有代碼、功能，都是我指揮 AI (Gemini/Cursor) 完成的。',
          '這裡沒有大師，只有一個努力從「二等兵」爬向「指揮官」的生存紀錄。',
          '看著我如何用 AI 武裝自己，一步步建立數位基地。',
        ],
      },
      newsletter: {
        title: 'JOIN THE NETWORK',
        description: '每週發送一次情報週報 (SITREP)。不廢話，只有訊號。',
        placeholder: 'ENTER EMAIL',
        button: 'CONNECT',
      },
      techStack: {
        title: 'POWERED BY MODERN STACK',
      },
    },
    // 通用
    common: {
      loading: '載入中...',
      error: '錯誤',
      noData: '沒有資料',
      readMore: '閱讀更多',
      back: '返回',
      next: '下一頁',
      previous: '上一頁',
      page: '頁',
      of: '共',
    },
    // 認證
    auth: {
      login: '登入',
      logout: '登出',
      access: 'ACCESS',
      id: 'ID',
    },
  },
  'zh-CN': {
    nav: {
      blueprints: 'B. BLUEPRINTS',
      armory: 'A. ARMORY',
      signals: 'S. SIGNALS',
      experiments: 'E. EXPERIMENTS',
      lang: 'LANG:',
    },
    home: {
      hero: {
        headline1: '建立你的基地。执行你的计划。',
        headline2: 'BUILD YOUR BASE. ACT YOUR PLAN.',
        headline3: '基地を築け。計画を実行せよ。',
        subtitle: 'Digital Survival Protocols',
        description: '这里不是心灵鸡汤。这是关于商业战略、数字武装与实战蓝图的生存笔记。',
        cta1: 'ENTER THE BASE (进入基地)',
        cta2: 'VIEW PROTOCOLS (查看蓝图)',
      },
      glitch: {
        title: 'SYSTEM DIAGNOSTIC: THE GLITCH',
        question: '你是否有过这种感觉？',
        points: [
          '读了 100 本书，却依然原地踏步。',
          '下载了无数工具，效率却没有提升。',
          '脑中有完美的创业计划，但迟迟没有写下第一行代码。',
        ],
        error: 'ERROR CODE: INACTION (行动瘫痪).',
        solution: '本基地存在的唯一目的，就是修复这个 Bug。我们将「知识」编译成「可执行的行动」。',
      },
      transmissions: {
        title: 'INCOMING TRANSMISSIONS (最新信号)',
        noPosts: '目前没有文章',
      },
      operator: {
        title: 'OPERATOR ID: THE RECRUIT (新兵)',
        realWorldRank: 'REAL WORLD RANK:',
        digitalRank: 'DIGITAL RANK:',
        weapon: 'WEAPON:',
        status: 'STATUS:',
        story: [
          '虽然我在现实世界经营生意多年，但在 IT 领域，我只是个刚入伍的新兵。',
          '我本来不懂 IT，但我擅长「指挥」。',
          '这个网站的所有代码、功能，都是我指挥 AI (Gemini/Cursor) 完成的。',
          '这里没有大师，只有一个努力从「二等兵」爬向「指挥官」的生存纪录。',
          '看着我如何用 AI 武装自己，一步步建立数字基地。',
        ],
      },
      newsletter: {
        title: 'JOIN THE NETWORK',
        description: '每周发送一次情报周报 (SITREP)。不废话，只有信号。',
        placeholder: 'ENTER EMAIL',
        button: 'CONNECT',
      },
      techStack: {
        title: 'POWERED BY MODERN STACK',
      },
    },
    common: {
      loading: '加载中...',
      error: '错误',
      noData: '没有数据',
      readMore: '阅读更多',
      back: '返回',
      next: '下一页',
      previous: '上一页',
      page: '页',
      of: '共',
    },
    auth: {
      login: '登录',
      logout: '登出',
      access: 'ACCESS',
      id: 'ID',
    },
  },
  'en': {
    nav: {
      blueprints: 'B. BLUEPRINTS',
      armory: 'A. ARMORY',
      signals: 'S. SIGNALS',
      experiments: 'E. EXPERIMENTS',
      lang: 'LANG:',
    },
    home: {
      hero: {
        headline1: 'Build your base. Execute your plan.',
        headline2: 'BUILD YOUR BASE. ACT YOUR PLAN.',
        headline3: '基地を築け。計画を実行せよ。',
        subtitle: 'Digital Survival Protocols',
        description: 'No fluff. Only strategy, tech stacks, and execution blueprints.',
        cta1: 'ENTER THE BASE',
        cta2: 'VIEW PROTOCOLS',
      },
      glitch: {
        title: 'SYSTEM DIAGNOSTIC: THE GLITCH',
        question: 'Have you ever felt this?',
        points: [
          'Read 100 books, but still stuck in place.',
          'Downloaded countless tools, but efficiency never improved.',
          'Have a perfect startup plan in mind, but never wrote the first line of code.',
        ],
        error: 'ERROR CODE: INACTION.',
        solution: 'The sole purpose of this base is to fix this bug. We compile "knowledge" into "executable actions".',
      },
      transmissions: {
        title: 'INCOMING TRANSMISSIONS',
        noPosts: 'No posts available',
      },
      operator: {
        title: 'OPERATOR ID: THE RECRUIT',
        realWorldRank: 'REAL WORLD RANK:',
        digitalRank: 'DIGITAL RANK:',
        weapon: 'WEAPON:',
        status: 'STATUS:',
        story: [
          'Although I have been running a business in the real world for years, in the IT field, I am just a new recruit.',
          'I don\'t understand IT, but I am good at "commanding".',
          'All the code and features of this website were completed by me commanding AI (Gemini/Cursor).',
          'There are no masters here, only a survival record of someone trying to climb from "Private" to "Commander".',
          'Watch how I arm myself with AI and build a digital base step by step.',
        ],
      },
      newsletter: {
        title: 'JOIN THE NETWORK',
        description: 'Weekly intelligence report (SITREP). No fluff, only signals.',
        placeholder: 'ENTER EMAIL',
        button: 'CONNECT',
      },
      techStack: {
        title: 'POWERED BY MODERN STACK',
      },
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      noData: 'No data',
      readMore: 'Read more',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      page: 'Page',
      of: 'of',
    },
    auth: {
      login: 'Login',
      logout: 'Logout',
      access: 'ACCESS',
      id: 'ID',
    },
  },
  'ja': {
    nav: {
      blueprints: 'B. BLUEPRINTS',
      armory: 'A. ARMORY',
      signals: 'S. SIGNALS',
      experiments: 'E. EXPERIMENTS',
      lang: 'LANG:',
    },
    home: {
      hero: {
        headline1: '基地を築け。計画を実行せよ。',
        headline2: 'BUILD YOUR BASE. ACT YOUR PLAN.',
        headline3: '基地を築け。計画を実行せよ。',
        subtitle: 'Digital Survival Protocols',
        description: '心のこもった言葉ではない。ビジネス戦略、デジタル武装、実戦の青図に関する生存ノート。',
        cta1: 'ENTER THE BASE (基地に入る)',
        cta2: 'VIEW PROTOCOLS (青図を見る)',
      },
      glitch: {
        title: 'SYSTEM DIAGNOSTIC: THE GLITCH',
        question: 'このような感覚を経験したことはありますか？',
        points: [
          '100冊の本を読んだが、まだ同じ場所にいる。',
          '無数のツールをダウンロードしたが、効率は向上しなかった。',
          '完璧な起業計画を頭に描いているが、最初のコードの一行も書いていない。',
        ],
        error: 'ERROR CODE: INACTION (行動麻痺).',
        solution: 'この基地の唯一の目的は、このバグを修正することです。私たちは「知識」を「実行可能な行動」にコンパイルします。',
      },
      transmissions: {
        title: 'INCOMING TRANSMISSIONS (最新シグナル)',
        noPosts: '記事がありません',
      },
      operator: {
        title: 'OPERATOR ID: THE RECRUIT (新兵)',
        realWorldRank: 'REAL WORLD RANK:',
        digitalRank: 'DIGITAL RANK:',
        weapon: 'WEAPON:',
        status: 'STATUS:',
        story: [
          '現実世界で何年もビジネスを営んできましたが、IT分野では、私は新兵に過ぎません。',
          '私はITを理解していませんが、「指揮」が得意です。',
          'このウェブサイトのすべてのコードと機能は、私がAI（Gemini/Cursor）を指揮して完成させました。',
          'ここにはマスターはいません。「二等兵」から「指揮官」へと登りつめようとする生存記録だけです。',
          '私がAIで自分を武装し、デジタル基地を一歩ずつ構築する方法を見てください。',
        ],
      },
      newsletter: {
        title: 'JOIN THE NETWORK',
        description: '週に一度の情報レポート（SITREP）を送信します。無駄な言葉はなく、シグナルのみ。',
        placeholder: 'ENTER EMAIL',
        button: 'CONNECT',
      },
      techStack: {
        title: 'POWERED BY MODERN STACK',
      },
    },
    common: {
      loading: '読み込み中...',
      error: 'エラー',
      noData: 'データなし',
      readMore: '続きを読む',
      back: '戻る',
      next: '次へ',
      previous: '前へ',
      page: 'ページ',
      of: '/',
    },
    auth: {
      login: 'ログイン',
      logout: 'ログアウト',
      access: 'ACCESS',
      id: 'ID',
    },
  },
} as const

// 獲取翻譯的輔助函數
export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale]
}

// 獲取語言路由前綴
export function getLocalePath(locale: Locale, path: string = '') {
  if (locale === defaultLocale) {
    return path || '/'
  }
  return `/${locale}${path}`
}

// 從路徑中提取語言
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  
  if (locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale
  }
  
  return defaultLocale
}

// 從路徑中移除語言前綴
export function removeLocaleFromPath(pathname: string): string {
  const locale = getLocaleFromPath(pathname)
  if (locale === defaultLocale) {
    return pathname
  }
  return pathname.replace(`/${locale}`, '') || '/'
}

