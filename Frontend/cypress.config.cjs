/* eslint-disable */

const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor')
const {
  createEsbuildPlugin,
} = require('@badeball/cypress-cucumber-preprocessor/esbuild')
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      })
      on('file:preprocessor', bundler)

      // Integrate @cypress/code-coverage plugin
      require('@cypress/code-coverage/task')(on, config)

      await addCucumberPreprocessorPlugin(on, config)

      return config
    },
    specPattern: [
      // E2E-filer Cypress letar efter som standard
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
      // Tillägg för Cucumber
      'cypress/e2e/**/*.feature',
      'cypress/component/**/*.spec.{js,jsx,ts,tsx}',
    ],
    coverageFolder: '/coverage',
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})
