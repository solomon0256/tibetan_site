/// <reference path="../../types/env.d.ts" />
/**
 * [说明]
 * 为兼容 Cloudflare 平台运行和本地 Astro Dev 运行环境，
 * 我们采用 DEV 环境下使用 mock database（避免 LRS_DB 未定义导致崩溃），
 * 仅在部署或使用 wrangler dev 时才使用真实 Cloudflare D1 注入。
 * 本文件为主要的数据入口 /api/statement.ts，不再使用 /xapi.ts。
 */
// src/pages/api/statement.ts
export const prerender = false;
import type { APIRoute } from 'astro';
import type { Env } from '@/types/env';
import { randomUUID } from 'node:crypto';

export const GET: APIRoute = async ({ request, locals }) => {
  try {
    const isDev = import.meta.env.DEV;
    const db = isDev
      ? {
          prepare: () => ({
            bind: () => ({
              all: async () => ({ results: [] }),
              run: async () => {},
            }),
          }),
        }
      : (locals as { env: Env }).env.LRS_DB;
    const url = new URL(request.url);
    const actor = url.searchParams.get('actor');
    const session_id = url.searchParams.get('session_id');

    let query = 'SELECT * FROM statements';
    const conditions: string[] = [];
    const bindings: any[] = [];

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

    query += ' ORDER BY timestamp DESC';

    const stmt = db.prepare(query).bind(...bindings);
    const { results } = await stmt.all();

    return new Response(
      JSON.stringify({ statements: results }),
      { status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
    );
  } catch (error) {
    console.error('[xAPI] Failed to query statements:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to query statements' }),
      { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
    );
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const isDev = import.meta.env.DEV;
    const db = isDev
      ? {
          prepare: () => ({
            bind: () => ({
              all: async () => ({ results: [] }),
              run: async () => {},
            }),
          }),
        }
      : (locals as { env: Env }).env.LRS_DB;
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.toLowerCase().startsWith('application/json')) {
      return new Response(
        JSON.stringify({ error: 'Expected application/json content type' }),
        { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
      );
    }

    const body: any = await request.json();

    if (!body.actor || !body.verb || !body.object) {
      return new Response(
        JSON.stringify({ error: 'Missing required xAPI fields: actor, verb, object' }),
        { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
      );
    }

    const id = randomUUID();
    const timestamp = new Date().toISOString();
    const session_id = body.session_id ?? null;
    const result = body.result ?? null;

    const stmt = db.prepare(`
      INSERT INTO statements (id, actor, verb, object, result, timestamp, session_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      body.actor,
      body.verb,
      body.object,
      JSON.stringify(result),
      timestamp,
      session_id
    );

    await stmt.run();

    return new Response(
      JSON.stringify({ status: 'ok', id }),
      { status: 201, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
    );
  } catch (error) {
    console.error('[xAPI] Failed to insert statement:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to insert statement' }),
      { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
    );
  }
};