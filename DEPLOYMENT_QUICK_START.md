# 🚀 快速部署指南

## 3 步完成部署

### 步驟 1: 更新 Keystatic 配置 ⚠️ 必須！

編輯 `keystatic.config.ts`：

```typescript
storage: {
  kind: 'github',  // 改為 'github'
  repo: {
    owner: 'YOUR_GITHUB_USERNAME',  // 您的 GitHub 用戶名
    name: 'YOUR_REPO_NAME',         // 您的 Repository 名稱
  },
  pathPrefix: 'content',
},
```

### 步驟 2: 推送到 GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 步驟 3: 在 Cloudflare Pages 部署

1. 登入 Cloudflare Dashboard
2. Pages → Create a project
3. 連接 GitHub Repository
4. 構建設定：
   - Framework: Next.js
   - Build command: `npm run build`
   - Build output: `.next`
5. 環境變數：
   ```
   ADMIN_USERNAME=your_username
   ADMIN_PASSWORD=your_password
   NODE_ENV=production
   KEYSTATIC_GITHUB_TOKEN=ghp_your_token
   ```
6. 點擊 "Save and Deploy"

## ✅ 完成！

部署完成後，訪問您的 Cloudflare Pages URL 即可。

---

**詳細說明請參考：**
- `DEPLOY_NOW.md` - 完整部署指南
- `cloudflare-pages-deployment.md` - 逐步說明

