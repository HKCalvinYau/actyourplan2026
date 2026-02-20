# THE BASE - Project Handover

## 專案概述 (Project Overview)
本專案是一個數位戰略基地網站，採用 **Astro SSR + Cloudflare D1 + Tailwind CSS** 架構。
前身為 Next.js + Keystatic，現已完成遷移，以追求更快的載入速度與更低的維護成本。

- **框架**: Astro v5 (SSR Mode)
- **資料庫**: Cloudflare D1 (SQLite)
- **樣式**: Tailwind CSS v3 (戰術風格)
- **部署**: Cloudflare Pages

---

## 關鍵檔案結構 (Key Structure)

```
src/
├── components/        # React/Astro UI 元件 (已移除所有 Next.js 依賴)
├── layouts/           # 頁面佈局 (Layout.astro)
├── lib/
│   ├── d1.ts          # D1 資料庫存取邏輯 (包含 Mock Data 機制)
│   ├── image-cdn.ts   # 圖片路徑處理
│   └── i18n.ts        # 多語言設定
├── pages/
│   ├── index.astro          # 首頁 (讀取 D1 最新文章)
│   ├── admin.astro          # 簡易後台 (尚未完全實作寫入功能)
│   └── [type]/              # 動態路由
│       ├── index.astro      # 列表頁 (如 /blueprints)
│       └── [slug].astro     # 文章內頁 (讀取 D1 內容 + Markdown 渲染)
├── styles/
│   └── globals.css          # 全局樣式 & Tailwind Directives
└── ...
```

---

## 已完成事項 (Completed)

1. **架構遷移**: 成功從 Next.js 遷移至 Astro，並移除所有 `next/*` (Image, Link, Script, Navigation) 依賴。
2. **資料庫整合**:
   - `src/lib/d1.ts` 封裝了 D1 操作。
   - 實作了 **本地 Mock Data** 機制：當本地開發且無 D1 連線時，自動回傳假資料，避免頁面報錯。
3. **樣式修復**:
   - 修正 `tailwind.config.ts` 的 `content` 路徑，確保樣式正確編譯。
   - 修正 `font-family` 設定，還原設計稿的 `Inter` (Sans-serif) + `JetBrains Mono` (Monospace) 搭配。
4. **路由系統**:
   - 實作了首頁、列表頁、以及 `[type]/[slug]` 文章內頁。
   - 連結與跳轉功能均已測試正常。

---

## 待辦事項 (TODO / Next Steps)

1. **圖片遷移 (Priority: High)**
   - 目前 `public/images` 大多缺失，導致本地與線上圖片 404。
   - 需將舊專案的圖片資源搬移至 `public/images`。

6. **完美後台 (Completed)**
   - 重構 `/admin` 為 React SPA 應用 (`AdminDashboard.tsx`)。
   - 實作完整的 CRUD API (`src/pages/api/posts/*`)。
   - 支援文章列表、新增、編輯 (Markdown 預覽)、刪除。
   - 實作簡易密碼登入機制 (Cookie Session)。
   - R2 整合介面已預留，待 `wrangler.toml` 設定 `r2_buckets` 後即可啟用。

7. **圖片遷移 (Priority: High)**
   - 檢查 `src/layouts/Layout.astro` 的 Meta 標籤是否完整。
   - 確保 Open Graph 圖片能正確顯示。

4. **多語言切換 (Completed)**
   - `src/components/LanguageSwitcher.tsx` 已改寫為 `window.location` 跳轉。
   - `src/middleware.ts` 已實作：自動偵測 URL 語言前綴 (`/en/...`)，設定 `Astro.locals.locale` 並重寫路由。
   - `src/pages/[type]/index.astro` 與 `[slug].astro` 已整合多語言路由。
   - `src/layouts/Layout.astro` 與 `Header.tsx` 已支援語言狀態保持。

5. **通用列表頁 (Completed)**
   - 實作了 `src/pages/[type]/index.astro`，自動處理 `/armory`, `/signals`, `/experiments` 的列表顯示。
   - 整合 `src/lib/i18n.ts` 顯示對應的標題與描述。

---

## 本地開發指南 (Development)

### 啟動伺服器
```bash
npm run dev
```
- 預設 Port: `4321`
- 如果 Terminal 顯示 `⚠️ D1 Database empty in DEV mode. Using mock data.`，代表正在使用假資料，這是正常的。

### 本地資料庫 (Optional)
如果想在本地測試真實資料庫操作：
1. 確保已登入 Wrangler: `npx wrangler login`
2. 建立本地表格:
   ```bash
   npx wrangler d1 execute DB --local --command "CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE, type TEXT, title TEXT, content TEXT, metadata TEXT, created_at INTEGER, updated_at INTEGER);"
   ```
3. 寫入測試資料 (可透過 SQL 或 Admin 介面)。

---

## 部署 (Deployment)

推送到 GitHub `main` 分支即可觸發 Cloudflare Pages 自動部署。

```bash
git push origin main
```

---

**最後狀態**: 網站外觀已還原，本地運行無報錯，Mock Data 運作正常。下一手可直接專注於內容填充與 Admin 功能開發。
