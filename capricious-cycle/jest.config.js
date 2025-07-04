/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest']
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['**/test/**/*.test.ts', '**/?(*.)+(test).ts'],
  // Worker entry point for tests: update this if your worker script changes location
  globals: {
    workerScriptPath: 'scripts/build-worker.js'
  }
};