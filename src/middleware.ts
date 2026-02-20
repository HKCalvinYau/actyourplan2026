import { defineMiddleware } from 'astro:middleware';
import { locales, defaultLocale, type Locale } from './lib/i18n';

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;
  
  // 檢查是否以語言代碼開頭
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0] as Locale;

  if (locales.includes(firstSegment)) {
    // 設定當前語言
    context.locals.locale = firstSegment;
    
    // 如果是預設語言 (zh-TW)，通常不顯示前綴，這裡做個重定向去掉前綴 (SEO 友善)
    if (firstSegment === defaultLocale) {
      return context.redirect(`/${segments.slice(1).join('/')}${context.url.search}`);
    }

    // 重寫路徑以匹配 src/pages 下的檔案
    // 例如 /en/blueprints -> /blueprints
    // 注意：這裡使用 rewrite，瀏覽器 URL 不變，但 Astro 內部路由會匹配到對應頁面
    const newPath = `/${segments.slice(1).join('/')}`;
    return context.rewrite(newPath);
  }

  // 如果沒有語言前綴，設為預設語言
  context.locals.locale = defaultLocale;
  return next();
});

