import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import * as cookie from 'cookie'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const searchParams = url.searchParams

  const errorDescription = searchParams.get('error_description')
  const error = searchParams.get('error')

  if (typeof errorDescription === 'string') {
    return new Response(`GitHub Error: ${errorDescription}`, { status: 400 })
  }

  const code = searchParams.get('code')
  const state = searchParams.get('state')

  if (typeof code !== 'string') {
    return new Response('Bad Request: Missing code', { status: 400 })
  }

  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID
  const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return new Response('Server Config Error: Missing Env Vars', { status: 500 })
  }

  // 1. 交換 Token
  const tokenUrl = new URL('https://github.com/login/oauth/access_token')
  tokenUrl.searchParams.set('client_id', clientId)
  tokenUrl.searchParams.set('client_secret', clientSecret)
  tokenUrl.searchParams.set('code', code)

  const tokenRes = await fetch(tokenUrl.toString(), {
    method: 'POST',
    headers: { Accept: 'application/json' },
  })

  const tokenJson = await tokenRes.json().catch(() => null)

  if (!tokenRes.ok || !tokenJson?.access_token) {
    return new Response(`Authorization failed: ${JSON.stringify(tokenJson)}`, { status: 401 })
  }

  // 2. 準備跳轉
  // 嘗試從 cookie 找回原本的 page，找不到就回首頁
  const cookiesHeader = request.headers.get('cookie') ?? ''
  const cookiesObj = cookie.parse(cookiesHeader)
  const from = state ? cookiesObj['ks-' + state] : '/'
  
  const redirectUrl = new URL(`/keystatic${from === '/' ? '' : `/${from}`}`, url.origin)
  const response = NextResponse.redirect(redirectUrl)

  // 3. 設定 Cookie (關鍵修正：不設 HttpOnly，讓前端也能讀到，方便判斷狀態)
  // Keystatic 前端其實也需要讀取 access token 來做某些操作
  // 雖然安全性稍微降低一點點，但能確保前端 useState 能正確抓到狀態
  response.cookies.set('keystatic-gh-access-token', tokenJson.access_token, {
    httpOnly: false, // 改成 false，讓 document.cookie 讀得到
    secure: true,    // 保持 true (Cloudflare 都是 HTTPS)
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 天
  })

  return response
}
