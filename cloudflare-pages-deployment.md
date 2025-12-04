# Cloudflare Pages 部署指南

## 🎯 部署目標
將 THE BASE 網站部署到 Cloudflare Pages，實現：
- 全球 CDN 加速
- 自動 HTTPS
- 免費託管
- GitHub 自動部署

## 📋 部署前準備

### 1. GitHub Repository 準備

#### 1.1 初始化 Git（如果還沒有）
```bash
cd "/Users/calvinyau/Documents/the base"
git init
git add .
git commit -m "Initial commit: THE BASE website"
```

#### 1.2 創建 GitHub Repository
1. 登入 GitHub
2. 點擊右上角 "+" → "New repository"
3. Repository name: `the-base` (或您喜歡的名稱)
4. 設為 Private（建議）或 Public
5. 不要初始化 README、.gitignore 或 license（我們已有）
6. 點擊 "Create repository"

#### 1.3 推送代碼到 GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/the-base.git
git branch -M main
git push -u origin main
```

### 2. GitHub Personal Access Token

#### 2.1 創建 Token
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 點擊 "Generate new token (classic)"
3. Note: `Keystatic CMS for THE BASE`
4. Expiration: 選擇合適的期限（建議 90 天或無期限）
5. 勾選權限：
   - ✅ `repo` (完整倉庫權限)
   - ✅ `workflow` (如果需要 GitHub Actions)
6. 點擊 "Generate token"
7. **重要：複製 Token 並保存（只顯示一次）**

### 3. 更新 Keystatic 配置

#### 3.1 修改 `keystatic.config.ts`
將 storage 從 `local` 改為 `github`：

```typescript
export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'YOUR_GITHUB_USERNAME',  // 替換為您的 GitHub 用戶名
      name: 'YOUR_REPO_NAME',          // 替換為您的 Repository 名稱
    },
    pathPrefix: 'content',
  },
  // ... 其他配置保持不變
})
```

#### 3.2 提交更改
```bash
git add keystatic.config.ts
git commit -m "Update Keystatic config for GitHub storage"
git push
```

### 4. 環境變數準備

準備以下環境變數（稍後在 Cloudflare Pages 中設定）：

| 變數名稱 | 說明 | 範例值 |
|---------|------|--------|
| `ADMIN_USERNAME` | 管理員用戶名 | `admin` |
| `ADMIN_PASSWORD` | 管理員密碼 | `your_secure_password` |
| `NODE_ENV` | 環境模式 | `production` |
| `KEYSTATIC_GITHUB_TOKEN` | GitHub Token | `ghp_xxxxxxxxxxxx` |

## 🚀 Cloudflare Pages 部署步驟

### 步驟 1: 創建 Cloudflare Pages 專案

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 左側選單選擇 **Pages**
3. 點擊 **"Create a project"**
4. 選擇 **"Connect to Git"**
5. 授權 Cloudflare 訪問您的 GitHub
6. 選擇 Repository: `the-base` (或您的 Repository 名稱)
7. 點擊 **"Begin setup"**

### 步驟 2: 配置構建設定

在構建設定頁面：

- **Project name**: `the-base` (或您喜歡的名稱)
- **Production branch**: `main`
- **Framework preset**: **Next.js**
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: `/` (留空)

### 步驟 3: 設定環境變數

在構建設定頁面，展開 **"Environment variables"**：

#### Production 環境變數：
點擊 **"Add variable"** 添加：

1. **ADMIN_USERNAME**
   - Variable name: `ADMIN_USERNAME`
   - Value: 您的管理員用戶名（例如：`admin`）

2. **ADMIN_PASSWORD**
   - Variable name: `ADMIN_PASSWORD`
   - Value: 您的安全密碼（建議使用強密碼）

3. **NODE_ENV**
   - Variable name: `NODE_ENV`
   - Value: `production`

4. **KEYSTATIC_GITHUB_TOKEN**
   - Variable name: `KEYSTATIC_GITHUB_TOKEN`
   - Value: 您的 GitHub Personal Access Token

#### Preview 環境變數（可選）：
可以為預覽環境設定不同的變數，或使用相同的變數。

### 步驟 4: 部署

1. 點擊 **"Save and Deploy"**
2. 等待構建完成（首次構建可能需要 5-10 分鐘）
3. 構建完成後，您會獲得一個 Cloudflare Pages URL：
   - 格式：`https://the-base.pages.dev` 或類似

### 步驟 5: 檢查部署

1. 訪問部署的 URL
2. 檢查網站是否正常載入
3. 測試登入功能
4. 測試 Keystatic 後台訪問

## 🔧 部署後配置

### 1. 自定義域名（可選）

1. 在 Cloudflare Pages 專案中
2. 進入 **Settings** → **Custom domains**
3. 點擊 **"Set up a custom domain"**
4. 輸入您的域名（例如：`actyourplan.com`）
5. 按照指示更新 DNS 記錄：
   - 添加 CNAME 記錄指向 Cloudflare Pages URL
   - 或使用 Cloudflare 的 DNS（如果域名在 Cloudflare）

### 2. 更新 Next.js 配置（如需要）

如果遇到構建問題，可能需要更新 `next.config.js`：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Cloudflare Pages 配置
  output: 'standalone', // 或根據需要調整
}

module.exports = nextConfig
```

### 3. 檢查構建日誌

如果部署失敗：
1. 進入 Cloudflare Pages 專案
2. 點擊 **"Deployments"**
3. 查看失敗的部署日誌
4. 根據錯誤訊息進行修復

## ⚠️ 重要注意事項

### 1. Keystatic GitHub Storage
- ✅ **必須**使用 GitHub storage（不能使用 local storage）
- ✅ **必須**提供有效的 GitHub Token
- ✅ Token 需要有 `repo` 權限
- ⚠️ Token 過期後需要更新環境變數

### 2. 環境變數安全
- ✅ 不要在代碼中硬編碼密碼
- ✅ 使用強密碼作為 `ADMIN_PASSWORD`
- ✅ 定期更新 GitHub Token
- ⚠️ 不要在公開的 Repository 中提交 `.env` 文件

### 3. 構建配置
- ✅ 確保 Node.js 版本相容（Cloudflare Pages 支援 18.x 和 20.x）
- ✅ 檢查 `package.json` 中的依賴版本
- ✅ 確保所有依賴都在 `dependencies` 或 `devDependencies` 中

### 4. 內容管理
- ⚠️ 部署後，所有內容變更會直接寫入 GitHub Repository
- ⚠️ 確保 GitHub Repository 有適當的備份
- ✅ 建議定期備份 `content` 資料夾

## 🔍 部署後檢查清單

### 功能檢查
- [ ] 首頁正常載入
- [ ] 所有導航連結正常
- [ ] BLUEPRINTS 頁面正常
- [ ] ARMORY 頁面正常
- [ ] SIGNALS 頁面正常
- [ ] EXPERIMENTS 頁面正常
- [ ] 篩選功能正常
- [ ] 排序功能正常
- [ ] 分頁功能正常
- [ ] 文章詳情頁正常
- [ ] 登入功能正常
- [ ] Keystatic 後台可以訪問
- [ ] 在後台可以編輯內容
- [ ] 圖片正常載入

### 性能檢查
- [ ] 頁面載入速度正常
- [ ] 沒有控制台錯誤
- [ ] 響應式設計正常（手機、平板、桌面）
- [ ] 所有樣式正確顯示

### 安全檢查
- [ ] HTTPS 正常（Cloudflare 自動提供）
- [ ] 登入保護正常
- [ ] 環境變數正確設定

## 📝 後續維護

### 1. 內容更新
- 通過 Keystatic 後台更新內容
- 變更會自動提交到 GitHub
- Cloudflare Pages 會自動重新部署

### 2. 代碼更新
```bash
# 本地修改後
git add .
git commit -m "Update: description"
git push origin main
# Cloudflare Pages 會自動觸發新部署
```

### 3. 環境變數更新
- 在 Cloudflare Pages 專案設定中更新
- 更新後需要重新部署

### 4. 監控
- 定期檢查 Cloudflare Pages 部署狀態
- 監控網站訪問情況
- 檢查錯誤日誌

## 🆘 常見問題

### Q1: 構建失敗怎麼辦？
**A:** 
1. 檢查構建日誌中的錯誤訊息
2. 確認 Node.js 版本相容
3. 檢查依賴是否完整
4. 確認環境變數是否正確設定

### Q2: Keystatic 後台無法訪問？
**A:**
1. 確認 `KEYSTATIC_GITHUB_TOKEN` 環境變數已設定
2. 確認 Token 有效且有 `repo` 權限
3. 確認 `keystatic.config.ts` 中的 GitHub 配置正確
4. 檢查 Repository 名稱和 Owner 是否正確

### Q3: 登入功能不工作？
**A:**
1. 確認 `ADMIN_USERNAME` 和 `ADMIN_PASSWORD` 環境變數已設定
2. 確認 `NODE_ENV=production`
3. 檢查 cookies 是否正常設置
4. 查看瀏覽器控制台是否有錯誤

### Q4: 樣式沒有正確載入？
**A:**
1. 確認 Tailwind CSS 配置正確
2. 檢查構建日誌中是否有 CSS 相關錯誤
3. 確認 `postcss.config.js` 存在
4. 清除瀏覽器快取

## 📚 參考資源

- [Cloudflare Pages 文檔](https://developers.cloudflare.com/pages/)
- [Next.js 部署到 Cloudflare Pages](https://nextjs.org/docs/deployment#cloudflare-pages)
- [Keystatic GitHub Storage](https://keystatic.com/docs/github-storage)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

## ✅ 部署檢查表

### 部署前
- [ ] GitHub Repository 已創建
- [ ] 代碼已推送到 GitHub
- [ ] GitHub Personal Access Token 已創建
- [ ] `keystatic.config.ts` 已更新為 GitHub storage
- [ ] 環境變數列表已準備

### 部署中
- [ ] Cloudflare Pages 專案已創建
- [ ] GitHub Repository 已連接
- [ ] 構建設定已配置
- [ ] 環境變數已設定
- [ ] 首次部署已完成

### 部署後
- [ ] 網站可以正常訪問
- [ ] 所有功能正常
- [ ] 登入功能正常
- [ ] Keystatic 後台可以訪問
- [ ] 自定義域名已設定（如需要）

---

**準備就緒後，按照以上步驟執行部署！**

