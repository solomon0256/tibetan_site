import type { Env } from "./types/env";
import { ProgressDO } from "./objects/ProgressDO";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const id = env.PROGRESS_DO.idFromName("default");
    const stub = env.PROGRESS_DO.get(id);
    return stub.fetch(request);
  },
  DurableObjects: {
    ProgressDO,
  },
};
