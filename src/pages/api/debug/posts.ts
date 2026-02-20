import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  const { DB } = locals.runtime.env;
  
  try {
    const { results } = await DB.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();
    return new Response(JSON.stringify(results, null, 2), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
  }
};

