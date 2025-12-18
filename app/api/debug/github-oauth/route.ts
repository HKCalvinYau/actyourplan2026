import type { NextRequest } from 'next/server'

// 在 Cloudflare Pages 上同樣使用 Edge Runtime
export const runtime = 'edge'

/**
 * 簡單的 GitHub OAuth 除錯端點
 *
 * 使用方式：
 * 1. 在瀏覽器打開 /api/debug/github-oauth
 *    - 例如：https://actyourplan2026.pages.dev/api/debug/github-oauth
 * 2. 會自動 302 轉跳到 GitHub 登入 / 授權頁面
 * 3. 授權完成後，GitHub 會帶著 code 回到同一個網址
 * 4. 這個端點會用環境變數中的 CLIENT_ID / CLIENT_SECRET 去向 GitHub 換取 access_token
 * 5. 回傳詳細的 JSON 結果，方便我們檢查是哪一步出錯
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')

  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID
  const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET

  // 基本檢查：環境變數是否存在
  if (!clientId || !clientSecret) {
    return new Response(
      JSON.stringify({
        error: 'Missing GitHub OAuth environment variables',
        hasClientId: !!clientId,
        hasClientSecret: !!clientSecret,
        message:
          '請確認在 Cloudflare Pages（Production）環境中設定了 KEYSTATIC_GITHUB_CLIENT_ID 與 KEYSTATIC_GITHUB_CLIENT_SECRET。',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  const redirectUri = `${url.origin}/api/debug/github-oauth`

  // 第一次進來：沒有 code，導向 GitHub 做授權
  if (!code) {
    const ghUrl = new URL('https://github.com/login/oauth/authorize')
    ghUrl.searchParams.set('client_id', clientId)
    ghUrl.searchParams.set('redirect_uri', redirectUri)
    // 最小權限，和 Keystatic 類似，實際 scope 由 GitHub 端決定
    ghUrl.searchParams.set('scope', 'repo')

    return new Response(null, {
      status: 302,
      headers: {
        Location: ghUrl.toString(),
      },
    })
  }

  // 第二次進來：GitHub 帶著 code 回來，我們用這個 code 去換 access_token
  const tokenUrl = new URL('https://github.com/login/oauth/access_token')
  tokenUrl.searchParams.set('client_id', clientId)
  tokenUrl.searchParams.set('client_secret', clientSecret)
  tokenUrl.searchParams.set('code', code)
  tokenUrl.searchParams.set('redirect_uri', redirectUri)

  const tokenRes = await fetch(tokenUrl.toString(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  })

  const rawBody = await tokenRes.text()

  return new Response(
    JSON.stringify(
      {
        tokenEndpointStatus: tokenRes.status,
        tokenEndpointOk: tokenRes.ok,
        rawResponse: rawBody,
      },
      null,
      2
    ),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}


