/*migrations/001_init.sql*/
CREATE TABLE IF NOT EXISTS statements (
  id TEXT PRIMARY KEY,
  actor TEXT NOT NULL,
  verb TEXT NOT NULL,
  object TEXT NOT NULL,
  result JSON,
  timestamp TEXT NOT NULL,
  session_id TEXT
);