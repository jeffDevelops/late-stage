/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// const dotenv = require('cypress-dotenv')
// const waitFor = require('cypress-waitfor')
const path = require('path')
const PrismaClient = require('@prisma/client').PrismaClient

const prisma = new PrismaClient()

/**
 * @type {Cypress.PluginConfig}
 */

let shouldSkip = false
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  require('dotenv').config({ path: path.join(__dirname, '../../.env') })

  config.env.password = process.env.USER_PASSWORD
  config.env.emailUsername = process.env.USER_EMAIL_USERNAME
  config.env.emailDomain = process.env.USER_EMAIL_DOMAIN
  config.env.username = process.env.USER_USERNAME

  // Register a task command to check whether subsequent tests should be skipped after one fails
  on('task', {
    resetShouldSkipFlag() {
      shouldSkip = false
      return null
    },
    shouldSkip(value) {
      if (value != null) shouldSkip = value
      return shouldSkip
    },

    setConfirmEmailCallbackUrl(url) {
      global.confirmEmailCallbackUrl = url
      return null
    },
    getConfirmEmailCallbackUrl() {
      return global.confirmEmailCallbackUrl
    },

    deleteAutomatedTestUser() {
      return new Promise((resolve) => {
        return resolve(
          prisma.user.deleteMany({
            where: {
              username: 'AUTOMATED_TEST_USER',
            },
          }),
        )
      })
    },
  })

  return config
}
