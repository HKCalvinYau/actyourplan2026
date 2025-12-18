// Edge Runtime 兼容版本的 mdx.ts
// 使用 GitHub API 讀取文件內容

import matter from 'gray-matter'
import yaml from 'js-yaml'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

// 內容類型
export type ContentType = 'blueprints' | 'armory' | 'signals' | 'experiments'

// Frontmatter 介面
export interface FrontMatter {
  title: string
  date: string
  description: string
  tags: string[]
  rank?: 'PVT' | 'SGT' | 'CDR'
  specs?: Record<string, string>
  [key: string]: any
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

// GitHub 配置
const GITHUB_OWNER = 'HKCalvinYau'
const GITHUB_REPO = 'actyourplan2026'
const GITHUB_BRANCH = 'main'
const CONTENT_PREFIX = 'content'

/**
 * 從 GitHub 讀取文件內容
 */
async function fetchFromGitHub(filePath: string): Promise<string | null> {
  try {
    const url = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${filePath}`
    const response = await fetch(url, {
      // Edge Runtime 使用標準的 cache 控制
      cache: 'force-cache', // 使用緩存以提高性能
    })
    
    if (!response.ok) {
      console.error(`Error fetching ${filePath} from GitHub: ${response.status} ${response.statusText}`)
      return null
    }
    
    return await response.text()
  } catch (error) {
    console.error(`Error fetching ${filePath} from GitHub:`, error)
    return null
  }
}

/**
 * 從 GitHub 獲取目錄列表
 */
async function listGitHubDirectory(dirPath: string): Promise<string[]> {
  try {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${dirPath}?ref=${GITHUB_BRANCH}`
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    }
    
    // 如果有 GitHub token，添加認證頭
    // 注意：在 Edge Runtime 中，環境變數需要通過 Cloudflare Pages 的環境變數設置
    // 暫時不使用 token，因為公開 repo 不需要認證
    // const token = process.env.GITHUB_TOKEN
    // if (token) {
    //   headers['Authorization'] = `token ${token}`
    // }
    
    const response = await fetch(url, {
      headers,
      // Edge Runtime 不支持 next.revalidate，使用 cache 控制
      cache: 'no-store', // 暫時禁用緩存以確保數據最新
    })
    
    if (!response.ok) {
      console.error(`GitHub API error for ${dirPath}: ${response.status} ${response.statusText}`)
      return []
    }
    
    const files = await response.json()
    return Array.isArray(files) ? files.map((file: any) => file.name) : []
  } catch (error) {
    console.error(`Error listing ${dirPath} from GitHub:`, error)
    return []
  }
}

/**
 * 讀取標籤名稱（從 tags collection）
 */
async function getTagName(slug: string): Promise<string> {
  const tagPath = `${CONTENT_PREFIX}/tags/${slug}.yaml`
  const tagContent = await fetchFromGitHub(tagPath)
  
  if (tagContent) {
    try {
      const tagData = yaml.load(tagContent) as any
      return tagData?.name || slug
    } catch (error) {
      return slug
    }
  }
  return slug
}

/**
 * 處理 tags 陣列
 */
async function processTags(tags: any): Promise<string[]> {
  if (!tags) return []
  if (!Array.isArray(tags)) {
    tags = [tags]
  }
  
  const processedTags = await Promise.all(
    tags.map(async (tag: any) => {
      if (typeof tag === 'string') {
        const tagName = await getTagName(tag)
        return tagName
      }
      return String(tag)
    })
  )
  
  return processedTags
}

/**
 * 從 slug 生成人性化的標題
 */
function generateTitleFromSlug(slug: string): string {
  if (slug.includes('-') || slug.includes('_')) {
    return slug
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }
  
  let result = slug.replace(/([a-z])([A-Z])/g, '$1 $2')
  
  if (result === slug && /^[A-Z]/.test(slug)) {
    result = slug.replace(/([A-Z][a-z]+)([A-Z][a-z]+)/g, '$1 $2')
  }
  
  return result
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map((word) => {
      if (word === word.toUpperCase() && word.length > 1) {
        return word.charAt(0) + word.slice(1).toLowerCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')
}

/**
 * 讀取 Keystatic 格式的文章
 */
async function readKeystaticPost(
  type: ContentType,
  folderName: string
): Promise<{ data: any; content: string } | null> {
  const yamlPath = `${CONTENT_PREFIX}/${type}/${folderName}.yaml`
  const mdocPath = `${CONTENT_PREFIX}/${type}/${folderName}/content.mdoc`

  const [yamlContent, mdocContent] = await Promise.all([
    fetchFromGitHub(yamlPath),
    fetchFromGitHub(mdocPath),
  ])

  if (!yamlContent || !mdocContent) {
    return null
  }

  try {
    const data = yaml.load(yamlContent) as any

    if (!data.title || data.title.trim() === '') {
      data.title = generateTitleFromSlug(folderName)
    }

    // 處理日期格式
    if (data.date) {
      if (data.date instanceof Date) {
        const year = data.date.getFullYear()
        const month = String(data.date.getMonth() + 1).padStart(2, '0')
        const day = String(data.date.getDate()).padStart(2, '0')
        data.date = `${year}-${month}-${day}`
      } else if (typeof data.date === 'string') {
        if (data.date.includes('T')) {
          data.date = data.date.split('T')[0]
        }
        const dateMatch = data.date.match(/^(\d{4})-(\d{2})-(\d{2})/)
        if (dateMatch) {
          data.date = dateMatch[0]
        }
      }
    }

    // 處理 tags
    data.tags = await processTags(data.tags)

    if (!data.description) {
      data.description = ''
    }

    return { data, content: mdocContent }
  } catch (error) {
    console.error(`Error reading Keystatic post ${folderName}:`, error)
    return null
  }
}

/**
 * 讀取傳統 MDX 格式的文章
 */
async function readMdxPost(
  type: ContentType,
  fileName: string
): Promise<{ data: any; content: string } | null> {
  const fullPath = `${CONTENT_PREFIX}/${type}/${fileName}`
  const fileContents = await fetchFromGitHub(fullPath)

  if (!fileContents) {
    return null
  }

  try {
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
export async function getAllPosts(type: ContentType): Promise<PostMeta[]> {
  try {
    const typeDirectory = `${CONTENT_PREFIX}/${type}`
    const fileNames = await listGitHubDirectory(typeDirectory)

    if (fileNames.length === 0) {
      console.warn(`No files found in ${typeDirectory}`)
      return []
    }

  const allPostsData: PostMeta[] = []
  const processedSlugs = new Set<string>()

  // 處理所有文件
  const postPromises = fileNames.map(async (fileName: string) => {
    let slug: string | null = null
    let postData: { data: any; content: string } | null = null

    if (fileName.endsWith('.yaml')) {
      // Keystatic YAML 文件，檢查是否有對應的資料夾
      const folderName = fileName.replace(/\.yaml$/, '')
      const folderFiles = await listGitHubDirectory(`${typeDirectory}/${folderName}`)
      if (folderFiles.includes('content.mdoc')) {
        slug = folderName
        if (!processedSlugs.has(slug)) {
          processedSlugs.add(slug)
          postData = await readKeystaticPost(type, folderName)
        }
      }
    } else if (fileName.endsWith('.mdx')) {
      // 傳統 MDX 文件
      slug = fileName.replace(/\.mdx$/, '')
      if (!processedSlugs.has(slug)) {
        processedSlugs.add(slug)
        postData = await readMdxPost(type, fileName)
      }
    } else {
      // 可能是資料夾
      const folderFiles = await listGitHubDirectory(`${typeDirectory}/${fileName}`)
      if (folderFiles.includes('content.mdoc')) {
        slug = fileName
        if (!processedSlugs.has(slug)) {
          processedSlugs.add(slug)
          postData = await readKeystaticPost(type, fileName)
        }
      }
    }

    if (postData && slug) {
      return {
        slug,
        contentType: type,
        ...postData.data,
      } as PostMeta
    }
    return null
  })

  const posts = await Promise.all(postPromises)
  const validPosts = posts.filter((post): post is PostMeta => post !== null)

    // 按日期排序
    return validPosts.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error(`Error getting all posts for ${type}:`, error)
    return []
  }
}

/**
 * 獲取所有文章（跨所有類型）
 */
export async function getAllPostsAllTypes(): Promise<PostMeta[]> {
  const types: ContentType[] = ['blueprints', 'armory', 'signals', 'experiments']
  const allPostsPromises = types.map((type) => getAllPosts(type))
  const allPostsArrays = await Promise.all(allPostsPromises)
  const allPosts = allPostsArrays.flat()

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
export async function getPostBySlug(
  type: ContentType,
  slug: string
): Promise<Post | null> {
  // 先嘗試讀取 Keystatic 格式
  const keystaticPost = await readKeystaticPost(type, slug)
  if (keystaticPost) {
    return {
      slug,
      contentType: type,
      ...keystaticPost.data,
      content: keystaticPost.content,
    } as Post
  }

  // 再嘗試讀取傳統 MDX 格式
  const mdxPost = await readMdxPost(type, `${slug}.mdx`)
  if (mdxPost) {
    return {
      slug,
      contentType: type,
      ...mdxPost.data,
      content: mdxPost.content,
    } as Post
  }

  return null
}

/**
 * 獲取所有可用的 slug
 */
export async function getAllSlugs(type: ContentType): Promise<string[]> {
  const typeDirectory = `${CONTENT_PREFIX}/${type}`
  const fileNames = await listGitHubDirectory(typeDirectory)

  const slugs: string[] = []
  const processedSlugs = new Set<string>()

  for (const fileName of fileNames) {
    if (fileName.endsWith('.yaml')) {
      const folderName = fileName.replace(/\.yaml$/, '')
      const folderFiles = await listGitHubDirectory(`${typeDirectory}/${folderName}`)
      if (folderFiles.includes('content.mdoc') && !processedSlugs.has(folderName)) {
        slugs.push(folderName)
        processedSlugs.add(folderName)
      }
    } else if (fileName.endsWith('.mdx')) {
      const slug = fileName.replace(/\.mdx$/, '')
      if (!processedSlugs.has(slug)) {
        slugs.push(slug)
        processedSlugs.add(slug)
      }
    } else {
      // 可能是資料夾
      const folderFiles = await listGitHubDirectory(`${typeDirectory}/${fileName}`)
      if (folderFiles.includes('content.mdoc') && !processedSlugs.has(fileName)) {
        slugs.push(fileName)
        processedSlugs.add(fileName)
      }
    }
  }

  return slugs
}

/**
 * 根據標籤篩選文章
 */
export async function getPostsByTag(type: ContentType, tag: string): Promise<PostMeta[]> {
  const allPosts = await getAllPosts(type)
  return allPosts.filter((post) => post.tags?.includes(tag))
}

/**
 * 搜尋文章
 */
export async function searchPosts(type: ContentType, query: string): Promise<PostMeta[]> {
  const allPosts = await getAllPosts(type)
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
  category?: string
  rank?: string
  tag?: string
  sortBy?: 'date' | 'views'
  sortOrder?: 'asc' | 'desc'
}

/**
 * 篩選和排序文章
 */
export async function filterAndSortPosts(
  type: ContentType,
  options: FilterSortOptions = {}
): Promise<PostMeta[]> {
  let posts = await getAllPosts(type)

  // 篩選：分類
  if (options.category) {
    posts = posts.filter((post) => {
      const postCategory = typeof post.category === 'string' 
        ? post.category 
        : (post.category as any)?.slug || post.category
      return postCategory === options.category
    })
  }

  // 篩選：軍階
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
 * 獲取所有可用的分類
 */
export async function getAllCategories(type?: ContentType): Promise<Array<{ slug: string; name: string }>> {
  try {
    const categoriesPath = `${CONTENT_PREFIX}/categories`
    const files = await listGitHubDirectory(categoriesPath)

    const categories: Array<{ slug: string; name: string; type?: string }> = []

    for (const file of files) {
      if (file.endsWith('.yaml')) {
        try {
          const filePath = `${categoriesPath}/${file}`
          const content = await fetchFromGitHub(filePath)
          if (content) {
            const data = yaml.load(content) as any
            const slug = file.replace(/\.yaml$/, '')
            
            if (!type || data.type === type) {
              categories.push({
                slug,
                name: data.name || slug,
                type: data.type,
              })
            }
          }
        } catch (error) {
          console.error(`Error reading category ${file}:`, error)
        }
      }
    }

    return categories
  } catch (error) {
    console.error('Error getting all categories:', error)
    return []
  }
}

/**
 * 獲取所有可用的標籤
 */
export async function getAllTags(): Promise<Array<{ slug: string; name: string }>> {
  const tagsPath = `${CONTENT_PREFIX}/tags`
  const files = await listGitHubDirectory(tagsPath)

  const tags: Array<{ slug: string; name: string }> = []

  for (const file of files) {
    if (file.endsWith('.yaml')) {
      try {
        const filePath = `${tagsPath}/${file}`
        const content = await fetchFromGitHub(filePath)
        if (content) {
          const data = yaml.load(content) as any
          const slug = file.replace(/\.yaml$/, '')
          tags.push({
            slug,
            name: data.name || slug,
          })
        }
      } catch (error) {
        console.error(`Error reading tag ${file}:`, error)
      }
    }
  }

  return tags
}

/**
 * 獲取所有文章中的唯一標籤
 */
export async function getUniqueTagsFromPosts(type: ContentType): Promise<string[]> {
  try {
    const posts = await getAllPosts(type)
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
  } catch (error) {
    console.error(`Error getting unique tags from posts for ${type}:`, error)
    return []
  }
}

/**
 * 將 MDX 內容轉換為 HTML（Edge Runtime 兼容）
 */
export async function mdxToHtml(mdxContent: string): Promise<string> {
  try {
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeHighlight)
      .use(rehypeStringify, { allowDangerousHtml: true })

    const result = await processor.process(mdxContent)
    return String(result)
  } catch (error) {
    console.error('Error converting MDX to HTML:', error)
    // 如果轉換失敗，返回原始內容（作為純文本）
    return `<pre>${mdxContent}</pre>`
  }
}

