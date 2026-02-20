# 部署到 Cloudflare（含 D1 資料庫）

本文件說明如何將 THE BASE 部署到 **Cloudflare Pages**，並把文章資料庫放到 **Cloudflare D1**。

---

## 前置需求

- 已安裝 [Node.js](https://nodejs.org/)（建議 v18+）
- [Cloudflare 帳號](https://dash.cloudflare.com/sign-up)
- 專案已可本地運行（`npm run dev` 正常）

---

## 一、安裝並登入 Wrangler

```bash
npm install
npx wrangler login
```

瀏覽器會開啟，完成 Cloudflare 登入授權。

---

## 二、建立並設定 D1 資料庫

### 2.1 建立 D1 資料庫（若尚未建立）

若你**還沒有**在 Cloudflare 建立過 `the-base-db`，請執行：

```bash
npx wrangler d1 create the-base-db
```

終端會輸出類似：

```text
✅ Successfully created DB 'the-base-db'
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

把上面的 `database_id` 複製下來，貼到專案根目錄的 **`wrangler.toml`** 裡，取代現有的 `database_id`：

```toml
[[d1_databases]]
binding = "DB"
database_name = "the-base-db"
database_id = "這裡貼上你的 database_id"
```

若你**已經**有 D1 資料庫且 `wrangler.toml` 的 `database_id` 正確，可跳過此步。

### 2.2 建立 `posts` 資料表（Migration）

在專案根目錄執行（會對 **遠端** D1 執行 SQL）：

```bash
npx wrangler d1 execute the-base-db --remote --file=./migrations/0000_init_posts.sql
```

成功後會看到 `Successfully executed`。  
之後文章會存在 D1 的 `posts` 表；可到 [Cloudflare Dashboard → D1](https://dash.cloudflare.com/?to=/:account/d1) 檢查該資料庫與表。

### 2.3（可選）本地用 D1 測試

若要本地開發時連到 **遠端** D1（慎用，會改到正式資料）：

```bash
npx wrangler pages dev dist --d1=DB=the-base-db
```

一般開發用 Mock 即可，不需此步驟。

---

## 三、建置專案

```bash
npm run build
```

產出會在 **`dist/`**，供下一步部署使用。

---

## 四、部署到 Cloudflare Pages

### 方式 A：指令部署（建議先用手動試一次）

在專案根目錄執行：

```bash
npx wrangler pages deploy dist --project-name=actyourplan2026
```

- 若專案 **尚未建立**，Wrangler 會問你是否要建立，選 **Y**。
- `--project-name=actyourplan2026` 可改成你要的專案名稱；需與 `wrangler.toml` 裡 `name` 或你之後在 Dashboard 設定的名稱一致較好管理。

部署完成後會給一個網址，例如：

```text
https://actyourplan2026.pages.dev
```

### 方式 B：用 Git 連動（GitHub 等）

1. 到 [Cloudflare Dashboard → Workers & Pages](https://dash.cloudflare.com/?to=/:account/pages) → **Create application** → **Pages** → **Connect to Git**。
2. 選你的 repo，設定 **Build**：
   - **Framework preset**: Astro（或 None）
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
3. 在該 Pages 專案的 **Settings → Environment variables** 加上下面環境變數（建議 Production 與 Preview 都設）。

---

## 五、設定環境變數（Production）

在 **Cloudflare Dashboard** 裡：

1. 進入 **Workers & Pages** → 你的專案（例如 `actyourplan2026`）。
2. **Settings** → **Environment variables**。
3. 新增：

| 變數名稱         | 值        | 說明           |
|------------------|-----------|----------------|
| `ADMIN_PASSWORD` | （自訂）  | 後台登入密碼   |
| `NODE_VERSION`   | `20` 或 `22` | 建議設，避免 Node 版本不符 |

**重要**：`ADMIN_PASSWORD` 請設成強密碼，不要用預設 `admin123`。

---

## 六、綁定 D1 到 Pages 專案

不論用指令部署或 Git 部署，都建議在 Dashboard 確認 D1 已綁定，網站才讀得到 `DB`。

### 如何確認 D1 已綁到 Pages（逐步操作）

你現在在 **網域總覽**（actyourplan.com）左側看到「D1 SQL database」→「the-base-db」只代表 **帳號裡有這個 D1**，不代表已綁到某個 Pages 專案。要確認「綁到 Pages」請這樣做：

1. **離開網域頁，進入 Pages 專案**
   - 左側選 **Workers & Pages**（或點頂部 Cloudflare logo 回帳號首頁）。
   - 再點 **Workers & Pages** 底下的 **Pages**，會看到 Pages 專案列表。
   - 點進你的專案名稱，例如 **actyourplan2026**（不是點 actyourplan.com）。

2. **在該 Pages 專案裡找綁定**
   - 在專案頁左側或上方選 **Settings**。
   - 左側或內頁找到 **Functions**（或 **Settings** → **Functions**）。
   - 捲動到 **D1 database bindings** 區塊。

3. **檢查是否已有 DB 綁定**
   - 若有列出 **Variable name**: `DB`、**D1 database**: `the-base-db`，代表已綁好。
   - 若沒有或為空，點 **Add binding**（或 **Add D1 database binding**）：
     - **Variable name** 填：`DB`（必須與程式裡 `env.DB` 一致）。
     - **D1 database** 選：`the-base-db`。
   - 儲存後需 **重新部署** 一次（Deployments → 選最新一次 → Redeploy，或本地再跑一次 `npm run build` + `npx wrangler pages deploy dist --project-name=actyourplan2026`）。

**快速路徑**：Dashboard 左上 **Workers & Pages** → **Pages** → 點 **actyourplan2026** → **Settings** → **Functions** → 看 **D1 database bindings**。

---

## 七、部署後檢查

1. **網站**：打開 `https://你的專案名.pages.dev`，確認首頁、列表、文章頁正常。
2. **後台**：打開 `https://你的專案名.pages.dev/admin`，用你設的 `ADMIN_PASSWORD` 登入，確認可進入。
3. **文章**：在後台新增或編輯一篇文章後，到前台對應類型與文章頁確認是否從 D1 正確顯示。

若列表或文章頁空白，請到 **D1 → the-base-db → Console** 查詢 `SELECT * FROM posts;` 確認是否有資料，以及 **Pages → Functions** 是否已綁定 `DB`。

---

## 快速指令總覽

```bash
# 登入
npx wrangler login

# 建立 D1（若需要）
npx wrangler d1 create the-base-db
# 記得把 database_id 寫入 wrangler.toml

# 建立 posts 表
npx wrangler d1 execute the-base-db --remote --file=./migrations/0000_init_posts.sql

# 建置 + 部署
npm run build
npx wrangler pages deploy dist --project-name=actyourplan2026
```

完成以上步驟後，網站會在 Cloudflare 上線，文章會使用 D1 作為資料庫。

---

## 疑難排解

### 頁面只顯示 `[object Object]`

- **可能原因**：環境或綁定與預期不符，導致某個物件被當成字串渲染。
- **已做防護**：Layout 與首頁已改為只使用字串（locale、gaId、generator、ArticleCard 的 props），並加上 `Astro.locals?.` 避免未定義報錯。
- **請再確認**：
  1. **D1 已綁定**：Cloudflare Dashboard → 你的 Pages 專案 → **Settings** → **Functions** → **D1 database bindings** 是否有 `DB` → `the-base-db`。
  2. **Migration 已執行**：已執行 `npx wrangler d1 execute the-base-db --remote --file=./migrations/0000_init_posts.sql`。
  3. **重新部署**：改動後請重新執行 `npm run build` 再 `npx wrangler pages deploy dist --project-name=actyourplan2026`。
