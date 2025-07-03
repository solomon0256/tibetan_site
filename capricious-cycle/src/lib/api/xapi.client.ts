// File: capricious-cycle/src/lib/api/xapi.client.ts

import type { XAPIStatement } from '../../types/xapi';

export async function submitXAPIStatement(statement: XAPIStatement): Promise<{ status: string; id: string }> {
  try {
    // 检查必要字段是否存在
    if (!statement.actor || !statement.verb || !statement.object) {
      throw new Error('Missing required xAPI fields: actor, verb, object');
    }

    console.debug('[xAPI] 正在提交语句：', statement);

    const res = await fetch('/api/statement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statement),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[xAPI] 提交失败：${res.status} ${res.statusText}`, errorText);
      throw new Error(`Failed to submit xAPI statement: ${res.statusText}`);
    }

    return res.json();
  } catch (error: any) {
    console.error('[xAPI] 错误：', error.message || error);
    throw error;
  }
}

export async function fetchXAPIStatements(params?: { actor?: string; session_id?: string }): Promise<any> {
  const searchParams = new URLSearchParams();
  if (params?.actor) searchParams.append('actor', params.actor);
  if (params?.session_id) searchParams.append('session_id', params.session_id);

  const url = `/api/statement${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch xAPI statements: ${res.statusText}`);
  }

  return res.json();
}