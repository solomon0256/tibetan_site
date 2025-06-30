// notion-proxy/src/index.ts
export default {
  async fetch(request: Request): Promise<Response> {
    const NOTION_API_TOKEN = "你的 Notion Token";
    const NOTION_VERSION = "2022-06-28";

    const url = new URL(request.url);
    const target = `https://api.notion.com${url.pathname}${url.search}`;
    const method = request.method;

    const headers = {
      "Authorization": `Bearer ${NOTION_API_TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json"
    };

    const body = method !== "GET" ? await request.text() : null;

    const notionRes = await fetch(target, {
      method,
      headers,
      body
    });

    const resBody = await notionRes.text();

    return new Response(resBody, {
      status: notionRes.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    });
  }
}