import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: false,
  reporter: 'html',
  use: {
    baseURL: "https://dev78076.service-now.com",
    extraHTTPHeaders: {
      Authorization: "Basic YWRtaW46Zzl0Ti0lRTR0ZkRV"
    }
  }
};

export default config;