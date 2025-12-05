import { makeRouteHandler } from '@keystatic/next/route-handler'
import config from '@/keystatic.config'

export const runtime = 'nodejs' // Keystatic 需要 Node.js runtime

export const { GET, POST } = makeRouteHandler({ config })

