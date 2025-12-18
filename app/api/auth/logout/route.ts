import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST() {
  // 在 Edge Runtime 中，需要使用 NextResponse 來刪除 cookie
  const response = NextResponse.json({ success: true })
  response.cookies.delete('auth-session')
  return response
}

