/// <reference types="cypress" />
/// <reference types="@shelex/cypress-allure-plugin" />

const { defineConfig } = require("cypress");

const cucumber = require("cypress-cucumber-preprocessor").default;
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  watchForFileChanges: false,
  screenshotsFolder: "output/screenshots",
  videosFolder: "output/videos",
  video: false,
  viewportWidth: 1280,
  viewportHeight: 800,
  chromeWebSecurity: false,
  pageLoadTimeout: 60000,
  defaultCommandTimeout: 12000,
  retries: {
    runMode: 2,
    openMode: 1,
  },
  e2e: {
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
      allureWriter(on, config);

      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.preferences.default.intl = { accept_languages: "fr" };
          // https://github.com/GoogleChrome/chrome-launcher/blob/master/docs/chrome-flags-for-tools.md
          launchOptions.args.push("--disable-dev-shm-usage");
          launchOptions.args.push("--js-flags=--expose-gc");
          launchOptions.args.push("--num-raster-threads=4");
          launchOptions.args.push("--disable-background-networking");
          launchOptions.args.push("--disable-default-apps");
          launchOptions.args.push("--disable-gpu");
          launchOptions.args.push("--disable-sync");
          launchOptions.args.push("--disable-features=Translate");
          launchOptions.args.push("--metrics-recording-only");
          launchOptions.args.push("--mute-audio");
          launchOptions.args.push("--no-first-run");
          launchOptions.args.push("--disable-client-side-phishing-detection");
          launchOptions.args.push("--no-default-browser-check");
          launchOptions.args.push("--auto-open-devtools-for-tabs");

          return launchOptions;
        }
      });

      return config;
    },
    specPattern: "cypress/e2e/**/*.feature",
    excludeSpecPattern: ["*.js", "*.ts", "*.md"],
  },
});
