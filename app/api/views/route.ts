import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// 注意：此 API 使用 fs，在 Cloudflare Edge Runtime 中可能無法正常工作
// 如果需要，可以改為使用 GitHub API 或數據庫
export const runtime = 'nodejs' // 使用 Node.js runtime 以支援 fs

// 內容類型
type ContentType = 'blueprints' | 'armory' | 'signals' | 'experiments'

// 內容資料夾路徑
const contentDirectory = path.join(process.cwd(), 'content')

/**
 * 增加真實閱讀量
 */
function incrementRealViews(type: ContentType, slug: string): number {
  const fullPath = path.join(contentDirectory, type, `${slug}.mdx`)

  // 檢查檔案是否存在
  if (!fs.existsSync(fullPath)) {
    return 0
  }

  // 讀取檔案
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // 獲取當前真實閱讀量
  const currentRealViews = (data.realViews as number) || 0
  const newRealViews = currentRealViews + 1

  // 更新 frontmatter 中的 realViews
  const updatedData = {
    ...data,
    realViews: newRealViews,
  }

  // 使用 gray-matter 的 stringify 方法來正確格式化 frontmatter
  const updatedFile = matter.stringify(content, updatedData)

  // 寫回檔案
  fs.writeFileSync(fullPath, updatedFile, 'utf8')

  return newRealViews
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

