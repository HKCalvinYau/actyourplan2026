// 圖片 CDN 工具函數

/**
 * 獲取 CDN URL
 * 如果配置了 CDN，則使用 CDN；否則使用原始路徑
 */
export function getCDNUrl(path: string): string {
  // 如果是完整 URL，直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  // 從環境變數獲取 CDN 基礎 URL
  const cdnBaseUrl = process.env.NEXT_PUBLIC_CDN_URL

  // 如果配置了 CDN，使用 CDN URL
  if (cdnBaseUrl) {
    // 確保路徑以 / 開頭
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    // 移除 CDN URL 末尾的斜線（如果有的話）
    const baseUrl = cdnBaseUrl.replace(/\/$/, '')
    return `${baseUrl}${normalizedPath}`
  }

  // 否則使用原始路徑
  return path
}

/**
 * 獲取優化後的圖片 URL（支援 Cloudflare Images）
 */
export function getOptimizedImageUrl(
  path: string,
  options?: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'avif' | 'jpeg' | 'png'
  }
): string {
  const { width, height, quality = 80, format } = options || {}

  // 如果是完整 URL，直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  // Cloudflare Images CDN
  const cloudflareAccountId = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID
  const cloudflareImagesHash = process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_HASH

  if (cloudflareAccountId && cloudflareImagesHash) {
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path
    let url = `https://imagedelivery.net/${cloudflareImagesHash}/${normalizedPath}`

    // 添加變換參數
    const params: string[] = []
    if (width) params.push(`w=${width}`)
    if (height) params.push(`h=${height}`)
    if (quality) params.push(`q=${quality}`)
    if (format) params.push(`format=${format}`)

    if (params.length > 0) {
      url += `/${params.join(',')}`
    }

    return url
  }

  // 使用自定義 CDN
  const cdnBaseUrl = process.env.NEXT_PUBLIC_CDN_URL
  if (cdnBaseUrl) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    const baseUrl = cdnBaseUrl.replace(/\/$/, '')
    let url = `${baseUrl}${normalizedPath}`

    // 添加查詢參數（如果 CDN 支援）
    const params: string[] = []
    if (width) params.push(`w=${width}`)
    if (height) params.push(`h=${height}`)
    if (quality) params.push(`q=${quality}`)
    if (format) params.push(`format=${format}`)

    if (params.length > 0) {
      url += `?${params.join('&')}`
    }

    return url
  }

  // 預設返回原始路徑
  return path
}

/**
 * 生成響應式圖片 srcset
 */
export function generateSrcSet(
  path: string,
  widths: number[] = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
): string {
  return widths
    .map((width) => {
      const url = getOptimizedImageUrl(path, { width, format: 'webp' })
      return `${url} ${width}w`
    })
    .join(', ')
}

