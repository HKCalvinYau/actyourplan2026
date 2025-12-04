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
  PVT: { icon: '🔰', color: 'text-gray-400', bgColor: 'bg-gray-800', borderColor: 'border-gray-600' },
  SGT: { icon: '🎖️', color: 'text-primary', bgColor: 'bg-primary/10', borderColor: 'border-primary' },
  CDR: { icon: '⭐️', color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500' },
}

// 評分顯示
function RatingStars(rating: number) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={i < rating ? 'text-primary' : 'text-text-muted'}
        >
          ★
        </span>
      ))}
    </div>
  )
}

interface ArmoryPageProps {
  searchParams: {
    category?: string
    rank?: string
    tag?: string
    sortBy?: 'date' | 'views'
    sortOrder?: 'asc' | 'desc'
    page?: string
  }
}

export default function ArmoryPage({ searchParams }: ArmoryPageProps) {
  // 獲取篩選和排序選項
  const filterOptions = {
    category: searchParams.category,
    rank: searchParams.rank,
    tag: searchParams.tag,
    sortBy: (searchParams.sortBy || 'date') as 'date' | 'views',
    sortOrder: (searchParams.sortOrder || 'desc') as 'asc' | 'desc',
  }

  // 篩選和排序文章
  const filteredPosts = filterAndSortPosts('armory', filterOptions)

  // 分頁
  const page = parseInt(searchParams.page || '1', 10)
  const paginatedResult: PaginatedResult<PostMeta> = paginate(filteredPosts, page, 10)
  const posts = paginatedResult.items

  // 獲取可用的分類和標籤
  const categories = getAllCategories('armory')
  const tags = getUniqueTagsFromPosts('armory')

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-4 text-primary">
            A. ARMORY
          </h1>
          <p className="text-text-muted font-mono text-lg">
            數位軍火庫 - 工欲善其事，必先升級武器
          </p>
        </div>

        {/* Header Text */}
        <div className="mb-12 bg-surface border-2 border-border p-8">
          <h2 className="text-2xl md:text-3xl font-mono font-bold uppercase mb-6 text-primary">
            LOGISTICS: WEAPON RACK 數位武器掛架
          </h2>
          
          <div className="font-mono text-text-main text-sm md:text-base leading-relaxed space-y-4 mb-8">
            <p>
              在 IT 世界裡，我只是一個二等兵 (PVT)。
            </p>
            <p>
              為了彌補技術上的劣勢，我必須依賴最強大的<strong className="text-primary">「外骨骼裝甲」</strong>——也就是 AI 與 SaaS 工具。
            </p>
            <p>
              這裡展示了我目前的作戰裝備 (Loadout)，以及我如何用它們來以一擋十。
            </p>
          </div>

          {/* How to Use / 使用指南 */}
          <div className="border-t-2 border-border pt-6">
            <h3 className="font-mono font-bold uppercase mb-4 text-text-main">
              [ HOW TO USE / 使用指南 ]
            </h3>
            <div className="space-y-3 font-mono text-sm text-text-muted">
              <div>
                <span className="text-text-main font-bold">TYPE:</span>{' '}
                注意分類，是 AI 輔助 (Exoskeleton) 還是自動化腳本 (Bot)。
              </div>
              <div>
                <span className="text-text-main font-bold">COST:</span>{' '}
                我會標註這把武器是免費 (Free) 還是需要軍費 (Paid)。
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Sort */}
        <FilterAndSort
          categories={categories}
          tags={tags}
          contentType="armory"
        />

        {/* Grid View */}
        {posts.length === 0 ? (
          <div className="bg-surface border-2 border-border p-8 text-center">
            <p className="text-text-muted font-mono">
              目前沒有裝備
              {paginatedResult.total > 0 && (
                <span className="block mt-2 text-xs">
                  (已篩選 {paginatedResult.total} 個裝備，但當前頁面無結果)
                </span>
              )}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
              const rank = (post.rank || 'PVT') as keyof typeof rankConfig
              const rankInfo = rankConfig[rank]
              const type = post.type || 'SaaS'
              const cost = post.cost || 'Free'
              const rating = post.rating || 0

              return (
                <div
                  key={post.slug}
                  className="group bg-surface border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                >
                  {/* 圖片區（佔位） */}
                  <div className="relative h-48 bg-background border-b-2 border-border overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-text-muted text-4xl">
                        {rankInfo.icon}
                      </span>
                    </div>
                  </div>

                  {/* 內容區 */}
                  <div className="p-6">
                    {/* Header: Rank Badge + Type */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`flex items-center gap-2 px-2 py-1 border ${rankInfo.borderColor} ${rankInfo.bgColor} ${rankInfo.color} text-xs uppercase`}
                      >
                        <span>{rankInfo.icon}</span>
                        <span>{rank}</span>
                      </div>
                      <span className="font-mono text-xs text-text-muted uppercase">
                        {type}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-heading font-bold text-xl text-white mb-4 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>

                    {/* Specs: Cost + Rating */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                      <div>
                        <span className="font-mono text-xs text-text-muted">
                          COST:
                        </span>{' '}
                        <span
                          className={`font-mono text-sm ${
                            cost === 'Free' ? 'text-primary' : 'text-yellow-500'
                          }`}
                        >
                          {cost}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-text-muted">
                          RATING:
                        </span>
                        {RatingStars(rating)}
                      </div>
                    </div>

                    {/* Footer: Acquire Button */}
                    <Link
                      href={`/armory/${post.slug}`}
                      className="block w-full text-center px-4 py-2 border-2 border-primary bg-transparent text-primary font-mono text-sm uppercase tracking-wider hover:bg-primary hover:text-background transition-all duration-200"
                    >
                      [ ACQUIRE ]
                    </Link>
                  </div>
                </div>
              )
            })}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={paginatedResult.page}
              totalPages={paginatedResult.totalPages}
              hasNext={paginatedResult.hasNext}
              hasPrev={paginatedResult.hasPrev}
              contentType="armory"
            />
          </>
        )}
      </div>
    </div>
  )
}

