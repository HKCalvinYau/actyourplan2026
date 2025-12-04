import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import yaml from 'js-yaml'

// 內容類型
export type ContentType = 'blueprints' | 'armory' | 'signals' | 'experiments'

// Frontmatter 介面
export interface FrontMatter {
  title: string
  date: string
  description: string
  tags: string[]
  rank?: 'PVT' | 'SGT' | 'CDR' // 軍階徽章：PVT (二等兵), SGT (士官), CDR (指揮官)
  specs?: Record<string, string> // 規格表（用於 Blueprints 和 Armory）
  [key: string]: any // 允許其他額外欄位
}

// 文章元數據（包含 slug）
export interface PostMeta extends FrontMatter {
  slug: string
  contentType: ContentType
}

// 文章完整內容（包含原始內容）
export interface Post extends PostMeta {
  content: string
}

// 內容資料夾路徑
const contentDirectory = path.join(process.cwd(), 'content')

/**
 * 讀取標籤名稱（從 tags collection）
 */
function getTagName(slug: string): string {
  const tagPath = path.join(contentDirectory, 'tags', `${slug}.yaml`)
  if (fs.existsSync(tagPath)) {
    try {
      const tagContent = fs.readFileSync(tagPath, 'utf8')
      const tagData = yaml.load(tagContent) as any
      return tagData?.name || slug
    } catch (error) {
      return slug
    }
  }
  return slug
}

/**
 * 處理 tags 陣列（支援 relationship slug 和字串格式）
 */
function processTags(tags: any): string[] {
  if (!tags) return []
  if (!Array.isArray(tags)) {
    tags = [tags]
  }
  // 將 slug 轉換為名稱，如果是字串則保持不變
  return tags.map((tag: any) => {
    if (typeof tag === 'string') {
      // 嘗試讀取 tag collection，如果不存在則返回原值
      const tagName = getTagName(tag)
      return tagName
    }
    return String(tag)
  })
}

/**
 * 從 slug 生成人性化的標題
 */
function generateTitleFromSlug(slug: string): string {
  // 處理駝峰命名（CamelCase）或 PascalCase
  // 例如: "TestingBlueprint" -> "Testing Blueprint"
  // 例如: "testing-blueprint" -> "Testing Blueprint"
  // 例如: "testing_blueprint" -> "Testing Blueprint"
  
  // 先處理連字號和下劃線
  if (slug.includes('-') || slug.includes('_')) {
    return slug
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }
  
  // 處理駝峰命名：在小寫字母和大寫字母之間插入空格
  // 例如: "TestingBlueprint" -> "Testing Blueprint"
  // 使用更精確的正則：匹配小寫字母後跟大寫字母的情況
  // 但要注意不要分割已經是大寫開頭的單詞（如 "Testing"）
  let result = slug.replace(/([a-z])([A-Z])/g, '$1 $2')
  
  // 如果結果還是沒有空格（全大寫或全小寫），嘗試另一種方法
  if (result === slug && /^[A-Z]/.test(slug)) {
    // PascalCase: 在大寫字母開頭的單詞之間插入空格
    // 例如: "TestingBlueprint" -> "Testing Blueprint"
    // 匹配：大寫字母+小寫字母後跟大寫字母+小寫字母（如 "Testing" + "Blueprint"）
    result = slug.replace(/([A-Z][a-z]+)([A-Z][a-z]+)/g, '$1 $2')
  }
  
  // 將每個單詞首字母大寫，其餘小寫
  return result
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map((word) => {
      // 如果整個單詞都是大寫，保持原樣但首字母大寫
      if (word === word.toUpperCase() && word.length > 1) {
        return word.charAt(0) + word.slice(1).toLowerCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')
}

/**
 * 讀取 Keystatic 格式的文章（.yaml + .mdoc）
 */
function readKeystaticPost(
  typeDirectory: string,
  folderName: string
): { data: any; content: string } | null {
  const yamlPath = path.join(typeDirectory, `${folderName}.yaml`)
  const mdocPath = path.join(typeDirectory, folderName, 'content.mdoc')

  // 檢查檔案是否存在
  if (!fs.existsSync(yamlPath) || !fs.existsSync(mdocPath)) {
    return null
  }

  try {
    // 讀取 YAML 檔案（metadata）
    const yamlContent = fs.readFileSync(yamlPath, 'utf8')
    const data = yaml.load(yamlContent) as any

    // 如果沒有 title，從 slug 生成
    if (!data.title || data.title.trim() === '') {
      data.title = generateTitleFromSlug(folderName)
    }

    // 讀取 MDOC 檔案（內容）
    const content = fs.readFileSync(mdocPath, 'utf8')

    // 處理日期格式（從 Date 物件或字串轉換為 YYYY-MM-DD 格式）
    if (data.date) {
      if (data.date instanceof Date) {
        // Date 物件：轉換為 YYYY-MM-DD 格式
        const year = data.date.getFullYear()
        const month = String(data.date.getMonth() + 1).padStart(2, '0')
        const day = String(data.date.getDate()).padStart(2, '0')
        data.date = `${year}-${month}-${day}`
      } else if (typeof data.date === 'string') {
        // 字串：如果是 ISO 格式，提取日期部分
        if (data.date.includes('T')) {
          data.date = data.date.split('T')[0]
        }
        // 確保格式是 YYYY-MM-DD
        const dateMatch = data.date.match(/^(\d{4})-(\d{2})-(\d{2})/)
        if (dateMatch) {
          data.date = dateMatch[0]
        }
      }
    }

    // 處理 tags（支援 relationship slug 和字串格式）
    data.tags = processTags(data.tags)

    // 確保必要的欄位有預設值
    if (!data.description) {
      data.description = ''
    }

    return { data, content }
  } catch (error) {
    console.error(`Error reading Keystatic post ${folderName}:`, error)
    return null
  }
}

/**
 * 讀取傳統 MDX 格式的文章
 */
function readMdxPost(
  typeDirectory: string,
  fileName: string
): { data: any; content: string } | null {
  const fullPath = path.join(typeDirectory, fileName)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    return { data, content }
  } catch (error) {
    console.error(`Error reading MDX post ${fileName}:`, error)
    return null
  }
}

/**
 * 獲取指定類型的所有文章元數據
 */
export function getAllPosts(type: ContentType): PostMeta[] {
  const typeDirectory = path.join(contentDirectory, type)
  
  // 檢查資料夾是否存在
  if (!fs.existsSync(typeDirectory)) {
    return []
  }

  const allPostsData: PostMeta[] = []
  const fileNames = fs.readdirSync(typeDirectory, { withFileTypes: true })

  const processedSlugs = new Set<string>()

  for (const file of fileNames) {
    let slug: string
    let postData: { data: any; content: string } | null = null

    if (file.isDirectory()) {
      // 這是 Keystatic 格式的資料夾（.yaml + .mdoc）
      slug = file.name
      // 檢查是否已經處理過（避免重複）
      if (processedSlugs.has(slug)) {
        continue
      }
      postData = readKeystaticPost(typeDirectory, file.name)
      if (postData) {
        processedSlugs.add(slug)
      }
    } else if (file.name.endsWith('.mdx')) {
      // 這是傳統的 MDX 檔案
      slug = file.name.replace(/\.mdx$/, '')
      // 檢查是否已經處理過（避免與 Keystatic 格式重複）
      if (processedSlugs.has(slug)) {
        continue
      }
      postData = readMdxPost(typeDirectory, file.name)
      if (postData) {
        processedSlugs.add(slug)
      }
    } else if (file.name.endsWith('.yaml')) {
      // 這是 Keystatic 的 YAML 檔案，檢查是否有對應的資料夾
      const folderName = file.name.replace(/\.yaml$/, '')
      const folderPath = path.join(typeDirectory, folderName)
      if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
        // 如果資料夾存在，會在 isDirectory() 分支處理，這裡跳過
        continue
      } else {
        // 單獨的 YAML 檔案（不支援，跳過）
        continue
      }
    } else {
      continue // 跳過其他檔案
    }

    if (postData) {
      allPostsData.push({
        slug,
        contentType: type,
        ...postData.data,
      } as PostMeta)
    }
  }

  // 按日期排序（最新的在前）
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

/**
 * 獲取所有文章（跨所有類型）
 */
export function getAllPostsAllTypes(): PostMeta[] {
  const types: ContentType[] = ['blueprints', 'armory', 'signals', 'experiments']
  const allPosts: PostMeta[] = []

  types.forEach((type) => {
    const posts = getAllPosts(type)
    allPosts.push(...posts)
  })

  // 按日期排序
  return allPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

/**
 * 獲取指定類型和 slug 的單篇文章
 */
export function getPostBySlug(
  type: ContentType,
  slug: string
): Post | null {
  const typeDirectory = path.join(contentDirectory, type)

  // 先嘗試讀取 Keystatic 格式（.yaml + .mdoc）
  const keystaticPost = readKeystaticPost(typeDirectory, slug)
  if (keystaticPost) {
    return {
      slug,
      contentType: type,
      ...keystaticPost.data,
      content: keystaticPost.content,
    } as Post
  }

  // 再嘗試讀取傳統 MDX 格式
  const mdxPath = path.join(typeDirectory, `${slug}.mdx`)
  if (fs.existsSync(mdxPath)) {
    const mdxPost = readMdxPost(typeDirectory, `${slug}.mdx`)
    if (mdxPost) {
      return {
        slug,
        contentType: type,
        ...mdxPost.data,
        content: mdxPost.content,
      } as Post
    }
  }

  return null
}

/**
 * 獲取所有可用的 slug（用於動態路由）
 */
export function getAllSlugs(type: ContentType): string[] {
  const typeDirectory = path.join(contentDirectory, type)
  
  if (!fs.existsSync(typeDirectory)) {
    return []
  }

  const slugs: string[] = []
  const fileNames = fs.readdirSync(typeDirectory, { withFileTypes: true })

  for (const file of fileNames) {
    if (file.isDirectory()) {
      // Keystatic 格式的資料夾
      const yamlPath = path.join(typeDirectory, `${file.name}.yaml`)
      const mdocPath = path.join(typeDirectory, file.name, 'content.mdoc')
      if (fs.existsSync(yamlPath) && fs.existsSync(mdocPath)) {
        slugs.push(file.name)
      }
    } else if (file.name.endsWith('.mdx')) {
      // 傳統 MDX 檔案
      slugs.push(file.name.replace(/\.mdx$/, ''))
    }
  }

  return slugs
}

/**
 * 根據標籤篩選文章
 */
export function getPostsByTag(type: ContentType, tag: string): PostMeta[] {
  const allPosts = getAllPosts(type)
  return allPosts.filter((post) => post.tags?.includes(tag))
}

/**
 * 搜尋文章（根據標題和描述）
 */
export function searchPosts(type: ContentType, query: string): PostMeta[] {
  const allPosts = getAllPosts(type)
  const lowerQuery = query.toLowerCase()

  return allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.description?.toLowerCase().includes(lowerQuery)
  )
}

/**
 * 篩選和排序選項
 */
export interface FilterSortOptions {
  category?: string // 分類
  rank?: string // 軍階/主題 (PVT, SGT, CDR)
  tag?: string // 標籤
  sortBy?: 'date' | 'views' // 排序方式：日期或閱讀量
  sortOrder?: 'asc' | 'desc' // 排序順序：升序或降序
}

/**
 * 篩選和排序文章
 */
export function filterAndSortPosts(
  type: ContentType,
  options: FilterSortOptions = {}
): PostMeta[] {
  let posts = getAllPosts(type)

  // 篩選：分類
  if (options.category) {
    posts = posts.filter((post) => {
      // category 可能是字串或物件（relationship）
      const postCategory = typeof post.category === 'string' 
        ? post.category 
        : (post.category as any)?.slug || post.category
      return postCategory === options.category
    })
  }

  // 篩選：軍階/主題
  if (options.rank) {
    posts = posts.filter((post) => post.rank === options.rank)
  }

  // 篩選：標籤
  if (options.tag) {
    posts = posts.filter((post) => 
      post.tags?.some((tag) => {
        const tagName = typeof tag === 'string' ? tag : (tag as any)?.name || tag
        return tagName === options.tag || tag === options.tag
      })
    )
  }

  // 排序
  const sortBy = options.sortBy || 'date'
  const sortOrder = options.sortOrder || 'desc'

  posts.sort((a, b) => {
    let comparison = 0

    if (sortBy === 'date') {
      comparison = a.date.localeCompare(b.date)
    } else if (sortBy === 'views') {
      const aViews = a.views || a.realViews || 0
      const bViews = b.views || b.realViews || 0
      comparison = aViews - bViews
    }

    return sortOrder === 'asc' ? comparison : -comparison
  })

  return posts
}

/**
 * 分頁結果
 */
export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

/**
 * 分頁處理
 */
export function paginate<T>(
  items: T[],
  page: number = 1,
  pageSize: number = 10
): PaginatedResult<T> {
  const total = items.length
  const totalPages = Math.ceil(total / pageSize)
  const currentPage = Math.max(1, Math.min(page, totalPages))
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedItems = items.slice(startIndex, endIndex)

  return {
    items: paginatedItems,
    total,
    page: currentPage,
    pageSize,
    totalPages,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  }
}

/**
 * 獲取所有可用的分類（從 categories collection）
 */
export function getAllCategories(type?: ContentType): Array<{ slug: string; name: string }> {
  const categoriesPath = path.join(contentDirectory, 'categories')
  if (!fs.existsSync(categoriesPath)) {
    return []
  }

  const categories: Array<{ slug: string; name: string; type?: string }> = []
  const files = fs.readdirSync(categoriesPath)

  for (const file of files) {
    if (file.endsWith('.yaml')) {
      try {
        const filePath = path.join(categoriesPath, file)
        const content = fs.readFileSync(filePath, 'utf8')
        const data = yaml.load(content) as any
        const slug = file.replace(/\.yaml$/, '')
        
        // 如果指定了 type，只返回該類型的分類
        if (!type || data.type === type) {
          categories.push({
            slug,
            name: data.name || slug,
            type: data.type,
          })
        }
      } catch (error) {
        console.error(`Error reading category ${file}:`, error)
      }
    }
  }

  return categories
}

/**
 * 獲取所有可用的標籤（從 tags collection）
 */
export function getAllTags(): Array<{ slug: string; name: string }> {
  const tagsPath = path.join(contentDirectory, 'tags')
  if (!fs.existsSync(tagsPath)) {
    return []
  }

  const tags: Array<{ slug: string; name: string }> = []
  const files = fs.readdirSync(tagsPath)

  for (const file of files) {
    if (file.endsWith('.yaml')) {
      try {
        const filePath = path.join(tagsPath, file)
        const content = fs.readFileSync(filePath, 'utf8')
        const data = yaml.load(content) as any
        const slug = file.replace(/\.yaml$/, '')
        tags.push({
          slug,
          name: data.name || slug,
        })
      } catch (error) {
        console.error(`Error reading tag ${file}:`, error)
      }
    }
  }

  return tags
}

/**
 * 獲取所有文章中的唯一標籤（從實際文章數據中提取）
 */
export function getUniqueTagsFromPosts(type: ContentType): string[] {
  const posts = getAllPosts(type)
  const tagSet = new Set<string>()

  posts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        const tagName = typeof tag === 'string' ? tag : (tag as any)?.name || String(tag)
        if (tagName) {
          tagSet.add(tagName)
        }
      })
    }
  })

  return Array.from(tagSet).sort()
}

