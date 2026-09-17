const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://127.0.0.1:4173",
    browserName: "chromium",
    headless: true
  },
  webServer: {
    command: "npx http-server . -p 4173 -c-1",
    port: 4173,
    reuseExistingServer: true
  }
});