# 多語言系統實作說明

## 📋 概述

已實作完整的多語言（i18n）系統，支援四種語言：
- 繁體中文 (zh-TW) - 預設語言
- 简体中文 (zh-CN)
- English (en)
- 日本語 (ja)

## 🏗️ 架構

### 1. 核心文件

#### `lib/i18n.ts`
- 定義所有支援的語言
- 包含完整的翻譯對照表
- 提供語言路由和路徑處理工具函數

#### `components/LanguageSwitcher.tsx`
- 語言切換組件
- 自動處理路由轉換
- 支援所有語言

### 2. 路由結構

目前系統使用**客戶端路由切換**，未來可以擴展為完整的服務端路由：

**當前結構：**
```
/                    → 預設語言 (zh-TW)
/blueprints          → 預設語言
/zh-CN/blueprints    → 简体中文
/en/blueprints       → English
/ja/blueprints       → 日本語
```

**未來擴展（可選）：**
可以創建 `app/[locale]` 資料夾結構來實現完整的服務端路由。

## 🔧 使用方法

### 在組件中使用翻譯

```tsx
'use client'

import { usePathname } from 'next/navigation'
import { getTranslations, getLocaleFromPath } from '@/lib/i18n'

export default function MyComponent() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const t = getTranslations(locale)

  return (
    <div>
      <h1>{t.home.hero.headline1}</h1>
      <p>{t.home.hero.description}</p>
    </div>
  )
}
```

### 生成多語言連結

```tsx
import { getLocalePath, getLocaleFromPath } from '@/lib/i18n'

const locale = getLocaleFromPath(pathname)
const blueprintsLink = getLocalePath(locale, '/blueprints')
// 預設語言: '/blueprints'
// 其他語言: '/zh-CN/blueprints', '/en/blueprints', '/ja/blueprints'
```

## 📝 添加新翻譯

### 1. 在 `lib/i18n.ts` 中添加翻譯

```typescript
export const translations = {
  'zh-TW': {
    // ... 現有翻譯
    newSection: {
      title: '新標題',
      description: '新描述',
    },
  },
  'en': {
    // ... 現有翻譯
    newSection: {
      title: 'New Title',
      description: 'New Description',
    },
  },
  // ... 其他語言
}
```

### 2. 在組件中使用

```tsx
const t = getTranslations(locale)
return <h1>{t.newSection.title}</h1>
```

## 🚀 完整路由實作（可選）

如果需要完整的服務端路由支援，可以創建以下結構：

```
app/
├── [locale]/
│   ├── layout.tsx          # 語言布局
│   ├── page.tsx            # 首頁
│   ├── blueprints/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   └── ...
├── layout.tsx              # 根布局
└── ...
```

### 實作步驟：

1. **創建 `app/[locale]/layout.tsx`**：
```tsx
import { Locale, locales } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(params.locale as Locale)) {
    notFound()
  }

  return <>{children}</>
}
```

2. **移動現有頁面到 `app/[locale]/` 資料夾**

3. **更新 middleware.ts** 處理語言重定向

## ⚠️ 注意事項

1. **預設語言**：繁體中文 (zh-TW) 不需要語言前綴
2. **語言切換**：使用 `LanguageSwitcher` 組件自動處理
3. **SEO**：已配置多語言 meta tags 和 hreflang
4. **翻譯完整性**：確保所有語言都有對應的翻譯

## 🔄 未來改進

- [ ] 實作完整的服務端路由結構
- [ ] 添加語言自動檢測
- [ ] 支援語言特定的內容（不同語言顯示不同文章）
- [ ] 添加翻譯管理工具
- [ ] 實作語言切換動畫

