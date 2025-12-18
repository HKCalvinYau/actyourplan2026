import type { D1Database } from '@cloudflare/workers-types';

// 定義文章結構
export interface Post {
  id: number;
  slug: string;
  type: 'blueprints' | 'armory' | 'signals' | 'experiments';
  title: string;
  content: string; // Markdown 內容
  metadata: string; // JSON 字串，存 tags, rank, status 等
  created_at: number;
  updated_at: number;
}

export async function getPosts(db: D1Database, type: string) {
  const { results } = await db
    .prepare('SELECT * FROM posts WHERE type = ? ORDER BY created_at DESC')
    .bind(type)
    .all<Post>();
  return results;
}

export async function getPost(db: D1Database, slug: string) {
  return await db
    .prepare('SELECT * FROM posts WHERE slug = ?')
    .bind(slug)
    .first<Post>();
}

export async function createPost(db: D1Database, post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
  return await db
    .prepare(
      'INSERT INTO posts (slug, type, title, content, metadata, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
    )
    .bind(
      post.slug,
      post.type,
      post.title,
      post.content,
      post.metadata,
      Date.now(),
      Date.now()
    )
    .run();
}

