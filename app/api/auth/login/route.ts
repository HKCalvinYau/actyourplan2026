import { NextRequest, NextResponse } from 'next/server'
import { verifyCredentials } from '@/lib/auth'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    // 在 Edge Runtime 中讀取請求體
    let body
    try {
      // 在 Edge Runtime 中，直接使用 request.json()
      body = await request.json()
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError)
      return NextResponse.json(
        { error: '無效的請求格式', details: parseError instanceof Error ? parseError.message : String(parseError) },
        { status: 400 }
      )
    }

    const { username, password } = body || {}

    if (!username || !password) {
      return NextResponse.json(
        { error: '請輸入用戶名和密碼', received: { username: !!username, password: !!password } },
        { status: 400 }
      )
    }

    // 驗證憑證
    if (!verifyCredentials(username, password)) {
      return NextResponse.json(
        { error: '用戶名或密碼錯誤' },
        { status: 401 }
      )
    }

    // 創建 session cookie
    // 在 Edge Runtime 中，需要使用 NextResponse 來設置 cookie
    const sessionData = JSON.stringify({ username, timestamp: Date.now() })
    
    const response = NextResponse.json({ success: true, username })
    
    // 設置 cookie
    response.cookies.set('auth-session', sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 天
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: '登入時發生錯誤', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

