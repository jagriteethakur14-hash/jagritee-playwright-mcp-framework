// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

/**
 * GreenKart Playwright Test Suite Configuration
 * 
 * This configuration file sets up Playwright for testing the GreenKart
 * ecommerce application at https://rahulshettyacademy.com/seleniumPractise/
 */

export default defineConfig({
  testDir: './tests',
  
  // Maximum time for entire test
  timeout: 30 * 1000,
  
  // Maximum time for expect assertion
  expect: {
    timeout: 5000
  },

  // Number of test workers (parallel execution)
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,

  // Retry failed tests (only in CI)
  retries: process.env.CI ? 2 : 0,

  // Stop on first failure (can be disabled for debugging)
  forbidOnly: !!process.env.CI,

  // Test reporter
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list']
  ],

  // Shared settings for all runners
  use: {
    // Base URL for relative navigation
    baseURL: 'https://rahulshettyacademy.com/seleniumPractise/#/',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',

    // Viewport size
    viewport: { width: 1280, height: 720 },

    // Ignore HTTPS errors if needed
    ignoreHTTPSErrors: true,

    // Action timeout (30 seconds)
    actionTimeout: 30000
  },

  // Configure Chromium as the only browser project
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],

  // Run your local dev server before starting the tests
  webServer: undefined,
  // GreenKart is a remote application, no local dev server needed

  // Global setup/teardown if needed
  // globalSetup: './config/global-setup.ts',
  // globalTeardown: './config/global-teardown.ts',
})
