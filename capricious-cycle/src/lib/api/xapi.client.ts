import type { XAPIStatement } from '../../types/xapi';

export async function submitXAPIStatement(statement: XAPIStatement): Promise<{ status: string; id: string }> {
  const res = await fetch('/api/statement', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statement),
  });

  if (!res.ok) {
    throw new Error(`Failed to submit xAPI statement: ${res.statusText}`);
  }

  return res.json();
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