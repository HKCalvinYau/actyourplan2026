// 圖片預加載工具函數

/**
 * 預加載單張圖片
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

/**
 * 預加載多張圖片
 */
export function preloadImages(srcs: string[]): Promise<void[]> {
  return Promise.all(srcs.map(preloadImage))
}

/**
 * 使用 link rel="preload" 預加載關鍵圖片
 * 這會在 HTML head 中添加預加載標籤
 */
export function addPreloadLink(href: string, as: 'image' = 'image', type?: string) {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = as
  link.href = href
  if (type) {
    link.type = type
  }
  document.head.appendChild(link)
}

/**
 * 預加載關鍵圖片（首屏圖片）
 * 使用 Intersection Observer 在圖片進入視窗前預加載
 */
export function preloadCriticalImages(
  selectors: string[],
  options?: {
    rootMargin?: string
    threshold?: number
  }
) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return
  }

  const { rootMargin = '200px', threshold = 0.01 } = options || {}

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          const src = img.dataset.src || img.src
          if (src) {
            preloadImage(src).catch(() => {
              // 靜默處理錯誤
            })
          }
          observer.unobserve(entry.target)
        }
      })
    },
    {
      rootMargin,
      threshold,
    }
  )

  selectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector)
    elements.forEach((element) => {
      observer.observe(element)
    })
  })

  return observer
}

/**
 * 預加載下一頁可能需要的圖片
 * 當用戶懸停在連結上時預加載目標頁面的關鍵圖片
 */
export function preloadOnHover(linkSelector: string, imageSrcs: string[]) {
  if (typeof window === 'undefined') return

  const links = document.querySelectorAll(linkSelector)
  links.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      preloadImages(imageSrcs).catch(() => {
        // 靜默處理錯誤
      })
    })
  })
}

