# 🚀 立即部署指南

## ⚠️ 部署前最後檢查

### 必須完成的步驟

#### 1. 更新 Keystatic 配置 ⚠️ 重要！

**必須修改 `keystatic.config.ts`：**

```typescript
export default config({
  storage: {
    kind: 'github',  // 從 'local' 改為 'github'
    repo: {
      owner: 'YOUR_GITHUB_USERNAME',  // 替換為您的 GitHub 用戶名
      name: 'YOUR_REPO_NAME',        // 替換為您的 Repository 名稱
    },
    pathPrefix: 'content',
  },
  // ... 其他配置保持不變
})
```

**⚠️ 重要：** 如果不修改這個配置，Keystatic 後台將無法在生產環境工作！

#### 2. GitHub Repository 準備

```bash
# 1. 初始化 Git（如果還沒有）
cd "/Users/calvinyau/Documents/the base"
git init
git add .
git commit -m "Ready for deployment: THE BASE website"

# 2. 在 GitHub 創建 Repository，然後：
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

#### 3. 創建 GitHub Personal Access Token

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. 權限：✅ `repo` (完整倉庫權限)
4. **保存 Token**（只顯示一次！）

#### 4. Cloudflare Pages 部署

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Pages → Create a project → Connect to Git
3. 選擇您的 GitHub Repository
4. 構建設定：
   - Framework preset: **Next.js**
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Root directory: `/` (留空)

#### 5. 設定環境變數

在 Cloudflare Pages 專案設定 → Environment variables 中添加：

```
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
NODE_ENV=production
KEYSTATIC_GITHUB_TOKEN=ghp_your_github_token_here
```

**可選環境變數（性能優化）：**
```
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 圖片 CDN（如果使用）
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID=your_account_id
NEXT_PUBLIC_CLOUDFLARE_IMAGES_HASH=your_images_hash
# 或
NEXT_PUBLIC_CDN_URL=https://cdn.example.com

# Service Worker（開發環境啟用）
NEXT_PUBLIC_ENABLE_SW=true
```

#### 6. 部署

點擊 "Save and Deploy"，等待構建完成！

## ✅ 部署後檢查

### 基本功能
- [ ] 網站可以正常訪問
- [ ] 首頁正常載入
- [ ] 所有導航連結正常

### 內容功能
- [ ] 文章列表正常顯示
- [ ] 文章詳情頁正常
- [ ] 篩選和排序功能正常
- [ ] 分頁功能正常

### 多語言
- [ ] `/zh-CN` 正常
- [ ] `/en` 正常
- [ ] `/ja` 正常
- [ ] 語言切換正常

### 認證功能
- [ ] 登入頁面正常
- [ ] 可以成功登入
- [ ] Keystatic 後台可以訪問 (`/keystatic`)
- [ ] 可以在後台編輯內容

### SEO
- [ ] `/sitemap.xml` 可訪問
- [ ] `/robots.txt` 可訪問

### 性能
- [ ] 圖片正常載入
- [ ] 頁面載入速度正常
- [ ] 沒有控制台錯誤

## 🔧 快速命令參考

### Git 操作
```bash
# 檢查 Git 狀態
git status

# 添加所有文件
git add .

# 提交更改
git commit -m "Your commit message"

# 推送到 GitHub
git push origin main
```

### 本地測試構建
```bash
# 測試生產構建
npm run build

# 啟動生產服務器（測試）
npm start
```

## 📝 部署檢查清單

### 代碼準備
- [x] 所有功能已完成
- [x] 多語言系統已實作
- [x] SEO 優化已完成
- [x] 性能優化已完成
- [x] `.gitignore` 已配置
- [ ] **Keystatic 配置已更新為 GitHub storage** ⚠️

### GitHub 準備
- [ ] Repository 已創建
- [ ] 代碼已推送到 GitHub
- [ ] GitHub Token 已創建

### Cloudflare 準備
- [ ] Pages 專案已創建
- [ ] 環境變數已設定
- [ ] 構建設定已配置

## 🆘 常見問題

### Q: 構建失敗怎麼辦？
**A:** 
1. 檢查構建日誌中的錯誤
2. 確認 Node.js 版本（Cloudflare 支援 18.x 和 20.x）
3. 檢查環境變數是否正確設定

### Q: Keystatic 後台無法訪問？
**A:**
1. 確認 `keystatic.config.ts` 已更新為 `github` storage
2. 確認 `KEYSTATIC_GITHUB_TOKEN` 環境變數已設定
3. 確認 Token 有效且有 `repo` 權限

### Q: 圖片無法載入？
**A:**
1. 確認圖片路徑正確
2. 檢查 `next.config.js` 中的圖片配置
3. 如果使用 CDN，確認 CDN URL 正確

### Q: 多語言路由 404？
**A:**
1. 確認 `app/[locale]` 資料夾結構正確
2. 檢查 middleware 配置
3. 確認 `generateStaticParams` 函數正確

## 📚 相關文檔

- `cloudflare-pages-deployment.md` - 詳細部署指南
- `DEPLOYMENT_CHECKLIST.md` - 完整檢查清單
- `DEPLOYMENT_PLAN.md` - 部署計劃

---

## 🎯 開始部署！

**記住：最重要的步驟是更新 `keystatic.config.ts`！**

完成後，按照上述步驟執行部署即可。

祝部署順利！🚀

