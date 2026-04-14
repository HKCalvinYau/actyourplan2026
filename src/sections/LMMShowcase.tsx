import { Check, MessageSquare, Search, Share2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Language } from '@/types';

interface LMMShowcaseProps {
  language: Language;
}

const processSteps = [
  {
    icon: Search,
    title: 'Entity Analysis',
    titleZh: '實體分析',
    description: 'Map your brand\'s digital footprint across the knowledge graph.',
    descriptionZh: '在知識圖譜中映射您品牌的數位足跡。',
  },
  {
    icon: Share2,
    title: 'Citation Building',
    titleZh: '引用建立',
    description: 'Establish authoritative references on high-trust platforms.',
    descriptionZh: '在高信任平台上建立權威引用。',
  },
  {
    icon: MessageSquare,
    title: 'Content Alignment',
    titleZh: '內容對齊',
    description: 'Optimize content for LLM comprehension and retrieval.',
    descriptionZh: '針對 LLM 理解和檢索優化內容。',
  },
  {
    icon: Sparkles,
    title: 'Presence Monitoring',
    titleZh: '存在監控',
    description: 'Track and improve how AI systems reference your brand.',
    descriptionZh: '追踪並改善 AI 系統引用您品牌的方式。',
  },
];

const benefits = [
  { en: 'Increased AI citations', zh: '增加 AI 引用' },
  { en: 'Better brand visibility', zh: '更好的品牌可見度' },
  { en: 'Higher trust signals', zh: '更高的信任信號' },
  { en: 'Competitive advantage', zh: '競爭優勢' },
];

export function LMMShowcase({ language }: LMMShowcaseProps) {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="lmm-seo" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm text-cyan-400 mb-4">
            {language === 'zh' ? 'LMM SEO' : 'LMM SEO'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {language === 'zh' ? (
              <>
                在生成式 AI 中
                <span className="text-gradient"> 被看見</span>
              </>
            ) : (
              <>
                Be Seen in
                <span className="text-gradient"> Generative AI</span>
              </>
            )}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'zh'
              ? '當用戶詢問 ChatGPT、Claude 或 Gemini 時，您的品牌會被提及嗎？我們幫助您優化在大型語言模型中的存在。'
              : 'When users ask ChatGPT, Claude, or Gemini, is your brand mentioned? We help you optimize your presence in Large Language Models.'}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden glass-strong glow-cyan">
              <img
                src="/images/lmm-seo.jpg"
                alt="LMM SEO Visualization"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/60 via-transparent to-navy-950/40" />
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 px-6 py-4 rounded-xl glass-strong">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-400">85%</p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'zh' ? '準確率提升' : 'Accuracy Boost'}
                  </p>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-400">3x</p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'zh' ? '引用增加' : 'More Citations'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <h3 className="text-2xl font-bold mb-4">
              {language === 'zh'
                ? '什麼是生成式引擎優化 (GEO)？'
                : 'What is Generative Engine Optimization?'}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {language === 'zh'
                ? 'GEO 是 SEO 的進化版，專為生成式 AI 時代設計。傳統 SEO 專注於搜尋引擎排名，而 GEO 確保您的品牌被 AI 系統準確理解、信任和引用。'
                : 'GEO is the evolution of SEO for the generative AI era. While traditional SEO focuses on search engine rankings, GEO ensures your brand is accurately understood, trusted, and cited by AI systems.'}
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 rounded-lg glass"
                >
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-sm">
                    {language === 'zh' ? benefit.zh : benefit.en}
                  </span>
                </div>
              ))}
            </div>

            <Button
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-navy-950 font-semibold"
              onClick={() => scrollToSection('#contact')}
            >
              {language === 'zh' ? '獲取 GEO 評估' : 'Get GEO Assessment'}
            </Button>
          </div>
        </div>

        {/* Process Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <div
              key={step.title}
              className="relative p-6 rounded-2xl glass hover:glass-strong transition-all duration-300 group"
            >
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-navy-950 font-bold text-sm">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                <step.icon className="w-6 h-6 text-cyan-400" />
              </div>

              {/* Content */}
              <h4 className="font-semibold mb-2">
                {language === 'zh' ? step.titleZh : step.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'zh' ? step.descriptionZh : step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
