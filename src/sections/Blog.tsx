import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Language, BlogPost } from '@/types';

interface BlogProps {
  language: Language;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of SEO in the Age of Generative AI',
    titleZh: '生成式 AI 時代的 SEO 未來',
    excerpt:
      'How Large Language Models are reshaping search and what businesses need to do to stay visible in the new landscape.',
    excerptZh:
      '大型語言模型如何重塑搜尋，以及企業需要做些什麼才能在新環境中保持可見度。',
    category: 'LMM SEO',
    categoryZh: 'LMM SEO',
    date: '2024-04-10',
    readTime: '8 min',
    slug: 'future-of-seo-generative-ai',
  },
  {
    id: '2',
    title: 'Building Entity Authority for AI Citations',
    titleZh: '為 AI 引用建立實體權威',
    excerpt:
      'A comprehensive guide to establishing your brand as a trusted source that AI systems consistently reference.',
    excerptZh:
      '一份全面指南，幫助您將品牌建立為 AI 系統持續引用的可信賴來源。',
    category: 'Strategy',
    categoryZh: '策略',
    date: '2024-04-05',
    readTime: '12 min',
    slug: 'building-entity-authority',
  },
  {
    id: '3',
    title: 'AI-Powered Marketing Automation: A 2024 Guide',
    titleZh: 'AI 驅動的行銷自動化：2024 指南',
    excerpt:
      'Practical strategies for implementing AI automation in your marketing workflows without losing the human touch.',
    excerptZh:
      '在您的行銷工作流程中實施 AI 自動化的實用策略，同時不失去人性化。',
    category: 'Digital Marketing',
    categoryZh: '數位行銷',
    date: '2024-03-28',
    readTime: '10 min',
    slug: 'ai-marketing-automation-guide',
  },
  {
    id: '4',
    title: 'From Plan to Action: Business Transformation Framework',
    titleZh: '從計劃到行動：業務轉型框架',
    excerpt:
      'Our proven methodology for helping enterprises successfully navigate digital transformation initiatives.',
    excerptZh:
      '我們經過驗證的方法論，幫助企業成功應對數位轉型計劃。',
    category: 'Consulting',
    categoryZh: '顧問',
    date: '2024-03-20',
    readTime: '15 min',
    slug: 'business-transformation-framework',
  },
  {
    id: '5',
    title: 'Understanding GPTBot and AI Crawlers',
    titleZh: '理解 GPTBot 和 AI 爬蟲',
    excerpt:
      'Technical deep dive into how AI systems crawl, index, and retrieve information about your business.',
    excerptZh:
      '深入探討 AI 系統如何爬取、索引和檢索有關您業務的資訊。',
    category: 'Technical',
    categoryZh: '技術',
    date: '2024-03-15',
    readTime: '7 min',
    slug: 'understanding-gptbot-ai-crawlers',
  },
  {
    id: '6',
    title: 'Case Study: 300% ROI with LMM SEO',
    titleZh: '案例研究：LMM SEO 實現 300% ROI',
    excerpt:
      'How we helped a B2B SaaS company dramatically increase their AI presence and qualified leads.',
    excerptZh:
      '我們如何幫助一家 B2B SaaS 公司顯著增加其 AI 存在和合格潛在客戶。',
    category: 'Case Study',
    categoryZh: '案例研究',
    date: '2024-03-08',
    readTime: '6 min',
    slug: 'case-study-300-roi-lmm-seo',
  },
];

export function Blog({ language }: BlogProps) {
  return (
    <section id="blog" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full glass text-sm text-cyan-400 mb-4">
              {language === 'zh' ? '知識庫' : 'Knowledge Base'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              {language === 'zh' ? (
                <>
                  最新
                  <span className="text-gradient"> 洞察</span>
                </>
              ) : (
                <>
                  Latest
                  <span className="text-gradient"> Insights</span>
                </>
              )}
            </h2>
          </div>
          <Button variant="outline" className="border-white/20 hover:bg-white/5 self-start sm:self-auto">
            {language === 'zh' ? '查看全部文章' : 'View All Articles'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="group relative rounded-2xl glass overflow-hidden hover:shadow-glow transition-all duration-500 flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header with Category */}
              <div className="p-6 pb-0">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs">
                    <Tag className="w-3 h-3" />
                    {language === 'zh' ? post.categoryZh : post.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {language === 'zh' ? post.titleZh : post.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {language === 'zh' ? post.excerptZh : post.excerpt}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-auto p-6 pt-0">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="w-full justify-between group/btn hover:bg-cyan-500/10 hover:text-cyan-400"
                >
                  <span>{language === 'zh' ? '閱讀更多' : 'Read More'}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 p-8 rounded-2xl glass-strong relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[64px]" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">
                {language === 'zh' ? '訂閱我們的電子報' : 'Subscribe to Our Newsletter'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'zh'
                  ? '獲取最新的 AI 行銷和商業策略洞察。'
                  : 'Get the latest insights on AI marketing and business strategies.'}
              </p>
            </div>
            
            <div className="flex gap-3">
              <input
                type="email"
                placeholder={language === 'zh' ? '輸入您的電郵' : 'Enter your email'}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 w-full sm:w-64"
              />
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-navy-950 font-semibold whitespace-nowrap">
                {language === 'zh' ? '訂閱' : 'Subscribe'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
