const { defineConfig } = require('cypress');
const { TakeScreenShot } = require('./cypress/support/puppeteer/TakeScreenShot');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://automationpractice.com',
    setupNodeEvents(on, config) {
      on('task', {
        TakeScreenShot
      })
    }
  },
});