# THE BASE - Digital Strategy Platform

一個基於 **Astro SSR + Cloudflare D1** 的數位戰略基地網站。
此專案旨在提供高效能、低延遲的內容發布平台，並整合多語言與戰術風格 UI。

## 🛠 技術架構 (Tech Stack)

- **Framework**: Astro v5 (SSR Mode)
- **Database**: Cloudflare D1 (SQLite)
- **Styling**: Tailwind CSS v3
- **Deployment**: Cloudflare Pages
- **Language**: TypeScript

## 📂 專案結構 (Project Structure)

```text
src/
├── components/        # UI 元件 (React/Astro)
│   ├── ArticleCard.tsx    # 文章卡片
│   ├── Header.tsx         # 導航列 (Client-side interactivity)
│   └── ...
├── layouts/           # 頁面佈局
│   └── Layout.astro       # 主佈局 (處理 Meta, OpenGraph, i18n Context)
├── lib/               # 核心邏輯庫
│   ├── d1.ts              # D1 資料庫操作 (含 Mock Data 機制)
│   ├── i18n.ts            # 多語言設定與翻譯字典
│   └── ...
├── middleware.ts      # Astro Middleware (處理 i18n 路由重寫)
├── env.d.ts           # 型別定義 (App.Locals 擴充)
└── pages/             # 路由定義
    ├── index.astro            # 首頁
    ├── [type]/index.astro     # 通用列表頁 (Armory, Signals, Experiments)
    ├── [type]/[slug].astro    # 通用文章詳情頁
    └── blueprints/index.astro # 藍圖列表頁 (客製化樣式)
```

## 🚀 快速開始 (Quick Start)

### 安裝依賴
```bash
npm install
```

### 啟動本地開發伺服器
```bash
npm run dev
```
- 網站將運行於 `http://localhost:4321`
- 若未連接 D1，系統會自動使用 **Mock Data**，確保頁面正常顯示。

## 🌍 多語言系統 (i18n System)

本專案使用 **URL 前綴** (`/en/`, `/zh-CN/`) 搭配 **Astro Middleware** 實現多語言。

### 運作原理
1. **Middleware (`src/middleware.ts`)**:
   - 攔截請求，檢查 URL 是否包含語言前綴。
   - 提取語言代碼並存入 `Astro.locals.locale`。
   - 使用 `rewrite` 將路徑重寫為無前綴版本 (例如 `/en/armory` -> `/armory`)，以便匹配通用路由。
   - 若為預設語言 (`zh-TW`)，會自動重定向移除前綴。

2. **頁面獲取語言**:
   ```typescript
   // In .astro files
   const currentLocale = Astro.locals.locale || 'zh-TW';
   ```

3. **生成連結**:
   使用 `src/lib/i18n.ts` 提供的 `getLocalePath`：
   ```typescript
   import { getLocalePath } from '../../lib/i18n';
   // 生成 /en/blueprints/slug
   <a href={getLocalePath(currentLocale, `/blueprints/${slug}`)}>Link</a>
   ```

## 💾 資料庫 (Database & Mocking)

### Mock Data
在 `src/lib/d1.ts` 中實作了 `getPosts` 與 `getPost`。
- 當環境變數 `DB` 不存在 (本地開發) 時，自動回傳內建的 Mock Data。
- 這允許開發者在不需連線 Cloudflare D1 的情況下開發 UI。

### D1 Schema (Posts)
| Column     | Type    | Description |
|------------|---------|-------------|
| id         | INTEGER | Primary Key, Auto-increment |
| slug       | TEXT    | Unique Slug |
| type       | TEXT    | blueprints, armory, signals, experiments |
| title      | TEXT    | Title |
| content    | TEXT    | Markdown Content |
| metadata   | TEXT    | JSON string (rank, tags, etc.) |
| created_at | INTEGER | Timestamp |
| updated_at | INTEGER | Timestamp |

### 部署到 Cloudflare（含 D1）
請參閱 **[DEPLOY.md](./DEPLOY.md)**，內含：建立 D1、執行 migration、建置、部署至 Pages、環境變數與後台設定。

## 🎨 新增內容類型 (Content Types)

目前支援以下類型：
1. **Blueprints (`/blueprints`)**: 戰略藍圖
2. **Armory (`/armory`)**: 數位工具
3. **Signals (`/signals`)**: 情報訊號
4. **Experiments (`/experiments`)**: 戰術實驗

若需新增類型：
1. 在 `src/lib/i18n.ts` 的 `nav` 和 `sections` 中新增翻譯。
2. 在 `src/pages/[type]/index.astro` 的 `validTypes` 陣列中加入新類型。

## 📝 待辦事項
請參閱 `HANDOVER.md` 了解最新進度與剩餘任務。
