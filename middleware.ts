import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale, type Locale } from '@/lib/i18n'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 保護 /keystatic 路由
  if (pathname.startsWith('/keystatic')) {
    const session = request.cookies.get('auth-session')

    // 如果沒有 session，重定向到登入頁面
    if (!session) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // 處理語言路由重定向
  // 如果訪問根路徑且沒有語言前綴，保持原樣（預設語言）
  // 如果訪問 /zh-CN、/en、/ja 等，允許通過（由 [locale] 路由處理）
  const pathSegments = pathname.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]

  // 如果是有效的語言代碼，允許通過
  if (locales.includes(firstSegment as Locale)) {
    return NextResponse.next()
  }

  // 其他情況正常處理
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/keystatic/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}

