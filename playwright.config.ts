import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    projects: [
        /* Test against desktop browsers */
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] },
        },
        {
          name: 'firefox',
          use: { ...devices['Desktop Firefox'] },
        }
    ],
    testMatch: '*.pw.spec.ts',
    timeout: 10 * 1000,
    use: {
        launchOptions: {
            //slowMo: 500,
            //headless: false
        },
        testIdAttribute: 'data-test'
    },
});