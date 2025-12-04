import Link from 'next/link'
import {
  filterAndSortPosts,
  paginate,
  getAllCategories,
  getUniqueTagsFromPosts,
  type PostMeta,
  type PaginatedResult,
} from '@/lib/mdx'
import FilterAndSort from '@/components/FilterAndSort'
import Pagination from '@/components/Pagination'

// 軍階配置
const rankConfig = {
  PVT: { icon: '🔰', color: 'text-gray-400' },
  SGT: { icon: '🎖️', color: 'text-primary' },
  CDR: { icon: '⭐️', color: 'text-yellow-500' },
}

// 狀態顯示
function StatusBadge({ status }: { status: string }) {
  const statusStr = status || 'Reading'
  const isDeployed = statusStr === 'Deployed'
  return (
    <span
      className={`font-mono text-xs uppercase px-2 py-1 border ${
        isDeployed
          ? 'border-primary text-primary bg-primary/10'
          : 'border-text-muted text-text-muted bg-surface'
      }`}
    >
      [{statusStr.toUpperCase()}]
    </span>
  )
}

interface SignalsPageProps {
  searchParams: {
    category?: string
    rank?: string
    tag?: string
    sortBy?: 'date' | 'views'
    sortOrder?: 'asc' | 'desc'
    page?: string
  }
}

export default function SignalsPage({ searchParams }: SignalsPageProps) {
  // 獲取篩選和排序選項
  const filterOptions = {
    category: searchParams.category,
    rank: searchParams.rank,
    tag: searchParams.tag,
    sortBy: (searchParams.sortBy || 'date') as 'date' | 'views',
    sortOrder: (searchParams.sortOrder || 'desc') as 'asc' | 'desc',
  }

  // 篩選和排序文章
  const filteredPosts = filterAndSortPosts('signals', filterOptions)

  // 分頁
  const page = parseInt(searchParams.page || '1', 10)
  const paginatedResult: PaginatedResult<PostMeta> = paginate(filteredPosts, page, 10)
  const posts = paginatedResult.items

  // 獲取可用的分類和標籤
  const categories = getAllCategories('signals')
  const tags = getUniqueTagsFromPosts('signals')

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-4 text-primary">
            S. SIGNALS
          </h1>
          <p className="text-text-muted font-mono text-lg">
            情報訊號 - 雜訊即敵人，鎖定關鍵訊號
          </p>
        </div>

        {/* Header Text */}
        <div className="mb-12 bg-surface border-2 border-border p-8">
          <h2 className="text-2xl md:text-3xl font-mono font-bold uppercase mb-6 text-primary">
            INTEL: INTERCEPTED SIGNALS 截獲訊號流
          </h2>
          
          <div className="font-mono text-text-main text-sm md:text-base leading-relaxed space-y-4 mb-8">
            <p>
              網路充滿了雜訊 (Noise)。這裡是我設立的雷達站。
            </p>
            <p>
              我用老闆的商業嗅覺，過濾掉 99% 的炒作，只留下那 1% 對未來有影響的<strong className="text-primary">「關鍵訊號」</strong>。
            </p>
            <p>
              如果這條情報出現在這裡，代表它值得你停下來思考 30 秒。
            </p>
          </div>

          {/* How to Use / 使用指南 */}
          <div className="border-t-2 border-border pt-6">
            <h3 className="font-mono font-bold uppercase mb-4 text-text-main">
              [ HOW TO USE / 使用指南 ]
            </h3>
            <div className="space-y-3 font-mono text-sm text-text-muted">
              <div>
                <span className="text-text-main font-bold">SOURCE:</span>{' '}
                點擊來源連結查看原始情報。
              </div>
              <div>
                <span className="text-text-main font-bold">TAKEAWAY:</span>{' '}
                閱讀下方的「指揮官點評」，這是情報的戰術價值所在。
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Sort */}
        <FilterAndSort
          categories={categories}
          tags={tags}
          contentType="signals"
        />

        {/* List View */}
        {posts.length === 0 ? (
          <div className="bg-surface border-2 border-border p-8 text-center">
            <p className="text-text-muted font-mono">
              目前沒有訊號
              {paginatedResult.total > 0 && (
                <span className="block mt-2 text-xs">
                  (已篩選 {paginatedResult.total} 個訊號，但當前頁面無結果)
                </span>
              )}
            </p>
          </div>
        ) : (
          <>
            <div className="bg-surface border-2 border-border">
              <div className="divide-y divide-border">
                {posts.map((post) => {
                  const rank = (post.rank || 'PVT') as keyof typeof rankConfig
                  const rankInfo = rankConfig[rank]
                  const status = post.status || 'Reading'
                  const source = post.source || 'News'
                  const author = post.author || source

                  return (
                    <Link
                      key={post.slug}
                      href={`/signals/${post.slug}`}
                      className="group relative flex items-center gap-6 p-6 hover:bg-background transition-all duration-200"
                    >
                      {/* 左側：Rank Icon + Status */}
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <span className="text-2xl">{rankInfo.icon}</span>
                        <StatusBadge status={status} />
                      </div>

                      {/* 中間：Title + Source/Author */}
                      <div className="flex-1 min-w-0">
                        <h2 className="font-heading font-bold text-lg text-white mb-1 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="font-mono text-sm text-text-muted">
                          {source && `[SOURCE: ${source.toUpperCase()}]`}
                          {post.impact === 'High' && (
                            <span className="text-yellow-500 ml-2">[HIGH IMPACT]</span>
                          )}
                        </p>
                      </div>

                      {/* 右側：Date */}
                      <div className="flex items-center gap-6 flex-shrink-0">
                        <span className="font-mono text-xs text-text-muted">
                          {new Date(post.date).toLocaleDateString('zh-TW')}
                        </span>
                      </div>

                      {/* Hover 指示器 */}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-primary font-mono">&gt;</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={paginatedResult.page}
              totalPages={paginatedResult.totalPages}
              hasNext={paginatedResult.hasNext}
              hasPrev={paginatedResult.hasPrev}
              contentType="signals"
            />
          </>
        )}
      </div>
    </div>
  )
}

