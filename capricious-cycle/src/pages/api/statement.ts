// src/pages/api/statement.ts
export const prerender = false;
import type { APIRoute } from 'astro';

// GET 方法用于提供模拟数据响应，便于前端测试接口是否联通。
export const GET: APIRoute = async ({ request }) => {
  return new Response(
    JSON.stringify([
      {
        id: 'test-1',
        verb: { id: 'http://adlnet.gov/expapi/verbs/viewed', display: { 'en-US': 'viewed' } },
        actor: { name: 'test-user', mbox: 'mailto:test-user@example.com', objectType: 'Agent' },
        object: {
          id: 'http://example.com/course_home',
          objectType: 'Activity',
          definition: { name: { 'en-US': 'Course Home' } },
        },
        result: { success: true, score: { raw: 100 } },
        timestamp: new Date().toISOString(),
      },
    ]),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    }
  );
};

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('[xAPI] Received headers:', [...request.headers.entries()]);

    const contentType = request.headers.get('content-type') || '';
    if (!contentType.toLowerCase().startsWith('application/json')) {
      return new Response(
        JSON.stringify({ error: 'Expected application/json content type' }),
        { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
      );
    }

    const body: any = await request.json();
    console.log('[xAPI] 收到提交请求：', body);

    if (!body.actor || !body.verb || !body.object) {
      return new Response(
        JSON.stringify({ error: 'Missing required xAPI fields: actor, verb, object' }),
        { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'xAPI statement received' }),
      { status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
    );
  } catch (error) {
    console.error('[xAPI] JSON parse failed or invalid schema:', error);
    return new Response(
      JSON.stringify({ error: 'Invalid request' }),
      { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
    );
  }
};