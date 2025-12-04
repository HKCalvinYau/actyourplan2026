# 性能優化實作說明

## 📋 概述

已實作完整的性能優化系統，包括：
- 圖片 CDN 配置
- 圖片預加載
- Service Worker（PWA）

## 🖼️ 圖片 CDN 配置

### 支援的 CDN

#### 1. Cloudflare Images
Cloudflare Images 提供全球 CDN 和自動圖片優化。

**配置：**
```bash
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID=your_account_id
NEXT_PUBLIC_CLOUDFLARE_IMAGES_HASH=your_images_hash
```

**使用方式：**
```tsx
import { getOptimizedImageUrl } from '@/lib/image-cdn'

const imageUrl = getOptimizedImageUrl('/images/photo.jpg', {
  width: 1200,
  height: 630,
  quality: 80,
  format: 'webp'
})
```

#### 2. 自定義 CDN
支援任何自定義 CDN URL。

**配置：**
```bash
NEXT_PUBLIC_CDN_URL=https://cdn.example.com
```

### 工具函數

#### `getCDNUrl(path: string)`
獲取 CDN URL，如果未配置則返回原始路徑。

#### `getOptimizedImageUrl(path, options)`
獲取優化後的圖片 URL，支援寬度、高度、品質和格式參數。

#### `generateSrcSet(path, widths)`
生成響應式圖片 srcset。

## 🚀 圖片預加載

### 功能

1. **關鍵圖片優先載入**
   - 使用 `priority` 屬性標記關鍵圖片
   - 自動預加載到瀏覽器緩存

2. **視窗內預加載**
   - 使用 Intersection Observer
   - 在圖片進入視窗前預加載

3. **懸停預加載**
   - 當用戶懸停在連結上時預加載目標頁面圖片

### 使用方式

#### 在組件中使用
```tsx
import { preloadImage, preloadImages } from '@/lib/image-preload'

// 預加載單張圖片
await preloadImage('/images/hero.jpg')

// 預加載多張圖片
await preloadImages([
  '/images/hero.jpg',
  '/images/feature.jpg'
])
```

#### 在 TacticalImage 中使用
```tsx
<TacticalImage 
  src="/images/hero.jpg" 
  alt="Hero" 
  priority={true}  // 優先載入
/>
```

## 📱 PWA 支援

### Service Worker

Service Worker 提供：
- 離線支援
- 資源緩存
- 快速載入

**文件：**
- `public/sw.js` - Service Worker 腳本
- `components/ServiceWorker.tsx` - 註冊組件

### Manifest

PWA Manifest 配置：
- 應用名稱和描述
- 圖標配置
- 主題顏色
- 顯示模式

**文件：**
- `app/manifest.ts` - Manifest 配置

### 離線頁面

當用戶離線時顯示的頁面。

**文件：**
- `app/offline/page.tsx` - 離線頁面

### 配置

#### 開發環境啟用（可選）
```bash
NEXT_PUBLIC_ENABLE_SW=true
```

#### 生產環境
Service Worker 會在生產環境自動啟用。

### 圖標準備

需要準備以下圖標文件：
- `/public/images/icon-192.png` (192x192)
- `/public/images/icon-512.png` (512x512)

## 🔧 環境變數

### 圖片 CDN
```bash
# Cloudflare Images
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID=your_account_id
NEXT_PUBLIC_CLOUDFLARE_IMAGES_HASH=your_images_hash

# 或自定義 CDN
NEXT_PUBLIC_CDN_URL=https://cdn.example.com
```

### Service Worker
```bash
# 開發環境啟用（可選）
NEXT_PUBLIC_ENABLE_SW=true
```

## 📊 性能提升

### 預期效果

1. **圖片載入速度**
   - CDN 加速：減少 50-70% 載入時間
   - 圖片優化：減少 30-50% 文件大小
   - 預加載：關鍵圖片立即顯示

2. **離線體驗**
   - 緩存靜態資源
   - 離線頁面支援
   - 快速載入已訪問頁面

3. **PWA 功能**
   - 可安裝為應用
   - 離線使用
   - 快速啟動

## 🚀 部署注意事項

1. **Service Worker**
   - 確保 `sw.js` 在 `public` 目錄
   - 檢查 Service Worker 註冊是否成功
   - 測試離線功能

2. **CDN 配置**
   - 確認 CDN URL 正確
   - 測試圖片載入
   - 檢查圖片優化是否生效

3. **圖標文件**
   - 準備所有必需的圖標尺寸
   - 確保圖標路徑正確
   - 測試 PWA 安裝

## 📝 使用範例

### 完整範例

```tsx
import TacticalImage from '@/components/TacticalImage'
import { getOptimizedImageUrl } from '@/lib/image-cdn'
import { preloadImage } from '@/lib/image-preload'

// 預加載關鍵圖片
useEffect(() => {
  preloadImage(getOptimizedImageUrl('/images/hero.jpg', { format: 'webp' }))
}, [])

// 使用優化後的圖片
<TacticalImage 
  src="/images/hero.jpg" 
  alt="Hero" 
  priority={true}
/>
```

## 🔗 相關文檔

- `OPTIMIZATION_SUMMARY.md` - 優化總結
- `DEPLOYMENT_PLAN.md` - 部署計劃

