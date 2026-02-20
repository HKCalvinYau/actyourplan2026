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

// 本地開發用的假資料
const mockPosts: Post[] = [
  {
    id: 1,
    slug: 'local-test-blueprint',
    type: 'blueprints',
    title: '本地測試：戰略藍圖範例',
    content: '# 這是一篇本地測試文章\n\n如果你看到這篇，代表 Astro 運作正常。',
    metadata: JSON.stringify({ rank: 'CDR', status: 'Draft', tags: ['test', 'local'] }),
    created_at: Date.now(),
    updated_at: Date.now(),
  },
  {
    id: 2,
    slug: 'local-test-armory',
    type: 'armory',
    title: '本地測試：數位軍火庫',
    content: '測試 Armory 列表渲染。',
    metadata: JSON.stringify({ rank: 'SGT', rating: 5, tags: ['tool'] }),
    created_at: Date.now() - 100000,
    updated_at: Date.now(),
  },
  {
    id: 3,
    slug: 'local-test-signal',
    type: 'signals',
    title: '本地測試：情報訊號',
    content: '測試 Signals 列表渲染。',
    metadata: JSON.stringify({ rank: 'PVT', source: 'Internal', tags: ['news'] }),
    created_at: Date.now() - 200000,
    updated_at: Date.now(),
  }
];

export async function getPosts(db: D1Database | undefined | null, type: string) {
  // 1. 如果完全沒 DB (環境變數沒設)，回傳 Mock
  if (!db) {
    console.warn('⚠️ No D1 Database found (null/undefined). Using mock data.');
    return mockPosts.filter(p => p.type === type);
  }

  try {
    const { results } = await db
      .prepare('SELECT * FROM posts WHERE type = ? ORDER BY created_at DESC')
      .bind(type)
      .all<Post>();
    
    // 2. 如果 DB 存在但查不到任何資料，且是在本地開發環境 (通常可以透過 hostname 或其他 flag 判斷，這裡先簡單判斷長度)
    // 注意：這會導致剛上線還沒寫文章時也顯示 Mock Data，這可能不是你要的。
    // 所以我們只在 process.env.NODE_ENV === 'development' 時這樣做
    if (results.length === 0 && import.meta.env.DEV) {
       console.warn('⚠️ D1 Database empty in DEV mode. Using mock data.');
       return mockPosts.filter(p => p.type === type);
    }

    return results;
  } catch (e) {
    console.error('Database error:', e);
    // 3. 如果查詢報錯 (例如 table not found)，回傳 Mock
    if (import.meta.env.DEV) {
      return mockPosts.filter(p => p.type === type);
    }
    return [];
  }
}

export async function getPost(db: D1Database | undefined | null, slug: string) {
  if (!db) {
    return mockPosts.find(p => p.slug === slug);
  }

  try {
    const post = await db
      .prepare('SELECT * FROM posts WHERE slug = ?')
      .bind(slug)
      .first<Post>();
    
    if (!post && import.meta.env.DEV) {
      return mockPosts.find(p => p.slug === slug);
    }
    return post;
  } catch (e) {
    if (import.meta.env.DEV) {
      return mockPosts.find(p => p.slug === slug);
    }
    return null;
  }
}

export async function createPost(db: D1Database | undefined | null, post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
  if (!db) {
    console.log('📝 Local Create Post (Mock):', post);
    mockPosts.push({
      ...post,
      id: mockPosts.length + 1,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
    return { success: true };
  }

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

export async function updatePost(db: D1Database | undefined | null, id: number, post: Partial<Post>) {
  if (!db) {
    console.log('📝 Local Update Post (Mock):', id, post);
    const index = mockPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockPosts[index] = { ...mockPosts[index], ...post, updated_at: Date.now() };
      return { success: true };
    }
    return { success: false, error: 'Post not found' };
  }

  // 建構動態 UPDATE 語句
  const fields: string[] = [];
  const values: any[] = [];
  
  if (post.slug) { fields.push('slug = ?'); values.push(post.slug); }
  if (post.type) { fields.push('type = ?'); values.push(post.type); }
  if (post.title) { fields.push('title = ?'); values.push(post.title); }
  if (post.content) { fields.push('content = ?'); values.push(post.content); }
  if (post.metadata) { fields.push('metadata = ?'); values.push(post.metadata); }
  
  fields.push('updated_at = ?');
  values.push(Date.now());
  
  values.push(id); // for WHERE id = ?

  if (fields.length === 0) return { success: true }; // Nothing to update

  return await db
    .prepare(`UPDATE posts SET ${fields.join(', ')} WHERE id = ?`)
    .bind(...values)
    .run();
}

export async function deletePost(db: D1Database | undefined | null, id: number) {
  if (!db) {
    console.log('🗑️ Local Delete Post (Mock):', id);
    const index = mockPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockPosts.splice(index, 1);
      return { success: true };
    }
    return { success: false, error: 'Post not found' };
  }

  return await db
    .prepare('DELETE FROM posts WHERE id = ?')
    .bind(id)
    .run();
}

export async function getAllPosts(db: D1Database | undefined | null) {
  if (!db) {
    return mockPosts;
  }

  try {
    const { results } = await db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all<Post>();
    if (results.length === 0 && import.meta.env.DEV) {
      return mockPosts;
    }
    return results;
  } catch (e) {
    if (import.meta.env.DEV) return mockPosts;
    return [];
  }
}
