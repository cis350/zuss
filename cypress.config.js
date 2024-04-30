const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'z6gt78',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
