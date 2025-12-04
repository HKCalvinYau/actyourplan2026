// Service Worker for PWA
// 注意：這個文件需要放在 public 目錄，但實際註冊在客戶端組件中

const CACHE_NAME = 'the-base-v1'
const RUNTIME_CACHE = 'the-base-runtime-v1'

// 需要緩存的靜態資源
const STATIC_ASSETS = [
  '/',
  '/offline',
  // 添加其他關鍵靜態資源
]

// 安裝 Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

// 激活 Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE
          })
          .map((cacheName) => {
            return caches.delete(cacheName)
          })
      )
    })
  )
  return self.clients.claim()
})

// 攔截網路請求
self.addEventListener('fetch', (event) => {
  // 只處理 GET 請求
  if (event.request.method !== 'GET') {
    return
  }

  // 跳過非 HTTP/HTTPS 請求
  if (!event.request.url.startsWith('http')) {
    return
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 如果有緩存，返回緩存
      if (cachedResponse) {
        return cachedResponse
      }

      // 否則從網路獲取
      return fetch(event.request)
        .then((response) => {
          // 只緩存成功的響應
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }

          // 克隆響應（因為響應只能使用一次）
          const responseToCache = response.clone()

          // 添加到緩存
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(() => {
          // 如果網路失敗，嘗試返回離線頁面
          if (event.request.destination === 'document') {
            return caches.match('/offline')
          }
        })
    })
  )
})

