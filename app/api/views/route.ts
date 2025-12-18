import { NextRequest, NextResponse } from 'next/server'

// 注意：在 Cloudflare Edge Runtime 中無法使用 fs
// 暫時禁用文件系統寫入，只返回成功（實際統計可在部署後使用 GitHub API 實現）
export const runtime = 'edge' // Cloudflare Pages 要求使用 Edge Runtime

// 內容類型
type ContentType = 'blueprints' | 'armory' | 'signals' | 'experiments'

/**
 * 增加真實閱讀量
 * 注意：在 Edge Runtime 中無法使用文件系統
 * 這裡只返回成功，實際統計需要在部署後使用 GitHub API 或數據庫實現
 */
function incrementRealViews(type: ContentType, slug: string): number {
  // 在 Edge Runtime 中無法訪問文件系統
  // 返回一個模擬值，實際實現需要使用 GitHub API 或 Cloudflare KV
  return 0
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, slug } = body

    // 驗證參數
    if (!type || !slug) {
      return NextResponse.json(
        { error: 'Missing type or slug' },
        { status: 400 }
      )
    }

    if (!['blueprints', 'armory', 'signals', 'experiments'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type' },
        { status: 400 }
      )
    }

    // 增加真實閱讀量
    const newRealViews = incrementRealViews(type as ContentType, slug)

    return NextResponse.json({
      success: true,
      realViews: newRealViews,
    })
  } catch (error) {
    console.error('Error incrementing real views:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

