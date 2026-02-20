import type { APIRoute } from 'astro';
import { updatePost, deletePost } from '../../../lib/d1';

function isAuthenticated(request: Request) {
  const cookieHeader = request.headers.get('Cookie') || '';
  return cookieHeader.includes('admin_session=true');
}

export const PUT: APIRoute = async ({ locals, request, params }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const id = Number(params.id);
  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
  }

  try {
    const body = await request.json();
    const result = await updatePost(locals.runtime?.env?.DB, id, body);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ locals, request, params }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const id = Number(params.id);
  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
  }

  try {
    const result = await deletePost(locals.runtime?.env?.DB, id);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
};

