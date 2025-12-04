import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Keystatic CMS | ACT YOUR PLAN',
}

// Keystatic 使用自己的佈局，不需要 Header 和 Footer
export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ minHeight: '100vh' }}>
      {children}
    </div>
  )
}

