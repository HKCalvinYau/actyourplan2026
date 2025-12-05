import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyCredentials } from '@/lib/auth'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: '請輸入用戶名和密碼' },
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
    const cookieStore = await cookies()
    const sessionData = JSON.stringify({ username, timestamp: Date.now() })
    
    cookieStore.set('auth-session', sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 天
      path: '/',
    })

    return NextResponse.json({ success: true, username })
  } catch (error) {
    return NextResponse.json(
      { error: '登入時發生錯誤' },
      { status: 500 }
    )
  }
}

