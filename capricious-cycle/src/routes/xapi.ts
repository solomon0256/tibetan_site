import { Hono } from 'hono';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import type { Env } from '../types/env';

export const xapiRoute = new Hono<{ Bindings: Env }>();

// POST: 添加 xAPI 语句
xapiRoute.post('/statement', async (c) => {
  const schema = z.object({
    actor: z.string(),
    verb: z.string(),
    object: z.string(),
    result: z.any().optional(),
    session_id: z.string().optional(),
  });

  const body = await c.req.json();
  const parse = schema.safeParse(body);
  if (!parse.success) {
    return c.json({ error: 'Invalid payload', details: parse.error }, 400);
  }

  const stmt = parse.data;
  const id = uuidv4();
  const timestamp = new Date().toISOString();

  await c.env.LRS_DB.prepare(`
    INSERT INTO xapi_statements (id, actor, verb, object, result, timestamp, session_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)
    .bind(id, stmt.actor, stmt.verb, stmt.object, JSON.stringify(stmt.result ?? null), timestamp, stmt.session_id ?? null)
    .run();

  return c.json({ status: 'ok', id });
});

// GET: 查询 xAPI 语句（可选参数：actor、session_id）
xapiRoute.get('/statement', async (c) => {
  const { actor, session_id } = c.req.query();

  let query = 'SELECT * FROM xapi_statements';
  const conditions: string[] = [];
  const bindings: string[] = [];

  if (actor) {
    conditions.push('actor = ?');
    bindings.push(actor);
  }
  if (session_id) {
    conditions.push('session_id = ?');
    bindings.push(session_id);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  const { results } = await c.env.LRS_DB.prepare(query).bind(...bindings).all();

  return c.json({ statements: results });
});
