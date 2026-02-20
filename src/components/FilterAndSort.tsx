import { useState, useEffect } from 'react'

interface FilterAndSortProps {
  categories: Array<{ slug: string; name: string }>
  tags: string[]
  contentType: 'blueprints' | 'armory' | 'signals' | 'experiments'
}

export default function FilterAndSort({ categories, tags, contentType }: FilterAndSortProps) {
  const [params, setParams] = useState<URLSearchParams | null>(null)

  useEffect(() => {
    setParams(new URLSearchParams(window.location.search))
  }, [])

  // 如果還沒拿到 URL 參數，就不顯示或顯示預設
  if (!params) return null

  const currentCategory = params.get('category') || ''
  const currentRank = params.get('rank') || ''
  const currentTag = params.get('tag') || ''
  const currentSortBy = params.get('sortBy') || 'date'
  const currentSortOrder = params.get('sortOrder') || 'desc'

  const updateParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(window.location.search)
    if (value) {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }
    // 重置頁碼
    newParams.delete('page')
    
    // Astro 是 MPA，直接刷新頁面
    window.location.href = `/${contentType}?${newParams.toString()}`
  }

  return (
    <div className="bg-surface border-2 border-border p-6 mb-8">
      <div className="flex flex-wrap items-center gap-4">
        {/* 分類篩選 */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2">
            <label className="font-mono text-xs text-text-muted uppercase">
              Category:
            </label>
            <select
              value={currentCategory}
              onChange={(e) => updateParams('category', e.target.value)}
              className="px-3 py-2 bg-background border border-border text-text-main font-mono text-sm focus:border-primary focus:outline-none"
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 軍階/主題篩選 */}
        <div className="flex items-center gap-2">
          <label className="font-mono text-xs text-text-muted uppercase">
            Rank:
          </label>
          <select
            value={currentRank}
            onChange={(e) => updateParams('rank', e.target.value)}
            className="px-3 py-2 bg-background border border-border text-text-main font-mono text-sm focus:border-primary focus:outline-none"
          >
            <option value="">All</option>
            <option value="PVT">🔰 PVT (新兵)</option>
            <option value="SGT">🎖️ SGT (士官)</option>
            <option value="CDR">⭐️ CDR (指揮官)</option>
          </select>
        </div>

        {/* 標籤篩選 */}
        {tags.length > 0 && (
          <div className="flex items-center gap-2">
            <label className="font-mono text-xs text-text-muted uppercase">
              Tag:
            </label>
            <select
              value={currentTag}
              onChange={(e) => updateParams('tag', e.target.value)}
              className="px-3 py-2 bg-background border border-border text-text-main font-mono text-sm focus:border-primary focus:outline-none"
            >
              <option value="">All</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 排序方式 */}
        <div className="flex items-center gap-2 ml-auto">
          <label className="font-mono text-xs text-text-muted uppercase">
            Sort:
          </label>
          <select
            value={currentSortBy}
            onChange={(e) => updateParams('sortBy', e.target.value)}
            className="px-3 py-2 bg-background border border-border text-text-main font-mono text-sm focus:border-primary focus:outline-none"
          >
            <option value="date">Date</option>
            <option value="views">Views</option>
          </select>
          <select
            value={currentSortOrder}
            onChange={(e) => updateParams('sortOrder', e.target.value)}
            className="px-3 py-2 bg-background border border-border text-text-main font-mono text-sm focus:border-primary focus:outline-none"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>

        {/* 清除篩選 */}
        {(currentCategory || currentRank || currentTag) && (
          <button
            onClick={() => {
              window.location.href = `/${contentType}`
            }}
            className="px-4 py-2 border border-border text-text-muted font-mono text-xs uppercase hover:border-primary hover:text-primary transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  )
}

