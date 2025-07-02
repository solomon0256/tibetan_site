// src/types/xapi.ts

export interface XAPIStatement {
  actor: {
    objectType: 'Agent';
    name: string;
    mbox: string;
  };
  verb: {
    id: string;
    display?: {
      [lang: string]: string;
    };
  };
  object: {
    id: string;
    objectType?: 'Activity' | string;
    definition?: any;
  };
  result?: {
    score?: {
      scaled?: number;
      raw?: number;
      min?: number;
      max?: number;
    };
    success?: boolean;
    completion?: boolean;
    response?: string;
    duration?: string;
    [key: string]: any;
  };
  context?: any;
  timestamp?: string;
}