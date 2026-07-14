# THE BASE (Act Your Plan) — Blog

| 角色 | 位置 |
|------|------|
| **本機 code（唯一）** | `~/Documents/IT-OS/websites/actyourplan2026` |
| **GitHub SSOT** | https://github.com/HKCalvinYau/actyourplan2026 |
| **CF Pages** | `actyourplan2026` |
| **目標公網域名** | **https://actyourplan.com**（+ www） |
| **預覽** | https://actyourplan2026.pages.dev · https://thebase.pages.dev |
| **形態** | **Blog 形式**戰略／內容站（Astro SSR + D1 + 文章路由） |
| **架構** | Astro + Cloudflare D1 (`the-base-db`) + KV SESSION |

## 決策（2026-07-14 · Calvin）

- **取消** 舊「寵物善終」站：Pages `pet-cremation-website`（曾佔用 `actyourplan.com`）。**唔再用。**
- **`actyourplan.com` 應指向 THE BASE**（本專案），唔係寵物善終。
- GitHub `pet-cremation-website` → archive。

## Cursor

Open Folder → `Documents/IT-OS/websites/actyourplan2026`

## 部署後驗證

```bash
curl -sL https://actyourplan.com/ | head
# 應見 THE BASE / blog 內容，唔係「寵物善終服務」
```
