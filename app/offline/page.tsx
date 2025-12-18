export default function OfflinePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="text-4xl font-heading font-bold mb-4 text-primary font-mono">
          NO SIGNAL
        </h1>
        <p className="text-text-muted font-mono mb-8">
          您目前處於離線狀態
        </p>
        <p className="text-text-main font-mono text-sm">
          請檢查您的網路連線
        </p>
      </div>
    </main>
  )
}

