'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ImageOff } from 'lucide-react'
import { getOptimizedImageUrl } from '@/lib/image-cdn'
import { preloadImage } from '@/lib/image-preload'

interface TacticalImageProps {
  src: string
  alt: string
  className?: string
  overlay?: boolean // 是否顯示綠色濾鏡覆蓋
  frame?: boolean // 是否顯示戰術邊框
}

export default function TacticalImage({
  src,
  alt,
  className = '',
  overlay = true,
  frame = true,
  priority = false, // 是否優先載入
}: TacticalImageProps & { priority?: boolean }) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // 預加載圖片（如果設置了 priority）
  useEffect(() => {
    if (priority && src && !src.startsWith('http')) {
      const optimizedSrc = getOptimizedImageUrl(src, { format: 'webp' })
      preloadImage(optimizedSrc).catch(() => {
        // 靜默處理錯誤
      })
    }
  }, [priority, src])

  return (
    <div className={`relative ${frame ? 'p-4' : ''} ${className}`}>
      {/* 戰術邊框 */}
      {frame && (
        <div className="absolute inset-0 border-2 border-primary">
          {/* 左上角十字準星 */}
          <div className="absolute -top-2 -left-2 w-6 h-6">
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-primary transform -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 border border-primary transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* 右上角十字準星 */}
          <div className="absolute -top-2 -right-2 w-6 h-6">
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-primary transform -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 border border-primary transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* 左下角十字準星 */}
          <div className="absolute -bottom-2 -left-2 w-6 h-6">
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-primary transform -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 border border-primary transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* 右下角十字準星 */}
          <div className="absolute -bottom-2 -right-2 w-6 h-6">
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-primary transform -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 border border-primary transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      )}

      {/* 圖片容器 */}
      <div className="relative bg-surface border-2 border-border overflow-hidden">
        {imageError ? (
          /* 載入失敗：NO SIGNAL 佔位圖 */
          <div className="flex flex-col items-center justify-center aspect-video bg-background p-8">
            <ImageOff className="w-16 h-16 text-text-muted mb-4" />
            <div className="font-mono text-text-muted text-sm uppercase tracking-wider text-center">
              <div className="mb-2">NO SIGNAL</div>
              <div className="text-xs text-text-muted/50">IMAGE NOT FOUND</div>
            </div>
          </div>
        ) : (
          <>
            {/* 圖片 - 使用 Next.js Image 組件優化（如果是外部圖片則使用 img） */}
            {src.startsWith('http') ? (
              <img
                src={src}
                alt={alt}
                onError={() => setImageError(true)}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-auto transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
              />
            ) : (
              <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                <Image
                  src={getOptimizedImageUrl(src, { format: 'webp' })}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={`object-cover transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onError={() => setImageError(true)}
                  onLoad={() => setImageLoaded(true)}
                  loading={priority ? 'eager' : 'lazy'}
                  priority={priority}
                />
              </div>
            )}

            {/* 載入中狀態 */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-surface">
                <div className="font-mono text-text-muted text-xs uppercase tracking-wider">
                  LOADING...
                </div>
              </div>
            )}

            {/* 綠色濾鏡覆蓋層 */}
            {overlay && imageLoaded && (
              <div className="absolute inset-0 bg-primary/5 pointer-events-none mix-blend-screen"></div>
            )}
          </>
        )}
      </div>

      {/* 圖片資訊（可選，顯示在底部） */}
      {!imageError && imageLoaded && (
        <div className="mt-2 font-mono text-text-muted text-xs text-center uppercase tracking-wider">
          {alt}
        </div>
      )}
    </div>
  )
}

