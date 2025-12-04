import { Ruler, Package, Radio, FlaskConical } from 'lucide-react'

interface BaseModule {
  id: string
  letter: string
  title: string
  titleZh: string
  description: string
  descriptionZh: string
  icon: React.ReactNode
  href: string
}

const modules: BaseModule[] = [
  {
    id: 'blueprints',
    letter: 'B',
    title: 'BLUEPRINTS',
    titleZh: '戰略藍圖',
    description: '[STRATEGY] 解構經典書籍與商業模式。我們提取底層代碼 (Source Code)，重塑你的思維系統。',
    descriptionZh: '[STRATEGY] 解構經典書籍與商業模式。我們提取底層代碼 (Source Code)，重塑你的思維系統。',
    icon: <Ruler className="w-8 h-8" />,
    href: '/blueprints',
  },
  {
    id: 'armory',
    letter: 'A',
    title: 'ARMORY',
    titleZh: '數位軍火庫',
    description: '[WEAPONS] 工欲善其事，必先升級武器。評測最強 SaaS、AI 工具與自動化腳本。',
    descriptionZh: '[WEAPONS] 工欲善其事，必先升級武器。評測最強 SaaS、AI 工具與自動化腳本。',
    icon: <Package className="w-8 h-8" />,
    href: '/armory',
  },
  {
    id: 'signals',
    letter: 'S',
    title: 'SIGNALS',
    titleZh: '情報訊號',
    description: '[INTEL] 雜訊即敵人。過濾無效新聞，鎖定關鍵時事與科技趨勢的偵查報告。',
    descriptionZh: '[INTEL] 雜訊即敵人。過濾無效新聞，鎖定關鍵時事與科技趨勢的偵查報告。',
    icon: <Radio className="w-8 h-8" />,
    href: '/signals',
  },
  {
    id: 'experiments',
    letter: 'E',
    title: 'EXPERIMENTS',
    titleZh: '實驗室',
    description: '[BETA] 見證從 0 到 1 的構建過程。我的 Web App 開發日誌與 MVP 測試檔案。',
    descriptionZh: '[BETA] 見證從 0 到 1 的構建過程。我的 Web App 開發日誌與 MVP 測試檔案。',
    icon: <FlaskConical className="w-8 h-8" />,
    href: '/experiments',
  },
]

export default function BaseGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {modules.map((module) => (
            <a
              key={module.id}
              href={module.href}
              className="group relative bg-surface border-2 border-neutral-800 p-6 hover:border-primary transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            >
              {/* 角落裝飾 */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>

              {/* 內容 */}
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 border-2 border-primary flex items-center justify-center text-primary font-mono font-bold text-xl group-hover:bg-primary group-hover:text-background transition-all duration-300">
                    {module.letter}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                        {module.icon}
                      </div>
                      <h3 className="font-heading font-bold uppercase text-xl text-text-main">
                        {module.title}
                      </h3>
                    </div>
                    <p className="text-text-muted font-mono text-sm mb-2">
                      {module.titleZh}
                    </p>
                  </div>
                </div>

                <p className="text-text-muted font-mono text-sm leading-relaxed">
                  {module.descriptionZh}
                </p>

                {/* Hover 指示器 */}
                <div className="mt-4 flex items-center gap-2 text-primary font-mono text-xs uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>&gt;</span>
                  <span>ACCESS MODULE</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

