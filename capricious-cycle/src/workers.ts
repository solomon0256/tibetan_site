interface Env {
  PROGRESS_DO: DurableObjectNamespace;
  TIBETAN_KV: KVNamespace;
  LRS_DB: D1Database;
  R2_COURSE: R2Bucket;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  NOTION_API_KEY: string;
  NOTION_DATABASE_ID: string;
  KV_NAMESPACE_ID: string;
  R2_BUCKET_NAME: string;
  D1_DATABASE_ID: string;
}

import { ProgressDO } from "./objects/ProgressDO";
import { Hono } from "hono";
import { xapiRoute } from "./routes/xapi";

export { ProgressDO };

const app = new Hono<{ Bindings: Env }>();

app.route("/", xapiRoute);

export default app;
