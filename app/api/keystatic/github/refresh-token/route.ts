import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import * as cookie from 'cookie'

export const runtime = 'edge'

/**
 * 自訂的 GitHub Refresh Token 處理
 *
 * 目的：
 * - 覆蓋 Keystatic 內建的 refresh-token 路由
 * - 因為我們的 OAuth 流程只拿 access_token（無 refresh_token）
 * - 所以這裡只要檢查 access_token 是否存在且有效即可
 * - 如果有 access_token，就回傳 200，讓 Keystatic 認為 session 有效
 */
export async function POST(request: NextRequest) {
  const cookiesHeader = request.headers.get('cookie') ?? ''
  const cookies = cookie.parse(cookiesHeader)
  const accessToken = cookies['keystatic-gh-access-token']

  // 如果連 access_token 都沒有，那就是真的沒登入（或過期了）
  if (!accessToken) {
    return new Response('Authorization failed', { status: 401 })
  }

  // 因為我們沒有 refresh_token，也沒辦法真的去跟 GitHub 換新 token
  // 所以這裡採取的策略是：
  // "只要 cookie 還在，就當作有效"
  // 如果 access_token 真的在 GitHub 那邊過期了，
  // 使用者在操作時 API 會報錯，Keystatic 就會自動把使用者踢回登入頁。
  
  // 回傳 200 讓前端以為 refresh 成功（其實什麼都沒做，只是確認 token 還在）
  return new Response(null, { status: 200 })
}

// 也要處理 GET，以防萬一
export async function GET(request: NextRequest) {
  return POST(request)
}

