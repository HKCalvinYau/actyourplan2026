# 📖 完全不懂也能完成的部署指南

## 🎯 這份指南適合誰？

- 完全不懂程式碼的人
- 第一次部署網站的人
- 想要一步步跟著做的人

**別擔心，我會用最簡單的方式告訴您每一步該做什麼！**

---

## 📋 部署前準備（5 分鐘）

### 您需要準備的東西：

1. ✅ **GitHub 帳號**（如果沒有，去 https://github.com 註冊一個，免費）
2. ✅ **Cloudflare 帳號**（如果沒有，去 https://dash.cloudflare.com 註冊一個，免費）
3. ✅ **一個好記的管理員密碼**（用來登入網站後台）

---

## 🚀 開始部署（總共約 30 分鐘）

### 第一步：準備 GitHub（約 10 分鐘）

#### 1.1 創建 GitHub Repository

1. 打開瀏覽器，前往：https://github.com
2. 登入您的 GitHub 帳號（如果沒有，先註冊）
3. 點擊右上角的 **"+"** 按鈕
4. 選擇 **"New repository"**
5. 填寫以下資訊：
   - **Repository name**: `the-base`（或您喜歡的名稱）
   - **Description**: `THE BASE website`（可選）
   - **選擇**: ⚪ **Private**（建議，只有您能看到）
   - **不要勾選** ❌ Add a README file
   - **不要勾選** ❌ Add .gitignore
   - **不要勾選** ❌ Choose a license
6. 點擊綠色的 **"Create repository"** 按鈕
7. **重要：** 記下您的 Repository 名稱和 GitHub 用戶名！

#### 1.2 創建 GitHub Token（用於後台編輯功能）

1. 在 GitHub 頁面，點擊右上角您的頭像
2. 選擇 **"Settings"**
3. 左側選單，滾動到底部，點擊 **"Developer settings"**
4. 點擊 **"Personal access tokens"**
5. 點擊 **"Tokens (classic)"**
6. 點擊 **"Generate new token"** → **"Generate new token (classic)"**
7. 填寫：
   - **Note**: `THE BASE Keystatic`（隨便寫，只是備註）
   - **Expiration**: 選擇 **"No expiration"**（或選擇 90 天）
   - **勾選權限**: ✅ **repo**（在 repo 區塊下，勾選整個 repo）
8. 滾動到底部，點擊 **"Generate token"** 綠色按鈕
9. **⚠️ 非常重要：** 複製這個 Token（只會顯示一次！）
   - 看起來像：`ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **請保存到安全的地方！**（例如：記事本、密碼管理器）

---

### 第二步：準備代碼（約 5 分鐘）

#### 2.1 更新 Keystatic 配置

**我需要知道您的資訊才能幫您修改：**

請告訴我：
1. 您的 **GitHub 用戶名**（例如：`calvinyau`）
2. 您的 **Repository 名稱**（例如：`the-base`）

**或者，您可以自己修改：**

1. 打開文件：`keystatic.config.ts`
2. 找到第 4-6 行：
   ```typescript
   storage: {
     kind: 'local',
   },
   ```
3. 改成：
   ```typescript
   storage: {
     kind: 'github',
     repo: {
       owner: 'YOUR_GITHUB_USERNAME',  // 改成您的 GitHub 用戶名
       name: 'YOUR_REPO_NAME',        // 改成您的 Repository 名稱
     },
     pathPrefix: 'content',
   },
   ```
4. 刪除或註釋掉第 7-15 行的註釋（那些 `// 如果部署到...` 的部分）

#### 2.2 檢查 Git 狀態

我會幫您檢查，但您也可以自己檢查：

打開終端機（Terminal），執行：
```bash
cd "/Users/calvinyau/Documents/the base"
git status
```

如果顯示 "not a git repository"，執行：
```bash
git init
git add .
git commit -m "Initial commit: Ready for deployment"
```

---

### 第三步：推送到 GitHub（約 5 分鐘）

#### 3.1 連接 GitHub Repository

在終端機執行（替換成您的資訊）：

```bash
cd "/Users/calvinyau/Documents/the base"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

例如，如果您的用戶名是 `calvinyau`，Repository 是 `the-base`：
```bash
git remote add origin https://github.com/calvinyau/the-base.git
```

#### 3.2 推送代碼

```bash
git branch -M main
git push -u origin main
```

**如果要求輸入帳號密碼：**
- 用戶名：您的 GitHub 用戶名
- 密碼：使用剛才創建的 Token（不是 GitHub 密碼！）

---

### 第四步：在 Cloudflare Pages 部署（約 10 分鐘）

#### 4.1 創建 Cloudflare Pages 專案

1. 打開瀏覽器，前往：https://dash.cloudflare.com
2. 登入您的 Cloudflare 帳號（如果沒有，先註冊，免費）
3. 左側選單，點擊 **"Pages"**
4. 點擊 **"Create a project"** 按鈕
5. 點擊 **"Connect to Git"**
6. 選擇 **"GitHub"**（如果第一次使用，需要授權 Cloudflare 訪問 GitHub）
7. 選擇您剛才創建的 Repository（例如：`the-base`）
8. 點擊 **"Begin setup"**

#### 4.2 配置構建設定

在構建設定頁面：

1. **Project name**: `the-base`（或您喜歡的名稱）
2. **Production branch**: `main`（保持預設）
3. **Framework preset**: 選擇 **"Next.js"**（會自動填充）
4. **Build command**: `npm run build`（應該已經自動填充）
5. **Build output directory**: `.next`（應該已經自動填充）
6. **Root directory**: 留空（不要填任何東西）

#### 4.3 設定環境變數

在構建設定頁面，找到 **"Environment variables"** 區塊，點擊展開。

點擊 **"Add variable"** 按鈕，添加以下 4 個變數：

**變數 1:**
- Variable name: `ADMIN_USERNAME`
- Value: `admin`（或您想要的管理員用戶名）
- Environment: 選擇 **"Production"**

**變數 2:**
- Variable name: `ADMIN_PASSWORD`
- Value: `您的安全密碼`（請使用強密碼，例如：`MySecurePass123!`）
- Environment: 選擇 **"Production"**

**變數 3:**
- Variable name: `NODE_ENV`
- Value: `production`
- Environment: 選擇 **"Production"**

**變數 4:**
- Variable name: `KEYSTATIC_GITHUB_TOKEN`
- Value: `ghp_您的GitHubToken`（貼上剛才保存的 Token）
- Environment: 選擇 **"Production"**

#### 4.4 開始部署

1. 確認所有設定都正確
2. 點擊 **"Save and Deploy"** 按鈕
3. 等待構建完成（約 5-10 分鐘）
4. 構建完成後，您會看到一個 URL，例如：`https://the-base.pages.dev`

---

### 第五步：測試部署（約 5 分鐘）

#### 5.1 基本測試

1. 訪問您的部署 URL（例如：`https://the-base.pages.dev`）
2. 檢查首頁是否正常顯示
3. 點擊導航選單，測試各個頁面
4. 測試語言切換功能

#### 5.2 測試登入功能

1. 訪問：`https://您的URL.pages.dev/login`
2. 使用您設定的 `ADMIN_USERNAME` 和 `ADMIN_PASSWORD` 登入
3. 登入成功後，應該能看到 "ID: admin" 或類似的顯示

#### 5.3 測試後台編輯

1. 登入後，點擊 **"ACCESS"** 按鈕
2. 應該會進入 Keystatic 後台（`/keystatic`）
3. 嘗試編輯一篇文章，保存
4. 檢查更改是否反映在網站上

---

## ✅ 部署完成檢查清單

- [ ] GitHub Repository 已創建
- [ ] GitHub Token 已創建並保存
- [ ] `keystatic.config.ts` 已更新為 GitHub storage
- [ ] 代碼已推送到 GitHub
- [ ] Cloudflare Pages 專案已創建
- [ ] 環境變數已設定（4 個）
- [ ] 構建已成功完成
- [ ] 網站可以正常訪問
- [ ] 登入功能正常
- [ ] 後台編輯功能正常

---

## 🆘 遇到問題？

### 問題 1: Git 推送失敗

**錯誤訊息**: `remote: Support for password authentication was removed`

**解決方法**: 
- 使用 GitHub Token 作為密碼（不是 GitHub 帳號密碼）
- 或者使用 SSH 方式連接

### 問題 2: 構建失敗

**解決方法**:
1. 點擊構建日誌，查看錯誤訊息
2. 檢查環境變數是否正確設定
3. 確認 `keystatic.config.ts` 已更新

### 問題 3: 後台無法訪問

**解決方法**:
1. 確認 `KEYSTATIC_GITHUB_TOKEN` 環境變數已設定
2. 確認 Token 有效且有 `repo` 權限
3. 確認 `keystatic.config.ts` 中的 GitHub 資訊正確

### 問題 4: 登入失敗

**解決方法**:
1. 確認 `ADMIN_USERNAME` 和 `ADMIN_PASSWORD` 環境變數已設定
2. 確認變數名稱拼寫正確（大小寫敏感）
3. 重新部署一次

---

## 📞 需要幫助？

如果遇到任何問題，請：
1. 查看錯誤訊息
2. 檢查構建日誌
3. 確認所有步驟都已完成
4. 參考 `DEPLOY_NOW.md` 獲取更多詳細資訊

---

## 🎉 完成！

部署完成後，您的網站就可以在網路上訪問了！

**記住：**
- 保存好您的 GitHub Token
- 記住您的管理員密碼
- 保存您的 Cloudflare Pages URL

祝您部署順利！🚀

