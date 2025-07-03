// src/types/env.d.ts
import type { ExecutionContext } from "@cloudflare/workers-types";
// 在任何使用到 env 的文件（如 statement.ts）顶部加：
import type { Env } from '@/types/env';  // 或相对路径 ./types/env
export interface Env {
  PROGRESS_DO: DurableObjectNamespace;

  LRS_DB: D1Database;
  TIBETAN_KV: KVNamespace;
  R2_COURSE: R2Bucket;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  NOTION_API_KEY: string;
  NOTION_DATABASE_ID: string;
  KV_NAMESPACE_ID: string;
  R2_BUCKET_NAME: string;
  D1_DATABASE_ID: string;

  // 可拓展绑定（暂未启用）：
  // MY_KV: KVNamespace;
  // R2_BUCKET: R2Bucket;
  // NOTION_TOKEN: string;
}

declare module "astro" {
  interface Locals {
    env: Env;
  }
}