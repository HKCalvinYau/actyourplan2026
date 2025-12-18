// 動態生成 sitemap.xml

import { MetadataRoute } from 'next'
import { getAllPostsAllTypes } from '@/lib/mdx-edge'
import { locales, defaultLocale } from '@/lib/i18n'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://actyourplan.com'
  
  // 獲取所有文章
  const allPosts = await getAllPostsAllTypes()
  
  // 基本頁面
  const staticPages = [
    '',
    '/blueprints',
    '/armory',
    '/signals',
    '/experiments',
  ]
  
  // 生成所有語言的靜態頁面
  const staticRoutes: MetadataRoute.Sitemap = []
  
  // 預設語言（無前綴）
  staticPages.forEach((path) => {
    staticRoutes.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? 'daily' : 'weekly',
      priority: path === '' ? 1 : 0.8,
    })
  })
  
  // 其他語言
  locales
    .filter(locale => locale !== defaultLocale)
    .forEach((locale) => {
      staticPages.forEach((path) => {
        staticRoutes.push({
          url: `${baseUrl}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: path === '' ? 'daily' : 'weekly',
          priority: path === '' ? 0.9 : 0.7,
        })
      })
    })
  
  // 生成文章頁面
  const postRoutes: MetadataRoute.Sitemap = []
  
  allPosts.forEach((post) => {
    const postPath = `/${post.contentType}/${post.slug}`
    const postDate = post.date ? new Date(post.date) : new Date()
    
    // 預設語言
    postRoutes.push({
      url: `${baseUrl}${postPath}`,
      lastModified: postDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
    
    // 其他語言
    locales
      .filter(locale => locale !== defaultLocale)
      .forEach((locale) => {
        postRoutes.push({
          url: `${baseUrl}/${locale}${postPath}`,
          lastModified: postDate,
          changeFrequency: 'monthly',
          priority: 0.5,
        })
      })
  })
  
  return [...staticRoutes, ...postRoutes]
}

