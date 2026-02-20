import type { APIRoute } from 'astro';

const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD || 'admin123';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { password } = body;

    if (password === ADMIN_PASSWORD) {
      // 簡單的 Session Cookie
      // 在真實生產環境，建議使用更安全的 Token 機制 (JWT / Session ID)
      // 這裡為了展示方便，直接設一個標記
      const headers = new Headers();
      headers.append('Set-Cookie', `admin_session=true; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`); // 1 day

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers,
      });
    }

    return new Response(JSON.stringify({ success: false, message: 'Invalid password' }), {
      status: 401,
    });
  } catch (e) {
    return new Response(JSON.stringify({ success: false, message: 'Server error' }), {
      status: 500,
    });
  }
};

