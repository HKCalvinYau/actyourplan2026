# 🚀 Cloudflare Pages 部署檢查清單

## 📝 部署前必須完成的項目

### ✅ 階段 1: 代碼準備

- [ ] **Git 初始化**
  - [ ] 確認項目已初始化 Git
  - [ ] 確認 `.gitignore` 文件存在且正確
  - [ ] 確認所有代碼已提交到本地 Git

- [ ] **GitHub Repository**
  - [ ] 在 GitHub 創建新的 Repository
  - [ ] Repository 名稱：`_________________`
  - [ ] GitHub 用戶名：`_________________`
  - [ ] 將本地代碼推送到 GitHub
  - [ ] 確認所有文件都已上傳

### ✅ 階段 2: Keystatic 配置

- [ ] **更新 `keystatic.config.ts`**
  - [ ] 將 `storage.kind` 從 `'local'` 改為 `'github'`
  - [ ] 填入 GitHub Repository owner
  - [ ] 填入 GitHub Repository name
  - [ ] 確認 `pathPrefix: 'content'`
  - [ ] 提交更改到 GitHub

- [ ] **GitHub Token**
  - [ ] 創建 GitHub Personal Access Token
  - [ ] Token 權限：`repo` (完整倉庫權限)
  - [ ] 保存 Token（稍後在 Cloudflare 中使用）

### ✅ 階段 3: 環境變數準備

準備以下環境變數值：

- [ ] **ADMIN_USERNAME**
  - 值：`_________________`

- [ ] **ADMIN_PASSWORD**
  - 值：`_________________`（使用強密碼）

- [ ] **NODE_ENV**
  - 值：`production`

- [ ] **KEYSTATIC_GITHUB_TOKEN**
  - 值：`ghp__________________`（您的 GitHub Token）

### ✅ 階段 4: Cloudflare Pages 設定

- [ ] **創建專案**
  - [ ] 登入 Cloudflare Dashboard
  - [ ] 進入 Pages → Create a project
  - [ ] 連接 GitHub Repository

- [ ] **構建設定**
  - [ ] Framework preset: Next.js
  - [ ] Build command: `npm run build`
  - [ ] Build output directory: `.next`
  - [ ] Root directory: `/` (留空)

- [ ] **環境變數**
  - [ ] 添加 `ADMIN_USERNAME`
  - [ ] 添加 `ADMIN_PASSWORD`
  - [ ] 添加 `NODE_ENV=production`
  - [ ] 添加 `KEYSTATIC_GITHUB_TOKEN`

- [ ] **部署**
  - [ ] 點擊 "Save and Deploy"
  - [ ] 等待構建完成
  - [ ] 記錄部署 URL：`_________________`

### ✅ 階段 5: 部署後檢查

- [ ] **基本功能**
  - [ ] 首頁正常載入
  - [ ] 導航連結正常
  - [ ] 所有頁面可以訪問

- [ ] **內容功能**
  - [ ] 文章列表正常顯示
  - [ ] 文章詳情頁正常
  - [ ] 篩選功能正常
  - [ ] 排序功能正常
  - [ ] 分頁功能正常

- [ ] **認證功能**
  - [ ] 登入頁面正常
  - [ ] 可以成功登入
  - [ ] 登出功能正常
  - [ ] Keystatic 後台可以訪問

- [ ] **內容管理**
  - [ ] 可以在 Keystatic 後台編輯內容
  - [ ] 內容變更會保存到 GitHub
  - [ ] 變更後網站自動更新

### ✅ 階段 6: 自定義域名（可選）

- [ ] **域名設定**
  - [ ] 在 Cloudflare Pages 添加自定義域名
  - [ ] 更新 DNS 記錄
  - [ ] 等待 DNS 傳播
  - [ ] 測試自定義域名訪問

## 📋 需要修改的文件清單

### 必須修改：
1. **`keystatic.config.ts`**
   - 將 storage 從 `local` 改為 `github`
   - 填入 GitHub Repository 資訊

### 可選修改：
2. **`next.config.js`**
   - 根據需要調整輸出格式
   - 添加 Cloudflare 特定配置（如需要）

## 🔑 需要準備的資訊

### GitHub 資訊：
- GitHub 用戶名：`_________________`
- Repository 名稱：`_________________`
- Repository URL：`https://github.com/_________________/_________________`

### Cloudflare 資訊：
- Cloudflare 帳號：`_________________`
- Pages 專案名稱：`_________________`
- 部署 URL：`https://_________________.pages.dev`

### 環境變數：
- ADMIN_USERNAME：`_________________`
- ADMIN_PASSWORD：`_________________`
- KEYSTATIC_GITHUB_TOKEN：`ghp__________________`

## ⚠️ 重要提醒

1. **不要提交敏感資訊**
   - 不要將 `.env` 文件提交到 Git
   - 不要在代碼中硬編碼密碼
   - 使用環境變數管理敏感資訊

2. **GitHub Token 安全**
   - Token 只顯示一次，請妥善保存
   - 如果遺失，需要重新創建
   - 定期更新 Token

3. **備份重要**
   - 定期備份 `content` 資料夾
   - 確保 GitHub Repository 有適當的備份策略

4. **測試環境**
   - 建議先在預覽環境測試
   - 確認無誤後再部署到生產環境

## 📞 遇到問題時

1. 檢查構建日誌
2. 確認環境變數是否正確
3. 檢查 GitHub Token 是否有效
4. 確認 Keystatic 配置是否正確
5. 查看 Cloudflare Pages 文檔

---

**完成所有檢查項目後，即可開始部署！**

