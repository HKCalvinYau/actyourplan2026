import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Language } from '@/types';

interface ContactProps {
  language: Language;
}

export function Contact({ language }: ContactProps) {
  return (
    <section id="contact" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm text-cyan-400 mb-4">
            {language === 'zh' ? '聯繫我們' : 'Contact Us'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {language === 'zh' ? (
              <>
                準備好
                <span className="text-gradient"> 開始了嗎？</span>
              </>
            ) : (
              <>
                Ready to
                <span className="text-gradient"> Get Started?</span>
              </>
            )}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'zh'
              ? '預約免費諮詢，了解我們如何幫助您的業務在 AI 時代蓬勃發展。'
              : 'Book a free consultation to learn how we can help your business thrive in the AI era.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="p-8 rounded-2xl glass-strong">
            <h3 className="text-xl font-bold mb-6">
              {language === 'zh' ? '發送訊息' : 'Send a Message'}
            </h3>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === 'zh' ? '姓名' : 'Name'}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-colors"
                    placeholder={language === 'zh' ? '您的姓名' : 'Your name'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === 'zh' ? '公司' : 'Company'}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-colors"
                    placeholder={language === 'zh' ? '您的公司' : 'Your company'}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'zh' ? '電郵' : 'Email'}
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-colors"
                  placeholder={language === 'zh' ? 'your@email.com' : 'your@email.com'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'zh' ? '服務興趣' : 'Service Interest'}
                </label>
                <select className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none cursor-pointer">
                  <option value="">
                    {language === 'zh' ? '選擇服務' : 'Select a service'}
                  </option>
                  <option value="lmm-seo">
                    {language === 'zh' ? 'LMM SEO' : 'LMM SEO'}
                  </option>
                  <option value="digital-marketing">
                    {language === 'zh' ? '數位行銷' : 'Digital Marketing'}
                  </option>
                  <option value="business-consultant">
                    {language === 'zh' ? '商業顧問' : 'Business Consultant'}
                  </option>
                  <option value="other">
                    {language === 'zh' ? '其他' : 'Other'}
                  </option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'zh' ? '訊息' : 'Message'}
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                  placeholder={language === 'zh' ? '告訴我們您的需求...' : 'Tell us about your needs...'}
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-navy-950 font-semibold"
              >
                {language === 'zh' ? '發送訊息' : 'Send Message'}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-6">
                {language === 'zh' ? '聯繫資訊' : 'Contact Information'}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">
                      {language === 'zh' ? '電郵' : 'Email'}
                    </p>
                    <a
                      href="mailto:info@actyourplan.com"
                      className="text-muted-foreground hover:text-cyan-400 transition-colors"
                    >
                      info@actyourplan.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">
                      {language === 'zh' ? '電話' : 'Phone'}
                    </p>
                    <a
                      href="tel:+85212345678"
                      className="text-muted-foreground hover:text-cyan-400 transition-colors"
                    >
                      +852 1234 5678
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">
                      {language === 'zh' ? '地址' : 'Address'}
                    </p>
                    <p className="text-muted-foreground">
                      {language === 'zh'
                        ? '香港中環金融街 8 號'
                        : '8 Finance Street, Central, Hong Kong'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="mt-8 p-6 rounded-xl glass">
              <p className="font-medium mb-3">
                {language === 'zh' ? '工作時間' : 'Working Hours'}
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>{language === 'zh' ? '週一至週五' : 'Monday - Friday'}</span>
                  <span>09:00 - 18:00 (HKT)</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'zh' ? '週六' : 'Saturday'}</span>
                  <span>10:00 - 14:00 (HKT)</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'zh' ? '週日' : 'Sunday'}</span>
                  <span>{language === 'zh' ? '休息' : 'Closed'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
