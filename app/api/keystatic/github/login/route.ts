import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID
  
  if (!clientId) {
    return new Response('Missing KEYSTATIC_GITHUB_CLIENT_ID', { status: 500 })
  }

  // 1. 準備 GitHub 授權網址
  const redirectUri = `${url.origin}/api/keystatic/github/oauth/callback`
  const state = crypto.randomUUID() // 產生隨機驗證碼
  
  const githubUrl = new URL('https://github.com/login/oauth/authorize')
  githubUrl.searchParams.set('client_id', clientId)
  githubUrl.searchParams.set('redirect_uri', redirectUri)
  githubUrl.searchParams.set('scope', 'repo')
  githubUrl.searchParams.set('state', state)
  
  // 2. 處理登入後要跳轉回哪裡（預設跳回 /）
  const from = url.searchParams.get('from') || '/'
  
  // 3. 建立轉址回應
  const response = NextResponse.redirect(githubUrl.toString())
  
  // 4. 設定 cookie 記住 state（這是為了安全性，也是為了 callback 知道要跳回哪）
  // 注意：這裡 cookie 名稱格式 ks-<state> 是為了配合我們在 callback 寫的邏輯
  response.cookies.set(`ks-${state}`, from, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60, // 1 小時有效期
    path: '/',
  })
  
  return response
}

