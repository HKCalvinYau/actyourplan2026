import { useState, useCallback, useEffect } from 'react';
import type { Language } from '@/types';

const STORAGE_KEY = 'actyourplan-language';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY) as Language;
      if (stored) return stored;
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('zh')) return 'zh';
    }
    return 'en';
  });

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === 'en' ? 'zh' : 'en';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const setLang = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-HK' : 'en';
  }, [language]);

  const t = useCallback(
    (en: string, zh: string) => {
      return language === 'zh' ? zh : en;
    },
    [language]
  );

  return {
    language,
    toggleLanguage,
    setLang,
    t,
    isEnglish: language === 'en',
    isChinese: language === 'zh',
  };
}
