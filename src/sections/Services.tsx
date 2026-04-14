import { Search, Megaphone, Briefcase, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Language } from '@/types';

interface ServicesProps {
  language: Language;
}

const services = [
  {
    id: 'lmm-seo',
    icon: Search,
    title: 'LMM SEO',
    titleZh: 'LMM SEO',
    subtitle: 'Generative Engine Optimization',
    subtitleZh: '生成式引擎優化',
    description:
      'Optimize your brand presence across Large Language Models. We ensure your business is accurately cited and recommended by AI systems like ChatGPT, Claude, and Gemini.',
    descriptionZh:
      '在大型語言模型中優化您的品牌存在。我們確保您的業務被 ChatGPT、Claude 和 Gemini 等 AI 系統準確引用和推薦。',
    features: [
      'Entity Authority Building',
      'Knowledge Graph Optimization',
      'Citation Strategy',
      'AI Content Alignment',
    ],
    featuresZh: ['實體權威建立', '知識圖譜優化', '引用策略', 'AI 內容對齊'],
    image: '/images/lmm-seo.jpg',
  },
  {
    id: 'digital-marketing',
    icon: Megaphone,
    title: 'Digital Marketing',
    titleZh: '數位行銷',
    subtitle: 'Cross-Platform Conversion',
    subtitleZh: '跨平台轉化',
    description:
      'Data-driven marketing strategies that span across all digital touchpoints. From social media to search engines, we maximize your ROI with AI-powered insights.',
    descriptionZh:
      '跨越所有數位接觸點的數據驅動行銷策略。從社交媒體到搜尋引擎，我們以 AI 驅動的洞察最大化您的投資回報。',
    features: [
      'Performance Marketing',
      'Social Media Strategy',
      'Content Marketing',
      'Analytics & Attribution',
    ],
    featuresZh: ['績效行銷', '社交媒體策略', '內容行銷', '分析與歸因'],
    image: '/images/digital-marketing.jpg',
  },
  {
    id: 'business-consultant',
    icon: Briefcase,
    title: 'Business Consultant',
    titleZh: '商業顧問',
    subtitle: 'AI Integration & Automation',
    subtitleZh: 'AI 整合與自動化',
    description:
      'Transform your business operations with intelligent automation. We help enterprises integrate AI into their core processes for sustainable competitive advantage.',
    descriptionZh:
      '以智能自動化轉型您的業務運營。我們幫助企業將 AI 整合到核心流程中，以獲得可持續的競爭優勢。',
    features: [
      'Process Automation',
      'AI Strategy Roadmap',
      'Digital Transformation',
      'Change Management',
    ],
    featuresZh: ['流程自動化', 'AI 策略路線圖', '數位轉型', '變革管理'],
    image: '/images/business-consultant.jpg',
  },
];

export function Services({ language }: ServicesProps) {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm text-cyan-400 mb-4">
            {language === 'zh' ? '我們的服務' : 'Our Services'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {language === 'zh' ? (
              <>
                三大核心業務
                <span className="text-gradient"> 驅動增長</span>
              </>
            ) : (
              <>
                Three Pillars of
                <span className="text-gradient"> Growth</span>
              </>
            )}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'zh'
              ? '從 AI 優化到數位行銷，再到商業轉型，我們提供端到端的解決方案。'
              : 'From AI optimization to digital marketing and business transformation, we provide end-to-end solutions.'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative rounded-2xl glass overflow-hidden hover:shadow-glow transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                    <service.icon className="w-6 h-6 text-navy-950" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{language === 'zh' ? service.titleZh : service.title}</h3>
                <p className="text-sm text-cyan-400 mb-4">{language === 'zh' ? service.subtitleZh : service.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                  {language === 'zh' ? service.descriptionZh : service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {(language === 'zh' ? service.featuresZh : service.features).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant="ghost"
                  className="w-full justify-between group/btn hover:bg-cyan-500/10 hover:text-cyan-400"
                  onClick={() => scrollToSection(`#${service.id}-detail`)}
                >
                  <span>{language === 'zh' ? '了解更多' : 'Learn More'}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
