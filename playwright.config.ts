import {defineConfig} from '@playwright/test';
import type {TestOptions} from "./test-options";

require('dotenv').config();

export default defineConfig<TestOptions>({
  retries: 1,
  expect: {
    timeout: 2000,
    toMatchSnapshot: {maxDiffPixels: 50}
  },
  reporter: [
    ['json', {outputFile: 'test-results/jsonReport.json'}],
    ['junit', {outputFile: 'test-results/junitReport.json'}],
    // ["allure-playwright"],
    ['html']

  ],
  use: {
    globalsQAURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4201/'
        : process.env.STAGING === '1' ? 'http://localhost:4202/'
        : 'http://localhost:4200/',

    trace: 'on-first-retry',
    video: {
      mode: 'off',
      size : {width: 1920, height: 1080}
    }
  },

  projects: [
    {
      name: 'chromium',
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        // ...devices['iPhone 13 Pro'],
        headless: false
      }
    }
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/',
    timeout: 120 * 1000,
  }
});
