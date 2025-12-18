import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
  contentType: 'blueprints' | 'armory' | 'signals' | 'experiments'
}

export default function Pagination({
  currentPage,
  totalPages,
  hasNext,
  hasPrev,
  contentType,
}: PaginationProps) {
  const navigateToPage = (page: number) => {
    // Client-side only
    if (typeof window === 'undefined') return;

    const searchParams = new URLSearchParams(window.location.search)
    if (page === 1) {
      searchParams.delete('page')
    } else {
      searchParams.set('page', page.toString())
    }
    window.location.href = `/${contentType}?${searchParams.toString()}`
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {/* 上一頁 */}
      <button
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={!hasPrev}
        className={`px-4 py-2 border-2 font-mono text-sm uppercase transition-all ${
          hasPrev
            ? 'border-primary text-primary hover:bg-primary hover:text-background'
            : 'border-border text-text-muted cursor-not-allowed'
        }`}
      >
        <ChevronLeft className="w-4 h-4 inline mr-1" />
        Prev
      </button>

      {/* 頁碼顯示 */}
      <div className="flex items-center gap-2 font-mono text-sm text-text-main">
        <span>Page</span>
        <span className="text-primary font-bold">{currentPage}</span>
        <span>of</span>
        <span className="text-primary font-bold">{totalPages}</span>
      </div>

      {/* 下一頁 */}
      <button
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={!hasNext}
        className={`px-4 py-2 border-2 font-mono text-sm uppercase transition-all ${
          hasNext
            ? 'border-primary text-primary hover:bg-primary hover:text-background'
            : 'border-border text-text-muted cursor-not-allowed'
        }`}
      >
        Next
        <ChevronRight className="w-4 h-4 inline ml-1" />
      </button>
    </div>
  )
}

