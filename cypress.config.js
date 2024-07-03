const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl: 'https://petstore.swagger.io/v2',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
