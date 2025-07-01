// src/types/env.d.ts
import type { ExecutionContext } from "@cloudflare/workers-types";

export interface Env {
  PROGRESS_DO: DurableObjectNamespace;

  // 可拓展绑定（暂未启用）：
  // MY_KV: KVNamespace;
  // R2_BUCKET: R2Bucket;
  // NOTION_TOKEN: string;
}