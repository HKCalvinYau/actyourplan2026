# Keystatic GitHub OAuth 設置指南

Keystatic 使用 GitHub storage 時，需要配置 GitHub OAuth 才能正常使用。

## 步驟 1: 在 GitHub 上創建 OAuth App

1. 前往 GitHub Settings → Developer settings → OAuth Apps
   - 網址：https://github.com/settings/developers

2. 點擊 "New OAuth App"

3. 填寫以下信息：
   - **Application name**: `ACT YOUR PLAN - Keystatic CMS`
   - **Homepage URL**: `https://actyourplan2026.pages.dev`
   - **Authorization callback URL**: `https://actyourplan2026.pages.dev/api/keystatic/github/callback`

4. 點擊 "Register application"

5. 記錄下 **Client ID** 和 **Client secret**

## 步驟 2: 在 Cloudflare Pages 設置 Secrets（環境變數）

由於 Cloudflare Pages 使用 `wrangler.toml` 管理環境變數，您需要使用 **Secrets**（加密變數）來存儲敏感信息。

### 方法 1: 使用 Cloudflare Dashboard（推薦）

1. 前往 Cloudflare Dashboard → Pages → 您的專案

2. 進入 "Settings" → "Environment variables"

3. 點擊 "Add variable" → 選擇 "Secret"

4. 添加以下 Secrets：

   - **變數名稱**: `KEYSTATIC_GITHUB_CLIENT_ID`
   - **值**: 您的 GitHub OAuth App Client ID
   - **類型**: Secret

   - **變數名稱**: `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - **值**: 您的 GitHub OAuth App Client Secret
   - **類型**: Secret

   - **變數名稱**: `KEYSTATIC_SECRET`
   - **值**: 一個隨機的加密字符串（用於加密會話數據）
   - **類型**: Secret
   - **生成方式**: 可以使用以下命令生成一個隨機的 64 字符字符串：
     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```
   - **示例值**: `2f4b1bff9ae498b737d919e46e72f632ef429944103671607f0f9e96ed5fbaf1`（請使用您自己生成的值）

5. 確保這些 Secrets 在 **Production** 環境中設置

6. 點擊 "Save"

### 方法 2: 使用 Wrangler CLI（可選）

如果您想使用命令行設置：

```bash
# 安裝 Wrangler CLI（如果還沒有）
npm install -g wrangler

# 登入 Cloudflare
wrangler login

# 設置 Secrets
wrangler secret put KEYSTATIC_GITHUB_CLIENT_ID
wrangler secret put KEYSTATIC_GITHUB_CLIENT_SECRET
wrangler secret put KEYSTATIC_SECRET
```

**生成 KEYSTATIC_SECRET**：
```bash
# 生成一個隨機的 64 字符字符串
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# 然後將生成的字符串設置為 KEYSTATIC_SECRET
```

**注意**: Secrets 是加密存儲的，不會顯示在 Dashboard 中，只能通過 API 或 CLI 設置。

## 步驟 3: 重新部署

設置環境變數後，需要重新部署：

1. 在 Cloudflare Pages 中，點擊 "Retry deployment" 或推送新的 commit
2. 等待部署完成

## 步驟 4: 測試

1. 訪問 `/login` 頁面，使用您的用戶名和密碼登入
2. 登入成功後，訪問 `/keystatic`
3. 第一次訪問時，Keystatic 會要求您授權 GitHub 訪問
4. 點擊 "Authorize" 授權後，即可使用 Keystatic CMS

## 注意事項

- GitHub OAuth App 的 Callback URL 必須完全匹配：`https://actyourplan2026.pages.dev/api/keystatic/github/callback`
- 如果使用自定義域名，請更新 Callback URL
- Client Secret 是敏感信息，請妥善保管，不要提交到 Git

## 故障排除

如果仍然無法訪問：

1. 檢查環境變數是否正確設置
2. 檢查 GitHub OAuth App 的 Callback URL 是否正確
3. 檢查 Cloudflare Pages 的部署日誌
4. 清除瀏覽器緩存和 cookies，然後重新登入

