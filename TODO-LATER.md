# THE BASE — 之後先做（而家唔開工）

**狀態**：⏸️ Deferred（2026-07-14）  
**本機**：`~/Documents/IT-OS/websites/actyourplan2026`（檔案已歸位）  
**GitHub**：`HKCalvinYau/actyourplan2026`  
**形態**：**Blog 形式**戰略／內容站（Astro + D1）

## 之後再開工時做

1. **域名**：CF Dashboard 把 `actyourplan.com` / `www` 從已取消嘅 `pet-cremation-website` 拆出，綁去 **actyourplan2026**（見 `IT-OS/DECISIONS-ACTYOURPLAN-DOMAIN.md`）。
2. **內容／Blog**：文章、blueprints、signals、圖片資源（HANDOVER 曾提 public/images 缺）。
3. **Admin**：後台 CRUD、密碼／env。
4. **Deploy 驗證**：`npm run pages:build` + `wrangler pages deploy dist --project-name=actyourplan2026`。
5. **驗證**：`curl -sL https://actyourplan.com` 應見 THE BASE，唔係寵物善終。

## 而家唔做

- 唔改功能 code
- 唔急 deploy（檔案位置已正確即可）

## 相關文件

- `WHERE-THIS-LIVES.md` — 唯一 path
- `DEPLOY.md` / `HANDOVER.md` — 技術交接
- `IT-OS/DECISIONS-ACTYOURPLAN-DOMAIN.md` — 域名決策
