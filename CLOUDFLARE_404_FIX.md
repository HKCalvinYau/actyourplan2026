# 🔧 Cloudflare Pages 404 錯誤修復指南

## 問題診斷

您遇到的 404 錯誤通常是因為 Cloudflare Pages 的構建配置不正確。

## ✅ 解決方案

### 方案 1: 檢查 Cloudflare Pages 構建設定（最可能的原因）

在 Cloudflare Dashboard 中，檢查以下設定：

1. **Build command**: `npm run build`
2. **Build output directory**: `.next` ⚠️ **重要！**
3. **Root directory**: `/` (留空)
4. **Framework preset**: `Next.js`

**⚠️ 常見錯誤：**
- Build output directory 設為 `out`（錯誤）
- Build output directory 設為 `.next`（正確）

### 方案 2: 使用 Cloudflare Next.js 適配器（推薦）

如果方案 1 不行，需要使用 Cloudflare 的 Next.js 適配器：

#### 步驟 1: 安裝適配器

```bash
npm install --save-dev @cloudflare/next-on-pages
```

#### 步驟 2: 更新 package.json

添加構建腳本：

```json
{
  "scripts": {
    "build": "next build",
    "pages:build": "npx @cloudflare/next-on-pages",
    "preview": "npx wrangler pages dev .vercel/output/static"
  }
}
```

#### 步驟 3: 更新 next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Cloudflare Pages 配置
  output: 'standalone', // 或根據需要調整
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
      },
    ],
  },
}

module.exports = nextConfig
```

#### 步驟 4: 更新 Cloudflare Pages 構建設定

- **Build command**: `npm run pages:build`
- **Build output directory**: `.vercel/output/static`

### 方案 3: 檢查構建日誌

1. 登入 Cloudflare Dashboard
2. 進入您的 Pages 專案
3. 點擊 **"Deployments"**
4. 查看最新的構建日誌
5. 尋找錯誤訊息

常見錯誤：
- `Error: Cannot find module`
- `Build failed`
- `Output directory not found`

## 🔍 快速檢查清單

在 Cloudflare Pages 設定中確認：

- [ ] **Framework preset** 設為 `Next.js`
- [ ] **Build command** 設為 `npm run build`
- [ ] **Build output directory** 設為 `.next`（或 `.vercel/output/static` 如果使用適配器）
- [ ] **Root directory** 留空（或設為 `/`）
- [ ] **Node.js version** 設為 `18.x` 或 `20.x`
- [ ] 所有環境變數已正確設定

## 📝 環境變數檢查

確認以下環境變數已設定：

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `NODE_ENV=production`
- `KEYSTATIC_GITHUB_TOKEN`

## 🚀 重新部署步驟

1. 修復配置問題
2. 在 Cloudflare Dashboard 中，點擊 **"Retry deployment"**
3. 或推送新的 commit 到 GitHub（會自動觸發部署）

## ⚠️ 重要提醒

如果使用 API 路由（您的專案有 `/api` 路由），必須使用 **方案 2**（Cloudflare Next.js 適配器），因為 Cloudflare Pages 需要特殊配置才能支援 Next.js API 路由。

