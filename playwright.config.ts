import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  timeout: 120000,
  use: { baseURL: 'http://127.0.0.1:4322', browserName: 'chromium' },
  globalSetup: './tests/setup.ts',
});
