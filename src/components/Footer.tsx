import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t-2 border-border bg-surface py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Left: Copyright & Status */}
          <div className="font-mono text-xs text-text-muted">
            <p>© {currentYear} ACT YOUR PLAN.</p>
            <p className="text-primary mt-1">SYSTEM STATUS: ALL SYSTEMS OPERATIONAL.</p>
          </div>

          {/* Center: Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs text-text-muted">
            <Link
              href="/rss"
              className="hover:text-primary transition-colors"
            >
              [ RSS FEED ]
            </Link>
            <span className="text-border">|</span>
            <Link
              href="mailto:contact@example.com"
              className="hover:text-primary transition-colors"
            >
              [ EMAIL PROTOCOL ]
            </Link>
            <span className="text-border">|</span>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              [ X / TWITTER ]
            </Link>
          </div>

          {/* Right: Tech Stack */}
          <div className="font-mono text-xs text-text-muted text-right">
            <p>BUILT WITH [NEXT.JS].</p>
            <p>DEPLOYED ON [CLOUDFLARE PAGES].</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

