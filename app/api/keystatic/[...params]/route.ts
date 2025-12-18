import { makeRouteHandler } from '@keystatic/next/route-handler'
import config from '@/keystatic.config'

// Keystatic 的 API 路由需要處理 GitHub OAuth
// Cloudflare Pages 要求所有路由都必須使用 Edge Runtime
export const runtime = 'edge'

// 使用 makeRouteHandler 建立 handler
// 因為我們已經自己接管了 OAuth 流程 (login / callback / refresh-token)
// 所以这里的 handler 主要是用來處理 Keystatic 的資料讀寫 (GraphQL / GitHub API)
// 這些部分在 Edge Runtime 下是安全的
const handler = makeRouteHandler({ config })

export const GET = (req: Request) => handler.GET(req)
export const POST = (req: Request) => handler.POST(req)


