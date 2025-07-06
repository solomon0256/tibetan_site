/**
 * Jest 测试配置文件
 *
 * 用于配置 TypeScript 项目的单元测试环境，适配 Cloudflare Workers 和模块化结构。
 * ⚠️ 注意：
 * - `workerScriptPath` 应始终与打包脚本输出路径一致（如 `dist/worker.bundle.js`）
 * - 若修改 Worker 源文件路径，需同步修改该配置
 */

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest']
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['**/test/**/*.test.ts', '**/?(*.)+(test).ts'],
  globals: {
    // 指定构建后的 Worker 脚本路径
    // ⚠️ 必须与 scripts/build-worker.js 中的输出路径一致
    workerScriptPath: 'scripts/build-worker.js'
  }
};