import Link from 'next/link'
import {
  filterAndSortPosts,
  paginate,
  getAllCategories,
  getUniqueTagsFromPosts,
  type PostMeta,
  type PaginatedResult,
} from '@/lib/mdx-edge'
import FilterAndSort from '@/components/FilterAndSort'
import Pagination from '@/components/Pagination'

export const runtime = 'edge'

// 軍階配置
const rankConfig = {
  PVT: { icon: '🔰', color: 'text-gray-400' },
  SGT: { icon: '🎖️', color: 'text-primary' },
  CDR: { icon: '⭐️', color: 'text-yellow-500' },
}

// 狀態徽章
function StatusBadge(status: string) {
  const statusConfig: Record<string, { emoji: string; color: string }> = {
    Alpha: { emoji: '🚧', color: 'text-yellow-500' },
    Beta: { emoji: '🔧', color: 'text-primary' },
    Failed: { emoji: '❌', color: 'text-red-500' },
  }

  const config = statusConfig[status] || { emoji: '⚙️', color: 'text-text-muted' }

  return (
    <span
      className={`font-mono text-xs uppercase px-2 py-1 border ${config.color} border-current`}
    >
      {config.emoji} {status.toUpperCase()}
    </span>
  )
}

// 進度條
function ProgressBar(progress: number) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2 font-mono text-xs text-text-muted">
        <span>LOADING...</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full h-2 bg-surface border border-border overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

interface ExperimentsPageProps {
  searchParams: Promise<{
    category?: string
    rank?: string
    tag?: string
    sortBy?: 'date' | 'views'
    sortOrder?: 'asc' | 'desc'
    page?: string
  }>
}

export default async function ExperimentsPage({ searchParams }: ExperimentsPageProps) {
  const params = await searchParams
  // 獲取篩選和排序選項
  const filterOptions = {
    category: params.category,
    rank: params.rank,
    tag: params.tag,
    sortBy: (params.sortBy || 'date') as 'date' | 'views',
    sortOrder: (params.sortOrder || 'desc') as 'asc' | 'desc',
  }

  // 使用 try-catch 處理錯誤
  let posts: PostMeta[] = []
  let categories: Array<{ slug: string; name: string }> = []
  let tags: string[] = []
  let totalPages = 1
  let currentPage = 1
  let hasNext = false
  let hasPrev = false
  let total = 0

  try {
    // 篩選和排序文章
    const filteredPosts = await filterAndSortPosts('experiments', filterOptions)
    total = filteredPosts.length

    // 分頁
    currentPage = parseInt(params.page || '1', 10)
    const paginatedResult: PaginatedResult<PostMeta> = paginate(filteredPosts, currentPage, 10)
    posts = paginatedResult.items
    totalPages = paginatedResult.totalPages
    hasNext = paginatedResult.hasNext
    hasPrev = paginatedResult.hasPrev

    // 獲取可用的分類和標籤
    categories = await getAllCategories('experiments')
    tags = await getUniqueTagsFromPosts('experiments')
  } catch (error) {
    console.error('Error loading experiments:', error)
    // 如果出錯，使用空數組，頁面仍會顯示（只是沒有內容）
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-4 text-primary">
            E. EXPERIMENTS
          </h1>
          <p className="text-text-muted font-mono text-lg">
            實驗室 - 見證從 0 到 1 的構建過程
          </p>
        </div>

        {/* Header Text */}
        <div className="mb-12 bg-surface border-2 border-border p-8">
          <h2 className="text-2xl md:text-3xl font-mono font-bold uppercase mb-6 text-primary">
            R&D: LIVE FIRE EXERCISES 實彈演習場
          </h2>
          
          <div className="font-mono text-text-main text-sm md:text-base leading-relaxed space-y-4 mb-8">
            <p>
              歡迎來到我的數位工坊。這裡沒有完美的產品，只有正在進行中的實驗。
            </p>
            <p>
              這是關於一個傳統商人，如何笨拙地學習寫 Code、架網站、做 App 的生存紀錄。
            </p>
            <p>
              你會看到失敗的殘骸 (Failed)，也會看到成功運行的原型 (Alpha)。
            </p>
          </div>

          {/* How to Use / 使用指南 */}
          <div className="border-t-2 border-border pt-6">
            <h3 className="font-mono font-bold uppercase mb-4 text-text-main">
              [ HOW TO USE / 使用指南 ]
            </h3>
            <div className="space-y-3 font-mono text-sm text-text-muted">
              <div>
                <span className="text-text-main font-bold">PROGRESS:</span>{' '}
                觀察綠色進度條，了解專案完成度。
              </div>
              <div>
                <span className="text-text-main font-bold">STACK:</span>{' '}
                查看我用了什麼技術棧 (Next.js, Python...) 來解決問題。
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Sort */}
        <FilterAndSort
          categories={categories}
          tags={tags}
          contentType="experiments"
        />

        {/* Portfolio View */}
        {posts.length === 0 ? (
          <div className="bg-surface border-2 border-border p-8 text-center">
            <p className="text-text-muted font-mono">
              目前沒有實驗
              {total > 0 && (
                <span className="block mt-2 text-xs">
                  (已篩選 {total} 個實驗，但當前頁面無結果)
                </span>
              )}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {posts.map((post) => {
              const rank = (post.rank || 'PVT') as keyof typeof rankConfig
              const rankInfo = rankConfig[rank]
              const status = post.status || 'Alpha'
              const progress = post.progress || 0
              const stack = post.stack || ''

              return (
                <Link
                  key={post.slug}
                  href={`/experiments/${post.slug}`}
                  className="group block bg-surface border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                >
                  <div className="p-8">
                    {/* Top: Status Badge + Rank */}
                    <div className="flex items-center justify-between mb-6">
                      {StatusBadge(status)}
                      <div
                        className={`flex items-center gap-2 px-2 py-1 border border-border ${rankInfo.color} text-xs uppercase`}
                      >
                        <span>{rankInfo.icon}</span>
                        <span>{rank}</span>
                      </div>
                    </div>

                    {/* Body: Title + Description */}
                    <div className="mb-6">
                      <h2 className="font-heading font-bold text-2xl text-white mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      {post.description && (
                        <p className="font-mono text-sm text-text-muted leading-relaxed">
                          {post.description}
                        </p>
                      )}
                    </div>

                    {/* Tech Stack */}
                    {stack && (
                      <div className="mb-6">
                        <p className="font-mono text-xs text-text-muted mb-2 uppercase">
                          TECH STACK:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {stack.split(',').map((tech: string, i: number) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-background border border-border text-text-muted font-mono text-xs"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Progress Bar */}
                    {ProgressBar(progress)}
                  </div>
                </Link>
              )
            })}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              hasNext={hasNext}
              hasPrev={hasPrev}
              contentType="experiments"
            />
          </>
        )}
      </div>
    </div>
  )
}

