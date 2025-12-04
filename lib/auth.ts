import { cookies } from 'next/headers'

// 簡單的認證配置（生產環境應該使用環境變數）
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export interface AuthUser {
  username: string
  isAuthenticated: boolean
}

/**
 * 驗證用戶名和密碼
 */
export function verifyCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

/**
 * 檢查用戶是否已登入
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('auth-session')
  return !!session?.value
}

/**
 * 獲取當前用戶信息
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get('auth-session')
  
  if (!session?.value) {
    return null
  }

  try {
    const user = JSON.parse(session.value)
    return {
      username: user.username,
      isAuthenticated: true,
    }
  } catch {
    return null
  }
}

