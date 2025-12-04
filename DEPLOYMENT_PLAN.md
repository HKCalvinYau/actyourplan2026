# Cloudflare Pages 部署計劃

## 📋 部署前準備清單

### 1. 環境變數設定

#### 必須設定的環境變數：
- `ADMIN_USERNAME`: 管理員用戶名（預設：admin）
- `ADMIN_PASSWORD`: 管理員密碼（預設：admin123）
- `NODE_ENV`: 生產環境設定（production）

#### 在 Cloudflare Pages 中設定：
1. 進入 Cloudflare Dashboard
2. 選擇您的 Pages 專案
3. 進入 Settings → Environment Variables
4. 添加以下變數：
   ```
   ADMIN_USERNAME=your_username
   ADMIN_PASSWORD=your_secure_password
   NODE_ENV=production
   ```

### 2. GitHub Repository 準備

#### 步驟：
1. 在 GitHub 創建新的 Repository
2. 將本地代碼推送到 GitHub：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. 確保 `.gitignore` 包含：
   ```
   .next
   node_modules
   .env.local
   .env*.local
   ```

### 3. Keystatic 配置更新

#### 需要修改 `keystatic.config.ts`：

**當前配置（本地開發）：**
```typescript
storage: {
  kind: 'local',
}
```

**部署到 Cloudflare 的配置：**
```typescript
storage: {
  kind: 'github',
  repo: {
    owner: 'YOUR_GITHUB_USERNAME',
    name: 'YOUR_REPO_NAME',
  },
  pathPrefix: 'content',
}
```

#### GitHub Token 設定：
1. 在 GitHub 創建 Personal Access Token (PAT)
   - Settings → Developer settings → Personal access tokens → Tokens (classic)
   - 權限：`repo` (完整倉庫權限)
2. 在 Cloudflare Pages 環境變數中添加：
   ```
   KEYSTATIC_GITHUB_TOKEN=your_github_token
   ```

### 4. Next.js 配置檢查

#### `next.config.js` 需要確保：
- 輸出格式支援 Cloudflare Pages
- 靜態導出選項（如需要）

**建議配置：**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Cloudflare Pages 可能需要
  output: 'standalone', // 或 'export' 如果使用靜態導出
}

module.exports = nextConfig
```

### 5. 構建配置

#### Cloudflare Pages 構建設定：
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: `/` (根目錄)
- **Node.js version**: `18.x` 或 `20.x`

#### `package.json` 檢查：
確保有 `build` 腳本：
```json
{
  "scripts": {
    "build": "next build",
    "start": "next start"
  }
}
```

### 6. 文件結構檢查

#### 確保以下文件存在：
- ✅ `package.json`
- ✅ `next.config.js`
- ✅ `tailwind.config.ts`
- ✅ `postcss.config.js`
- ✅ `tsconfig.json`
- ✅ `keystatic.config.ts`
- ✅ `middleware.ts`
- ✅ `.gitignore`

### 7. 依賴檢查

#### 確保所有依賴都在 `package.json` 中：
- Next.js 14
- React 18
- Tailwind CSS
- Keystatic
- 其他必要依賴

## 🚀 部署步驟

### 步驟 1: 準備 GitHub Repository
1. 創建 GitHub Repository
2. 推送代碼到 GitHub
3. 確保所有文件都已提交

### 步驟 2: 更新 Keystatic 配置
1. 修改 `keystatic.config.ts` 使用 GitHub storage
2. 提交更改到 GitHub

### 步驟 3: 在 Cloudflare Pages 創建專案
1. 登入 Cloudflare Dashboard
2. 進入 Pages → Create a project
3. 選擇 "Connect to Git"
4. 連接您的 GitHub Repository
5. 選擇 Repository 和 Branch (main)

### 步驟 4: 配置構建設定
- **Framework preset**: Next.js
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: `/`

### 步驟 5: 設定環境變數
在 Cloudflare Pages 專案設定中添加：
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `NODE_ENV=production`
- `KEYSTATIC_GITHUB_TOKEN` (GitHub Personal Access Token)

### 步驟 6: 部署
1. 點擊 "Save and Deploy"
2. 等待構建完成
3. 檢查部署日誌是否有錯誤

### 步驟 7: 自定義域名（可選）
1. 在 Cloudflare Pages 專案設定中
2. 進入 Custom domains
3. 添加您的域名
4. 按照指示更新 DNS 設定

## ⚠️ 注意事項

### 1. Keystatic GitHub Storage
- 必須使用 GitHub storage（不能使用 local storage）
- 需要 GitHub Personal Access Token
- 確保 Token 有 `repo` 權限

### 2. 環境變數安全
- 不要在代碼中硬編碼密碼
- 使用 Cloudflare Pages 的環境變數功能
- 生產環境和預覽環境可以設定不同的變數

### 3. 構建時間
- 首次構建可能需要較長時間
- 確保 Node.js 版本相容
- 檢查構建日誌中的警告和錯誤

### 4. 靜態資源
- 圖片應放在 `public` 資料夾
- 確保路徑正確
- 檢查圖片是否正確載入

### 5. API 路由
- Next.js API 路由在 Cloudflare Pages 上需要特殊配置
- 確保 `/api` 路由正常工作
- 測試登入和認證功能

## 🔍 部署後檢查清單

- [ ] 網站可以正常訪問
- [ ] 所有頁面正常載入
- [ ] 樣式正確顯示
- [ ] 登入功能正常
- [ ] Keystatic 後台可以訪問
- [ ] 文章列表正常顯示
- [ ] 文章詳情頁正常顯示
- [ ] 篩選和排序功能正常
- [ ] 分頁功能正常
- [ ] 圖片正常載入
- [ ] 響應式設計正常
- [ ] 沒有控制台錯誤

## 📝 後續優化建議

1. **性能優化**
   - 啟用 Cloudflare CDN
   - 優化圖片大小
   - 使用 Next.js Image 組件

2. **SEO 優化**
   - 添加 meta tags
   - 設定 sitemap
   - 設定 robots.txt

3. **監控和分析**
   - 添加 Google Analytics
   - 設定錯誤監控
   - 監控網站性能

4. **安全性**
   - 定期更新依賴
   - 使用強密碼
   - 啟用 HTTPS（Cloudflare 自動提供）

## 🔗 相關資源

- [Cloudflare Pages 文檔](https://developers.cloudflare.com/pages/)
- [Next.js 部署文檔](https://nextjs.org/docs/deployment)
- [Keystatic GitHub Storage 文檔](https://keystatic.com/docs/github-storage)

## 📞 問題排查

如果部署遇到問題：

1. **構建失敗**
   - 檢查構建日誌
   - 確認 Node.js 版本
   - 檢查依賴是否完整

2. **環境變數問題**
   - 確認所有變數都已設定
   - 檢查變數名稱是否正確
   - 確認變數值沒有多餘空格

3. **Keystatic 問題**
   - 確認 GitHub Token 有效
   - 檢查 Repository 權限
   - 確認 storage 配置正確

4. **路由問題**
   - 檢查 Next.js 配置
   - 確認動態路由正確
   - 檢查 middleware 配置

