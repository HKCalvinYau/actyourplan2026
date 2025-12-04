import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllSlugs } from '@/lib/mdx'
import { Calendar, Tag, Eye, Code } from 'lucide-react'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import ViewTracker from '@/components/ViewTracker'

// 生成靜態路徑
export async function generateStaticParams() {
  const slugs = getAllSlugs('experiments')
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

// 生成 metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug('experiments', params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | EXPERIMENTS`,
    description: post.description,
  }
}

export default function ExperimentPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = getPostBySlug('experiments', params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <ViewTracker type="experiments" slug={params.slug} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 返回按鈕 */}
        <Link
          href="/experiments"
          className="inline-flex items-center gap-2 text-text-muted font-mono text-sm mb-8 hover:text-primary transition-colors"
        >
          <span>&lt;</span>
          <span>BACK TO EXPERIMENTS</span>
        </Link>

        {/* 文章標題 */}
        <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-6 text-primary">
          {post.title}
        </h1>

        {/* 文章元數據 */}
        <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b-2 border-border">
          <div className="flex items-center gap-2 text-text-muted font-mono text-sm">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.date).toLocaleDateString('zh-TW', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</span>
          </div>
          
          {/* 閱讀量統計 */}
          <div className="flex items-center gap-4">
            {post.views !== undefined && (
              <div className="flex items-center gap-2 text-text-muted font-mono text-sm">
                <Eye className="w-4 h-4" />
                <span>Views: {post.views}</span>
              </div>
            )}
            {post.realViews !== undefined && (
              <div className="flex items-center gap-2 text-primary font-mono text-sm">
                <Eye className="w-4 h-4" />
                <span>Real Views: {post.realViews}</span>
              </div>
            )}
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-text-muted" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-surface border border-border text-text-muted font-mono text-xs uppercase hover:border-primary hover:text-primary transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 技術棧 */}
        {post.stack && (
          <div className="mb-8 p-4 bg-surface border-2 border-border">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-primary" />
              <h2 className="font-heading font-bold uppercase text-lg text-primary">
                TECH STACK
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.stack.split(',').map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-background border border-border text-text-muted font-mono text-xs"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 描述 */}
        {post.description && (
          <div className="mb-8 p-4 bg-surface border-l-4 border-primary">
            <p className="text-text-muted font-mono text-sm">
              // {post.description}
            </p>
          </div>
        )}

        {/* 文章內容 */}
        <article className="prose prose-invert prose-green max-w-none">
          <div className="text-text-main font-body leading-relaxed">
            {/* MDX 內容 */}
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeHighlight, rehypeRaw],
                },
              }}
            />
          </div>
        </article>
      </div>
    </div>
  )
}

