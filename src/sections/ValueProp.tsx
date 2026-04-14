import { Brain, Database, Globe, Shield, Target, Zap } from 'lucide-react';
import type { Language } from '@/types';

interface ValuePropProps {
  language: Language;
}

const values = [
  {
    icon: Brain,
    title: 'AI-Native Thinking',
    titleZh: 'AI 原生思維',
    description:
      'We dont just use AI tools—we think in AI. Every strategy is designed with generative models in mind from day one.',
    descriptionZh:
      '我們不只是使用 AI 工具——我們以 AI 思維思考。每個策略從第一天起就考慮到生成式模型。',
  },
  {
    icon: Database,
    title: 'Data-Driven Decisions',
    titleZh: '數據驅動決策',
    description:
      'Every recommendation is backed by comprehensive data analysis and real-world performance metrics.',
    descriptionZh:
      '每個建議都有全面的數據分析和真實世界績效指標的支持。',
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    titleZh: '全球視野',
    description:
      'Operating across APAC, North America, and Europe, we bring international best practices to your business.',
    descriptionZh:
      '跨越亞太、北美和歐洲運營，我們為您的業務帶來國際最佳實踐。',
  },
  {
    icon: Target,
    title: 'Results Focused',
    titleZh: '結果導向',
    description:
      'We measure success by your ROI, not vanity metrics. Every campaign is optimized for tangible business outcomes.',
    descriptionZh:
      '我們以您的投資回報率衡量成功，而非虛榮指標。每個活動都針對具體業務成果進行優化。',
  },
  {
    icon: Shield,
    title: 'Future-Proof Strategy',
    titleZh: '面向未來的策略',
    description:
      'The AI landscape evolves rapidly. Our strategies are built to adapt and thrive as technology advances.',
    descriptionZh:
      'AI 領域快速發展。我們的策略旨在隨著技術進步而適應和蓬勃發展。',
  },
  {
    icon: Zap,
    title: 'Rapid Execution',
    titleZh: '快速執行',
    description:
      'From strategy to implementation in weeks, not months. Our agile approach ensures you stay ahead of competitors.',
    descriptionZh:
      '從策略到實施只需數週，而非數月。我們的敏捷方法確保您保持領先競爭對手。',
  },
];

export function ValueProp({ language }: ValuePropProps) {
  return (
    <section id="why-us" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm text-cyan-400 mb-4">
            {language === 'zh' ? '為何選擇我們' : 'Why Choose Us'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {language === 'zh' ? (
              <>
                數據驅動
                <span className="text-gradient"> AI 優先</span>
              </>
            ) : (
              <>
                Data-Driven,
                <span className="text-gradient"> AI-First</span>
              </>
            )}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'zh'
              ? '我們結合深厚的技術專業知識與商業敏銳度，交付可衡量的成果。'
              : 'We combine deep technical expertise with business acumen to deliver measurable results.'}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group relative p-6 rounded-2xl glass hover:glass-strong transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500" />

              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-colors">
                  <value.icon className="w-6 h-6 text-cyan-400" />
                </div>

                {/* Text */}
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'zh' ? value.titleZh : value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {language === 'zh' ? value.descriptionZh : value.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl glass-strong">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-background flex items-center justify-center"
                >
                  <span className="text-navy-950 text-xs font-bold">{i}</span>
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium">
                {language === 'zh' ? '加入 50+ 滿意客戶' : 'Join 50+ Satisfied Clients'}
              </p>
              <p className="text-xs text-muted-foreground">
                {language === 'zh' ? '開始您的 AI 轉型之旅' : 'Start your AI transformation journey'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
