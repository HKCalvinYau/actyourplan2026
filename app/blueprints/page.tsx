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

// 難度顯示
function DifficultyStars(difficulty: number) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={i < difficulty ? 'text-primary' : 'text-text-muted'}
        >
          ■
        </span>
      ))}
    </div>
  )
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

interface BlueprintsPageProps {
  searchParams: {
    category?: string
    rank?: string
    tag?: string
    sortBy?: 'date' | 'views'
    sortOrder?: 'asc' | 'desc'
    page?: string
  }
}

export default function BlueprintsPage({ searchParams }: BlueprintsPageProps) {
  // 獲取篩選和排序選項
  const filterOptions = {
    category: searchParams.category,
    rank: searchParams.rank,
    tag: searchParams.tag,
    sortBy: (searchParams.sortBy || 'date') as 'date' | 'views',
    sortOrder: (searchParams.sortOrder || 'desc') as 'asc' | 'desc',
  }

  // 篩選和排序文章
  const filteredPosts = filterAndSortPosts('blueprints', filterOptions)

  // 分頁
  const page = parseInt(searchParams.page || '1', 10)
  const paginatedResult: PaginatedResult<PostMeta> = paginate(filteredPosts, page, 10)
  const posts = paginatedResult.items

  // 獲取可用的分類和標籤
  const categories = getAllCategories('blueprints')
  const tags = getUniqueTagsFromPosts('blueprints')

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-4 text-primary">
            B. BLUEPRINTS
          </h1>
          <p className="text-text-muted font-mono text-lg">
            戰略藍圖 - 解構經典書籍與商業模式
          </p>
        </div>

        {/* Header Text */}
        <div className="mb-12 bg-surface border-2 border-border p-8">
          <h2 className="text-2xl md:text-3xl font-mono font-bold uppercase mb-6 text-primary">
            ARCHIVE: STRATEGIC KNOWLEDGE 戰略檔案室
          </h2>
          
          <div className="font-mono text-text-main text-sm md:text-base leading-relaxed space-y-4 mb-8">
            <p>
              這裡不存放讀後感，只存放<strong className="text-primary">「可執行的代碼」</strong>。
            </p>
            <p>
              身為現實世界的老闆 (CDR)，我習慣將書本裡的抽象理論，拆解成具體的商業 SOP。
            </p>
            <p>
              這裡的每一份藍圖，都是我為了生存而提煉出的底層邏輯。
            </p>
          </div>

          {/* How to Use / 使用指南 */}
          <div className="border-t-2 border-border pt-6">
            <h3 className="font-mono font-bold uppercase mb-4 text-text-main">
              [ HOW TO USE / 使用指南 ]
            </h3>
            <div className="space-y-3 font-mono text-sm text-text-muted">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🔰</span>
                <div>
                  <span className="text-text-main font-bold">PVT (新兵級):</span>{' '}
                  閱讀摘要，獲取靈感。
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">⭐️</span>
                <div>
                  <span className="text-yellow-500 font-bold">CDR (指揮官級):</span>{' '}
                  直接下載文末的 Notion 模板，部署到你的人生系統中。
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Sort */}
        <FilterAndSort
          categories={categories}
          tags={tags}
          contentType="blueprints"
        />

        {/* List View */}
        {posts.length === 0 ? (
          <div className="bg-surface border-2 border-border p-8 text-center">
            <p className="text-text-muted font-mono">
              目前沒有文章
              {paginatedResult.total > 0 && (
                <span className="block mt-2 text-xs">
                  (已篩選 {paginatedResult.total} 篇文章，但當前頁面無結果)
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
                const difficulty = post.difficulty || 1
                const status = post.status || 'Reading'
                const author = post.author || 'Unknown'

                return (
                  <Link
                    key={post.slug}
                    href={`/blueprints/${post.slug}`}
                    className="group relative flex items-center gap-6 p-6 hover:bg-background transition-all duration-200"
                  >
                    {/* 左側：Rank Icon + Status */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="text-2xl">{rankInfo.icon}</span>
                      <StatusBadge status={status} />
                    </div>

                    {/* 中間：Title + Author */}
                    <div className="flex-1 min-w-0">
                      <h2 className="font-heading font-bold text-lg text-white mb-1 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="font-mono text-sm text-text-muted">
                        by {author}
                      </p>
                    </div>

                    {/* 右側：Difficulty + Date */}
                    <div className="flex items-center gap-6 flex-shrink-0">
                      <div className="hidden md:block">
                        {DifficultyStars(difficulty)}
                      </div>
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
              contentType="blueprints"
            />
          </>
        )}
      </div>
    </div>
  )
}
