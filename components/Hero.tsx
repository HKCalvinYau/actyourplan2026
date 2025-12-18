'use client'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* 背景動畫：雷達掃描效果 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(34,197,94,0.1)_100%)] animate-pulse"></div>
        
        {/* 數據流動效果 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-1 h-32 bg-primary/30 animate-flow"></div>
            <div className="absolute top-1/2 right-1/4 w-1 h-24 bg-primary/30 animate-flow-delay-1"></div>
            <div className="absolute bottom-1/4 left-1/2 w-1 h-40 bg-primary/30 animate-flow-delay-2"></div>
          </div>
        </div>

        {/* 雷達掃描圓圈 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 border border-primary/20 rounded-full animate-radar"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-primary/20 rounded-full animate-radar-fast"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-primary/20 rounded-full animate-radar-faster"></div>
        </div>
      </div>

      {/* 內容 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold uppercase mb-6 text-primary leading-tight">
          BUILD YOUR BASE.
          <br />
          ACT YOUR PLAN.
        </h1>
        
        <p className="text-xl md:text-2xl text-text-muted font-mono mb-12 max-w-3xl mx-auto">
          Survival Protocols for the Digital Age.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="btn-tactical btn-tactical-primary text-lg px-8 py-4">
            &gt; ENTER THE BASE
          </button>
          <button className="btn-tactical text-lg px-8 py-4">
            VIEW PROTOCOLS
          </button>
        </div>
      </div>
    </section>
  )
}

