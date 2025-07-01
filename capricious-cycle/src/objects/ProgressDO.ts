
export class ProgressDO {
  state: DurableObjectState;
  storage: DurableObjectStorage;

  constructor(state: DurableObjectState, env: any) {
    this.state = state;
    this.storage = state.storage;
  }

  async fetch(request: Request) {
    const url = new URL(request.url);
    if (url.pathname === "/get") {
      const data = await this.storage.get("progress");
      return new Response(JSON.stringify({ progress: data }));
    }
    if (url.pathname === "/set" && request.method === "POST") {
      const { data } = await request.json() as { data: any };
      await this.storage.put("progress", data);
      return new Response("ok");
    }
    return new Response("Not found", { status: 404 });
  }
}
  