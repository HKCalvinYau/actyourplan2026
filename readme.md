# 網站建置方案書：PROJECT [THE BASE]

> 🚀 **準備部署？** 請查看 [DEPLOY_NOW.md](./DEPLOY_NOW.md) 或 [DEPLOYMENT_QUICK_START.md](./DEPLOYMENT_QUICK_START.md)

## 1. 核心規格 (Core Specs)
* **Site Name:** ACT YOUR PLAN
* **Codename:** THE BASE (基地)
* **Identity:** 亂世中的生存戰略與數位實驗室。
* **Languages:** 繁體中文 (Main) | 简体中文 | English | 日本語
* **Design Theme:** Dark Mode (深色模式), Monospaced Fonts (等寬字體), Grid Lines (網格線), Tactical Green (戰術綠).
* **Target Audience:** 迷惘的行動者、尋求實戰策略的職場人、對 IT/創業感興趣的未來規劃者。

---

## 2. 網站結構 (Sitemap Architecture)

ROOT [ACT YOUR PLAN]
├── 0. HEADER (HUD Navigation)
│
├── 1. HOME (Command Dashboard / 指揮儀表板)
│
├── 2. B.A.S.E. MODULES (核心模組)
│   ├── B - BLUEPRINTS (戰略藍圖 / Books)
│   ├── A - ARMORY (數位軍火庫 / Tools)
│   ├── S - SIGNALS (情報訊號 / Intel)
│   └── E - EXPERIMENTS (實驗室 / IT Projects)
│
├── 3. USER SYSTEM (身份系統)
│   ├── LOGIN / AUTH (身份驗證)
│   └── PROFILE (操作員檔案)
│
├── 4. ABOUT (The Operator / 關於我)
│
└── 5. FOOTER (System Info)

---

## 3. 詳細文案與設計 (Detailed Copy & Design)

### 0. HEADER (導航列)
**設計概念：** 抬頭顯示器 (Heads-Up Display)，功能導向。

* **Left (Logo):** `[ ACT YOUR PLAN ]_` (游標閃爍效果)
* **Center (Menu):**
    * `B. BLUEPRINTS`
    * `A. ARMORY`
    * `S. SIGNALS`
    * `E. EXPERIMENTS`
* **Right (Utility):**
    * `LANG: [ 繁 | 简 | EN | JP ]`
    * `[ 🔒 ACCESS ]` (未登入狀態) / `[ 🟢 ID: USER ]` (已登入)

---

### 1. HOME (首頁 / 戰術儀表板)

#### **A. Hero Section (首屏)**
**視覺：** 深灰背景，帶有極細的坐標線。文字巨大且有力。

* **Headline (H1):**
    * (繁/简) **建立你的基地。執行你的計畫。**
    * (EN) **BUILD YOUR BASE. ACT YOUR PLAN.**
    * (JP) **基地を築け。計画を実行せよ。**

* **Sub-headline:**
    * (繁) **// Digital Survival Protocols**
        這裡不是心靈雞湯。這是關於**商業戰略**、**數位武裝**與**實戰藍圖**的生存筆記。
    * (EN) **// Digital Survival Protocols**
        No fluff. Only strategy, tech stacks, and execution blueprints.

* **Call to Action (Buttons):**
    * `[ > ENTER THE BASE (進入基地) ]` (主按鈕，實色)
    * `[ VIEW PROTOCOLS (查看藍圖) ]` (次按鈕，框線)

#### **B. The B.A.S.E. Grid (核心功能矩陣)**
**設計：** 四宮格佈局，像武器箱的格子。

| 格位 | Icon | 標題 (Title) | 描述 (Description) |
| :--- | :--- | :--- | :--- |
| **B** | 📐 | **BLUEPRINTS**<br>戰略藍圖 | **[STRATEGY]**<br>解構經典書籍與商業模式。<br>我們提取底層代碼 (Source Code)，重塑你的思維系統。 |
| **A** | 📦 | **ARMORY**<br>數位軍火庫 | **[WEAPONS]**<br>工欲善其事，必先升級武器。<br>評測最強 SaaS、AI 工具與自動化腳本。 |
| **S** | 📡 | **SIGNALS**<br>情報訊號 | **[INTEL]**<br>雜訊即敵人。<br>過濾無效新聞，鎖定關鍵時事與科技趨勢的偵查報告。 |
| **E** | 🧪 | **EXPERIMENTS**<br>實驗室 | **[BETA]**<br>見證從 0 到 1 的構建過程。<br>我的 Web App 開發日誌與 MVP 測試檔案。 |

#### **C. Latest Intel (最新文章流)**
**標題：** `// INCOMING TRANSMISSIONS (最新訊號)`

* **列表樣式：** 模仿終端機 Log 格式
    * `[2024-12-02] [TYPE: ARMORY] Title: 如何用 Notion 打造自動化 CRM...`
    * `[2024-12-01] [TYPE: SIGNAL] Title: AI 時代的傳統行業生存戰...`

---

### 2. USER SYSTEM (登入/身份系統)

#### **A. Login Page (身份驗證頁)**
**設計：** 模仿終端機 (Terminal) 輸入畫面，黑色背景，綠色文字。

* **Headline:** `SYSTEM ACCESS REQUIRED` (需要系統權限)
* **Sub-text:**
    * (繁) 請輸入通訊地址以建立連線。
    * (EN) Enter email to establish connection.
    * (JP) 接続を確立するためにメールアドレスを入力してください。
* **Input Field:** `> EMAIL ADDRESS: _`
* **Button:** `[ ESTABLISH CONNECTION ]`
* **Value Prop:**
    * `> STATUS: GUEST` (遊客) -> 只能瀏覽公開資訊。
    * `> STATUS: OPERATOR` (操作員) -> **解鎖每週情報週報 (SITREP) 與工具收藏功能。**

---

### 3. ABOUT PAGE (關於我)

**標題：** `// OPERATOR PROFILE (操作員檔案)`

**文案 (繁體中文)：**
> **ID:** The Founder (或你的稱呼)
> **Class:** Operator (實踐者) / Builder (構建者)
> **Location:** Hong Kong
>
> **[ THE BACKSTORY ]**
> 我是一個傳統實業經營者，也是一個數位世界的探索者。
> 在現實的商業戰場上，我看過太多計畫死於「缺乏行動」。這不是因為人們不夠聰明，而是因為他們缺乏兩樣東西：**系統化的戰略 (The Blueprint)** 與 **趁手的武器 (The Armor)**。
>
> **[ THE MISSION ]**
> 此網站是我的**數位轉型實驗基地**。
> 我將實體生意的**經營智慧 (Business Logic)** 翻譯成 **IT 語言 (Code)**。
> 這裡沒有理論家，只有**實踐 (Action)**。
>
> **[ TECH STACK ]**
> * Management: Notion, Obsidian
> * Development: Next.js, Python
> * Operations: AI Automation

---

### 4. FOOTER (頁尾)

**設計：** 三欄佈局，使用等寬字體，戰術風格。

* **Left:** `© 202X ACT YOUR PLAN. SYSTEM STATUS: ALL SYSTEMS OPERATIONAL.`
* **Center:** `[ RSS FEED ]` | `[ EMAIL PROTOCOL ]` | `[ X / TWITTER ]`
* **Right:** `BUILT WITH [NEXT.JS]. DEPLOYED ON [CLOUDFLARE PAGES].`

---

## 4. 語言對照表 (Localization Key)

| English (Original) | Traditional Chinese (繁) | Simplified Chinese (简) | Japanese (日) |
| :--- | :--- | :--- | :--- |
| **THE BASE** | 基地 | 基地 | ベース (Base) |
| **Blueprints** | 戰略藍圖 | 战略蓝图 | 戦略設計図 |
| **Armory** | 數位軍火庫 | 数字军火库 | 武器庫 (Armory) |
| **Signals** | 情報訊號 | 情报讯号 | 情報シグナル |
| **Experiments** | 實驗室 | 实验室 | 実験室 (Labs) |
| **Access / Login** | 身份驗證 | 身份验证 | アクセス (Access) |
| **Operator** | 操作員 | 操作员 | オペレーター |
| **Protocol** | 協議 / 指南 | 协议 / 指南 | プロトコル |
| **Action** | 行動 / 實踐 | 行动 / 实践 | 実行 (Action) |

---

## 5. 技術設定 (Technical Setup)

### 技術棧 (Tech Stack)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** Cloudflare Pages

### 設計系統 (Design System)

#### 顏色調色板 (Color Palette)
- **Background:** `#0a0a0a` (深黑) - 使用 `bg-background`
- **Surface:** `#171717` (炭灰) - 使用 `bg-surface`
- **Primary:** `#22c55e` (戰術綠 / Tailwind green-500) - 使用 `bg-primary` 或 `text-primary`
- **Text-Main:** `#e5e5e5` - 使用 `text-text-main`
- **Text-Muted:** `#737373` - 使用 `text-text-muted`
- **Border:** `#262626` - 使用 `border-border`

#### 字體設定 (Typography)
- **標題 (Headings):** Inter (Bold, Uppercase)
  - 使用 `font-heading` class
  - 透過 `next/font/google` 載入
- **內文/程式碼 (Body/Code):** JetBrains Mono (等寬字體，像終端機)
  - 使用 `font-body` 或 `font-mono` class
  - 透過 `next/font/google` 載入

#### UI 元素樣式 (UI Elements)
- **網格線背景:** 已設定在 `globals.css`，使用半透明綠色網格線 (20px x 20px)
- **按鈕樣式:**
  - `.btn-tactical` - 方形按鈕，粗邊框，Hover 時有反白和發光效果
  - `.btn-tactical-primary` - 實色按鈕變體
  - `.btn-glitch` - 可選的 Glitch 效果（需配合 `data-text` 屬性）

### 檔案結構 (File Structure)
```
the base/
├── app/
│   ├── layout.tsx          # 根佈局，設定字體和 metadata
│   ├── page.tsx            # 首頁（整合 Header、Hero、BaseGrid）
│   └── globals.css         # 全域樣式，包含網格線背景、按鈕樣式和動畫
├── components/
│   ├── Header.tsx          # 導航列元件（固定頂部、Logo、Menu、Utility、手機版漢堡選單）
│   ├── Hero.tsx            # 首屏元件（大標題、副標題、CTA 按鈕、背景動畫）
│   └── BaseGrid.tsx       # B.A.S.E. 模組網格元件（2x2 矩陣，武器箱風格）
├── tailwind.config.ts      # Tailwind 設定，包含設計系統變數
├── package.json            # 專案依賴
├── tsconfig.json           # TypeScript 設定
├── next.config.js          # Next.js 設定
├── postcss.config.js       # PostCSS 設定
└── readme.md               # 本文件
```

### 開發指令 (Development Commands)
```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置生產版本
npm run build

# 啟動生產伺服器
npm start

# 執行 Lint 檢查
npm run lint
```

### 使用方式 (Usage)

#### 使用設計系統顏色
```tsx
<div className="bg-background text-text-main border-border">
  {/* 使用 Tailwind 的設計系統顏色 */}
</div>
```

#### 使用字體
```tsx
<h1 className="font-heading font-bold uppercase">標題</h1>
<p className="font-body">內文使用等寬字體</p>
<code className="font-mono">程式碼</code>
```

#### 使用按鈕樣式
```tsx
<button className="btn-tactical btn-tactical-primary">
  &gt; ENTER THE BASE
</button>
<button className="btn-tactical">
  VIEW PROTOCOLS
</button>
```

#### 使用 Lucide React Icons
```tsx
import { IconName } from 'lucide-react'

<IconName className="w-6 h-6 text-primary" />
```

#### 使用元件
```tsx
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import BaseGrid from '@/components/BaseGrid'

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BaseGrid />
      </main>
    </>
  )
}
```

### 元件說明 (Components Documentation)

#### Header 元件 (`components/Header.tsx`)
- **功能：** 固定頂部的導航列（HUD Navigation）
- **特性：**
  - 左側 Logo：`[ ACT YOUR PLAN ]`（程式碼風格）
  - 中間選單：B. BLUEPRINTS, A. ARMORY, S. SIGNALS, E. EXPERIMENTS
  - 右側工具：ACCESS 按鈕（帶鎖圖示）
  - 響應式設計：手機版使用漢堡選單
  - 使用 `sticky` 定位，帶有背景模糊效果

#### Hero Section (首屏)
- **功能：** 首屏展示區域
- **視覺：** 深灰背景，帶有極細的坐標線（網格線）。文字巨大且有力。
- **特性：**
  - **Headline (H1):**
    - (繁/简) **建立你的基地。執行你的計畫。**
    - (EN) **BUILD YOUR BASE. ACT YOUR PLAN.**
    - (JP) **基地を築け。計画を実行せよ。**
  - **Sub-headline:**
    - (繁) **// Digital Survival Protocols** 這裡不是心靈雞湯。這是關於**商業戰略**、**數位武裝**與**實戰藍圖**的生存筆記。
    - (EN) **// Digital Survival Protocols** No fluff. Only strategy, tech stacks, and execution blueprints.
  - **Call to Action (Buttons):**
    - `[ > ENTER THE BASE (進入基地) ]` (主按鈕，實色戰術綠背景，黑字)
    - `[ VIEW PROTOCOLS (查看藍圖) ]` (次按鈕，空心綠色邊框，綠字)

#### The B.A.S.E. Grid (核心功能矩陣)
- **功能：** B.A.S.E. 核心模組展示網格
- **設計：** 四宮格佈局，像武器箱的格子。使用 CSS Grid 建立 2x2 的正方形矩陣（Mobile 轉為 1 欄）。
- **Style：** 每個格子像一個「武器箱」，有深灰色邊框 (border-neutral-800)。Hover 時邊框變亮或發光。
- **內容（必須完全一致）：**
  - **[B] Icon: Ruler/Blueprint**
    - Title: "BLUEPRINTS" / "戰略藍圖"
    - Desc: "[STRATEGY] 解構經典書籍與商業模式。我們提取底層代碼，重塑你的思維系統。"
  - **[A] Icon: Package/Box**
    - Title: "ARMORY" / "數位軍火庫"
    - Desc: "[WEAPONS] 工欲善其事，必先升級武器。評測最強 SaaS、AI 工具與自動化腳本。"
  - **[S] Icon: Radar/Signal**
    - Title: "SIGNALS" / "情報訊號"
    - Desc: "[INTEL] 雜訊即敵人。過濾無效新聞，鎖定關鍵時事與科技趨勢的偵查報告。"
  - **[E] Icon: Flask/TestTube**
    - Title: "EXPERIMENTS" / "實驗室"
    - Desc: "[BETA] 見證從 0 到 1 的構建過程。我的 Web App 開發日誌與 MVP 測試檔案。"

### 動畫效果 (Animation Effects)

#### 背景動畫
- **雷達掃描 (Radar)：** 三個同心圓圈，不同速度的縮放和透明度動畫
- **數據流動 (Flow)：** 垂直線條的流動效果，模擬數據傳輸
- **脈衝光暈 (Pulse)：** 徑向漸變的脈衝效果

所有動畫定義在 `globals.css` 中，使用 CSS `@keyframes` 實現。

### File-based CMS 系統 (Content Management System)

#### 架構說明
本專案使用 **File-based CMS** 方式管理內容，不依賴外部資料庫。所有內容都儲存在 `content` 資料夾中，使用 MDX (Markdown + JSX) 格式。

#### 資料夾結構
```
content/
├── blueprints/    # 戰略藍圖文章
├── armory/        # 數位軍火庫文章
├── signals/       # 情報訊號文章
└── experiments/   # 實驗室文章
```

#### Frontmatter 格式
每篇 `.mdx` 檔案都需要包含以下 Frontmatter：

```yaml
---
title: "文章標題"
date: "2024-01-15"
description: "文章簡介"
tags:
  - "標籤1"
  - "標籤2"
specs:  # 可選，用於 Blueprints 和 Armory
  "適用對象": "傳統實業經營者"
  "執行時間": "3-6 個月"
  "難度等級": "中級"
---
```

#### 工具函式 (`lib/mdx.ts`)
- `getAllPosts(type)` - 獲取指定類型的所有文章
- `getAllPostsAllTypes()` - 獲取所有類型的文章
- `getPostBySlug(type, slug)` - 獲取單篇文章
- `getAllSlugs(type)` - 獲取所有 slug（用於動態路由）
- `getPostsByTag(type, tag)` - 根據標籤篩選文章
- `searchPosts(type, query)` - 搜尋文章

#### 使用方式

**建立新文章：**
1. 在對應的 `content/[type]/` 資料夾中建立 `.mdx` 檔案
2. 檔案名稱會成為 URL slug（例如：`example-blueprint.mdx` → `/blueprints/example-blueprint`）
3. 在檔案開頭加入 Frontmatter
4. 使用 Markdown 語法撰寫內容

**範例：**
```markdown
---
title: "如何建立你的數位轉型藍圖"
date: "2024-01-15"
description: "從傳統實業到數位化的完整戰略指南"
tags:
  - "戰略規劃"
  - "數位轉型"
specs:
  "適用對象": "傳統實業經營者"
  "執行時間": "3-6 個月"
---

## 文章內容

使用 Markdown 語法撰寫...
```

#### 頁面路由
- `/blueprints` - Blueprints 列表頁
- `/blueprints/[slug]` - Blueprints 文章內頁
- （其他類型同理：`/armory`, `/signals`, `/experiments`）

#### UI 特色
- **列表頁：** 卡片視圖 + 檔案清單視圖
- **文章內頁：** 戰術規格表（Spec Sheet）顯示在最上方
- **樣式：** 符合戰術設計系統，使用等寬字體和綠色主題

### TacticalImage 元件 (`components/TacticalImage.tsx`)

#### 功能說明
戰術風格的圖片組件，包含：
- **戰術邊框：** 綠色邊框，四個角落有十字準星裝飾
- **錯誤處理：** 載入失敗時顯示 "NO SIGNAL" 佔位圖
- **綠色濾鏡：** 可選的覆蓋層，模擬螢幕顯示效果
- **載入狀態：** 顯示 "LOADING..." 提示

#### 使用方式

**1. 將圖片放在 `public` 資料夾中：**
```
public/
├── images/
│   ├── illustration-1.jpg
│   ├── illustration-2.png
│   └── ...
```

**2. 在元件中引用：**
```tsx
import TacticalImage from '@/components/TacticalImage'

// 基本使用
<TacticalImage 
  src="/images/illustration-1.jpg" 
  alt="插圖描述" 
/>

// 自訂選項
<TacticalImage 
  src="/images/illustration-2.png" 
  alt="插圖描述"
  overlay={true}    // 顯示綠色濾鏡（預設 true）
  frame={true}      // 顯示戰術邊框（預設 true）
  className="my-8"  // 自訂 CSS 類別
/>
```

**3. 在 MDX 檔案中使用：**
由於 MDX 支援 JSX，您可以直接在 `.mdx` 檔案中使用：

```mdx
---
title: "文章標題"
---

import TacticalImage from '@/components/TacticalImage'

## 章節標題

<TacticalImage 
  src="/images/my-illustration.jpg" 
  alt="我的插圖" 
/>

文章內容...
```

**注意事項：**
- 圖片路徑從 `public` 資料夾開始，不需要包含 `public`
- 例如：`public/images/photo.jpg` → `/images/photo.jpg`
- 支援常見圖片格式：`.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
- 如果圖片載入失敗，會自動顯示 "NO SIGNAL" 佔位圖

### 已知問題與改進 (Known Issues & Improvements)
- ✅ 已完成：Next.js 14 專案初始化
- ✅ 已完成：Tailwind CSS 設定與設計系統變數
- ✅ 已完成：網格線背景效果
- ✅ 已完成：字體設定 (Inter + JetBrains Mono)
- ✅ 已完成：Lucide React 安裝
- ✅ 已完成：Header 導航列元件
- ✅ 已完成：Hero 首屏元件（含背景動畫）
- ✅ 已完成：BaseGrid 模組網格元件
- ✅ 已完成：File-based CMS 系統（MDX）
- ✅ 已完成：Blueprints、Armory、Signals、Experiments 列表頁和文章內頁
- ✅ 已完成：USER SYSTEM (登入/身份系統)
  - ✅ Login Page (身份驗證頁) - 終端機風格輸入畫面
  - ⏳ 待完成：PROFILE (操作員檔案)
- ⏳ 待完成：ABOUT PAGE (關於我)
  - OPERATOR PROFILE (操作員檔案)
  - THE BACKSTORY、THE MISSION、TECH STACK 區塊
- ⏳ 待完成：FOOTER (頁尾)
  - 三欄佈局：版權資訊、社交連結、技術資訊
- ✅ 已完成：多語言支援（繁體中文、简体中文、English、日本語）
- ✅ 已完成：文章搜尋和篩選功能
- ✅ 已完成：SEO 優化（meta tags、sitemap、robots.txt）
- ✅ 已完成：圖片優化（Next.js Image 組件）
- ✅ 已完成：Google Analytics 準備

---

## 8. 優化功能 (Optimization Features)

### 8.1 SEO 優化

#### Meta Tags
- ✅ 完整的 Open Graph 標籤
- ✅ Twitter Cards 支援
- ✅ 多語言 hreflang 標籤
- ✅ 結構化數據準備

**使用方式：**
```tsx
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: '頁面標題',
  description: '頁面描述',
  keywords: ['關鍵字1', '關鍵字2'],
  type: 'article',
})
```

#### Sitemap 和 Robots.txt
- ✅ 動態生成 `sitemap.xml` (`/sitemap.xml`)
- ✅ 動態生成 `robots.txt` (`/robots.txt`)
- ✅ 自動包含所有文章和頁面
- ✅ 支援多語言路由

### 8.2 圖片優化

#### Next.js Image 組件
- ✅ `TacticalImage` 組件已使用 Next.js Image
- ✅ 自動圖片優化（WebP, AVIF）
- ✅ 響應式圖片
- ✅ 懶加載
- ✅ 外部圖片支援

**配置：**
- `next.config.js` 已配置圖片優化
- 支援所有外部圖片域名

### 8.3 多語言系統 (i18n)

#### 支援語言
- ✅ 繁體中文 (zh-TW) - 預設
- ✅ 简体中文 (zh-CN)
- ✅ English (en)
- ✅ 日本語 (ja)

#### 功能
- ✅ 完整的翻譯對照表
- ✅ 語言切換組件
- ✅ 路由處理工具
- ✅ Header 已整合語言切換

**使用方式：**
```tsx
import { getTranslations, getLocaleFromPath } from '@/lib/i18n'
import { usePathname } from 'next/navigation'

const pathname = usePathname()
const locale = getLocaleFromPath(pathname)
const t = getTranslations(locale)

return <h1>{t.home.hero.headline1}</h1>
```

**詳細說明：** 請參考 `I18N_IMPLEMENTATION.md`

### 8.4 監控和分析

#### Google Analytics
- ✅ Google Analytics 組件準備完成
- ✅ 環境變數配置

**配置方式：**
在環境變數中添加：
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**詳細說明：** 請參考 `OPTIMIZATION_SUMMARY.md`

---

## 9. 部署相關

### 9.1 Cloudflare Pages 部署

詳細部署計劃請參考：
- `DEPLOYMENT_PLAN.md` - 完整部署計劃
- `cloudflare-pages-deployment.md` - 逐步部署指南
- `DEPLOYMENT_CHECKLIST.md` - 部署檢查清單

### 9.2 環境變數

部署前需要設定的環境變數：
```bash
# 管理員認證
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password

# Keystatic GitHub Storage
KEYSTATIC_GITHUB_TOKEN=your_github_token

# Google Analytics (可選)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 網站 URL (用於 SEO)
NEXT_PUBLIC_SITE_URL=https://actyourplan.com
```