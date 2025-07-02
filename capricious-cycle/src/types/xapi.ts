// src/types/xapi.ts

export interface XAPIStatement {
  actor: string;
  verb: string;
  object: string;
  result?: {
    score?: number;
    success?: boolean;
    [key: string]: any;
  };
  session_id?: string;
}