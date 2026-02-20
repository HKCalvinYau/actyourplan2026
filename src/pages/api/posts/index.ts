import type { APIRoute } from 'astro';
import { getAllPosts, createPost } from '../../../lib/d1';

// 簡單的 Auth Check Helper
function isAuthenticated(request: Request) {
  const cookieHeader = request.headers.get('Cookie') || '';
  return cookieHeader.includes('admin_session=true');
}

export const GET: APIRoute = async ({ locals, request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const posts = await getAllPosts(locals.runtime?.env?.DB);
  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ locals, request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await request.json();
    // 簡單驗證
    if (!body.title || !body.slug) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const result = await createPost(locals.runtime?.env?.DB, body);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
};

