import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const runtime = 'edge'

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get('auth-session')

  if (!session?.value) {
    return NextResponse.json({ authenticated: false })
  }

  try {
    const user = JSON.parse(session.value)
    return NextResponse.json({
      authenticated: true,
      username: user.username,
    })
  } catch {
    return NextResponse.json({ authenticated: false })
  }
}

