import { ArrowRight, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Language } from '@/types';

interface HeroProps {
  language: Language;
}

export function Hero({ language }: HeroProps) {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-muted-foreground">
                {language === 'zh'
                  ? 'AI 驅動的商業轉型專家'
                  : 'AI-Driven Business Transformation'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up">
              {language === 'zh' ? (
                <>
                  為生成式 AI 時代
                  <br />
                  <span className="text-gradient">優化您的品牌</span>
                </>
              ) : (
                <>
                  Optimize for the
                  <br />
                  <span className="text-gradient">Era of Generative AI</span>
                </>
              )}
            </h1>

            {/* Subheading */}
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {language === 'zh'
                ? 'ACTYOURPLAN 是全球領先的 LMM SEO 與 AI 商業策略顧問，幫助企業在 ChatGPT、Claude 等生成式 AI 平台中建立權威形象。'
                : 'ACTYOURPLAN is a leading global consultancy specializing in LMM SEO and AI-driven business strategies, helping brands establish authority across generative AI platforms.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-navy-950 font-semibold group"
                onClick={() => scrollToSection('#services')}
              >
                {language === 'zh' ? '探索服務' : 'Explore Services'}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/5"
                onClick={() => scrollToSection('#contact')}
              >
                {language === 'zh' ? '預約諮詢' : 'Book Consultation'}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span className="text-2xl font-bold">300%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {language === 'zh' ? '平均 ROI 提升' : 'Avg. ROI Increase'}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="text-2xl font-bold">50+</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {language === 'zh' ? '全球客戶' : 'Global Clients'}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-2xl font-bold">95+</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {language === 'zh' ? 'Lighthouse 評分' : 'Lighthouse Score'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-float hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden glass-strong glow-cyan">
              <img
                src="/images/hero-main.jpg"
                alt="AI Transformation"
                className="w-full h-auto object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 px-4 py-2 rounded-lg glass animate-pulse-slow">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium">AI Optimized</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-lg glass-strong">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <span className="text-navy-950 font-bold text-sm">A</span>
                </div>
                <div>
                  <p className="text-sm font-medium">ACTYOURPLAN</p>
                  <p className="text-xs text-muted-foreground">Cited in ChatGPT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
