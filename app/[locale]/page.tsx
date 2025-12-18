import BaseGrid from '@/components/BaseGrid'
import ArticleCard from '@/components/ArticleCard'
import { getAllPostsAllTypes } from '@/lib/mdx-edge'
import { getTranslations, locales, type Locale } from '@/lib/i18n'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const validLocale = (locales.includes(locale as Locale) ? locale : 'zh-TW') as Locale
  const t = getTranslations(validLocale)
  
  // 獲取所有文章並按日期排序（最新的在前）
  const allPosts = await getAllPostsAllTypes()
  
  // 取最新的 3 篇文章
  const latestPosts = allPosts.slice(0, 3)
  
  // 將文章類型轉換為顯示格式
  const getTypeLabel = (contentType: string) => {
    const typeMap: Record<string, string> = {
      blueprints: 'BLUEPRINTS',
      armory: 'ARMORY',
      signals: 'SIGNALS',
      experiments: 'EXPERIMENTS',
    }
    return typeMap[contentType] || contentType.toUpperCase()
  }
  
  // 生成文章連結
  const getPostHref = (contentType: string, slug: string) => {
    const basePath = `/${contentType}/${slug}`
    // 如果不是預設語言，添加語言前綴
    if (validLocale !== 'zh-TW') {
      return `/${validLocale}${basePath}`
    }
    return basePath
  }
  
  return (
    <main>
      {/* Section A: Hero (首屏) */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-surface">
        {/* 網格線背景 */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          ></div>
        </div>

        {/* 內容 */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Headline (H1) */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 text-white leading-tight">
            {t.home.hero.headline1}
            <br />
            <span className="uppercase">{t.home.hero.headline2}</span>
            <br className="hidden lg:block" />
            <span className="hidden lg:inline text-4xl md:text-5xl lg:text-6xl">{t.home.hero.headline3}</span>
          </h1>

          {/* Sub-headline */}
          <div className="text-gray-400 font-mono text-lg md:text-xl mb-12 max-w-4xl mx-auto">
            <p className="mb-2">
              <strong>{t.home.hero.subtitle}</strong>
            </p>
            <p>
              {t.home.hero.description}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary Button */}
            <button className="px-8 py-4 bg-primary text-background font-mono text-lg uppercase tracking-wider hover:bg-primary/90 transition-all duration-200 border-2 border-primary">
              [ &gt; {t.home.hero.cta1} ]
            </button>
            
            {/* Secondary Button */}
            <button className="px-8 py-4 border-2 border-primary bg-transparent text-primary font-mono text-lg uppercase tracking-wider hover:bg-primary hover:text-background transition-all duration-200">
              [ {t.home.hero.cta2} ]
            </button>
          </div>
        </div>
      </section>

      {/* 新增區塊 1: THE GLITCH */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-mono font-bold uppercase mb-8 text-yellow-500">
            {t.home.glitch.title}
          </h2>
          <div className="font-mono text-text-main text-sm md:text-base leading-relaxed space-y-4">
            <p>{t.home.glitch.question}</p>
            <div className="space-y-2 text-text-muted">
              {t.home.glitch.points.map((point, index) => (
                <p key={index}>{point}</p>
              ))}
            </div>
            <p className="text-red-500 font-bold mt-6">
              {t.home.glitch.error}
            </p>
            <p className="text-text-main mt-6">
              {t.home.glitch.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Section B: The B.A.S.E. Grid (核心功能矩陣) */}
      <BaseGrid />

      {/* Section C: Latest Intel (最新訊號) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold uppercase mb-12 text-primary font-mono">
            {t.home.transmissions.title}
          </h2>

          {/* 終端機風格列表 */}
          <div className="bg-surface border-2 border-border p-6 font-mono text-sm">
            {latestPosts.length === 0 ? (
              <div className="text-text-muted text-center py-8">
                {t.home.transmissions.noPosts}
              </div>
            ) : (
              <div className="space-y-3">
                {latestPosts.map((post) => (
                  <ArticleCard
                    key={`${post.contentType}-${post.slug}`}
                    slug={post.slug}
                    title={post.title}
                    date={post.date}
                    type={getTypeLabel(post.contentType)}
                    rank={post.rank || 'PVT'}
                    href={getPostHref(post.contentType, post.slug)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 新增區塊 2: OPERATOR PROFILE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-mono font-bold uppercase mb-8 text-primary text-center">
            {t.home.operator.title}
          </h2>
          
          <div className="bg-surface border-2 border-border p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Left Col: Stats */}
              <div className="font-mono text-sm space-y-4">
                <div className="border-b border-border pb-2">
                  <span className="text-text-muted">{t.home.operator.realWorldRank}</span>{' '}
                  <span className="text-text-main">Commander (老闆/實業家)</span>
                </div>
                <div className="border-b border-border pb-2">
                  <span className="text-text-muted">{t.home.operator.digitalRank}</span>{' '}
                  <span className="text-yellow-500">Private (二等兵/初學者)</span>
                </div>
                <div className="border-b border-border pb-2">
                  <span className="text-text-muted">{t.home.operator.weapon}</span>{' '}
                  <span className="text-primary">AI (My Exoskeleton)</span>
                </div>
                <div className="border-b border-border pb-2">
                  <span className="text-text-muted">{t.home.operator.status}</span>{' '}
                  <span className="text-primary">Leveling Up...</span>
                </div>
              </div>

              {/* Right Col: Story */}
              <div className="font-mono text-sm text-text-main leading-relaxed">
                {t.home.operator.story.map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 新增區塊 3: SECURE COMMS & SPECS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background border-t-2 border-border">
        <div className="max-w-4xl mx-auto">
          {/* Part A: Newsletter (Secure Comms) */}
          <div className="mb-16 text-center">
            <h2 className="text-2xl md:text-3xl font-mono font-bold uppercase mb-4 text-primary">
              {t.home.newsletter.title}
            </h2>
            <p className="font-mono text-text-muted text-sm mb-8">
              {t.home.newsletter.description}
            </p>
            
            {/* 終端機風格輸入框 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              <div className="relative flex-1 w-full">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary font-mono text-sm">
                  &gt;
                </span>
                <input
                  type="email"
                  placeholder={t.home.newsletter.placeholder}
                  className="w-full pl-8 pr-4 py-3 bg-surface border-2 border-border text-text-main font-mono text-sm focus:border-primary focus:outline-none"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary font-mono animate-blink">
                  _
                </span>
              </div>
              <button className="px-6 py-3 border-2 border-primary bg-transparent text-primary font-mono text-sm uppercase tracking-wider hover:bg-primary hover:text-background transition-all duration-200 whitespace-nowrap">
                [ {t.home.newsletter.button} ]
              </button>
            </div>
          </div>

          {/* Part B: System Specs (Tech Stack Marquee) */}
          <div className="border-t-2 border-border pt-12">
            <p className="text-center font-mono text-text-muted text-xs uppercase mb-6 tracking-wider">
              {t.home.techStack.title}
            </p>
            
            {/* Marquee 容器 */}
            <div className="marquee-container">
              <div className="marquee-content">
                {/* 第一組 */}
                <span className="font-mono text-text-muted text-sm">NOTION</span>
                <span className="font-mono text-text-muted text-sm">NEXT.JS</span>
                <span className="font-mono text-text-muted text-sm">PYTHON</span>
                <span className="font-mono text-text-muted text-sm">OBSIDIAN</span>
                <span className="font-mono text-text-muted text-sm">TAILWIND</span>
                <span className="font-mono text-text-muted text-sm">CLOUDFLARE</span>
                {/* 重複一組以實現無縫循環 */}
                <span className="font-mono text-text-muted text-sm">NOTION</span>
                <span className="font-mono text-text-muted text-sm">NEXT.JS</span>
                <span className="font-mono text-text-muted text-sm">PYTHON</span>
                <span className="font-mono text-text-muted text-sm">OBSIDIAN</span>
                <span className="font-mono text-text-muted text-sm">TAILWIND</span>
                <span className="font-mono text-text-muted text-sm">CLOUDFLARE</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

// Edge Runtime 不支持 generateStaticParams，使用動態渲染
// export function generateStaticParams() {
//   return locales
//     .filter(locale => locale !== 'zh-TW') // 預設語言不需要前綴
//     .map((locale) => ({
//       locale,
//     }))
// }

