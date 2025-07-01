import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SCHEMAS_DIR = path.resolve(__dirname, '../schemas');
const VERSION_FILE = path.join(SCHEMAS_DIR, 'schema_version.json');

const ajv = new Ajv({ allErrors: true });

function loadJson(filePath: string): any {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function validateAllSchemas() {
  const versionData = loadJson(VERSION_FILE);
  const expectedVersion = versionData.schemaVersion;
  if (!expectedVersion) {
    console.error('[Error] schema_version.json 中缺失 "schemaVersion" 字段');
    process.exit(1);
  }

  const files = fs.readdirSync(SCHEMAS_DIR).filter((f) => f.endsWith('.schema.json'));

  let hasError = false;

  for (const file of files) {
    const schemaPath = path.join(SCHEMAS_DIR, file);
    const schema = loadJson(schemaPath);

    if (schema.schemaVersion !== expectedVersion) {
      console.error(`[Version Mismatch] ${file} 中的 schemaVersion 不匹配`);
      hasError = true;
    }

    try {
      ajv.compile(schema);
    } catch (e: any) {
      console.error(`[Invalid Schema] ${file} 无法被编译：`, e.message);
      hasError = true;
    }
  }

  if (hasError) {
    process.exit(1);
  }

  console.log('[✓] 所有 JSON Schema 校验通过，版本一致');
}

validateAllSchemas();