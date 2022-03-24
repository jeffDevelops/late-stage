import { isDisplayingBankCampaign } from './4-bank-campaign-redirect-after-login'
import { getInputByLabel } from '../support/utils'

describe('Bank Campaign', () => {
  before(() => {
    cy.visit('https://staging.late-stage.com')
    cy.wait(2000) // Wait for animation to fire

    cy.contains('Exodus from for-profit banking').click()

    cy.wait(500)
  })

  it('allows the user to record their switch from Wells Fargo', () => {
    cy.get('input[type="file"]').attachFile('./withdrawal-receipt.jpeg')

    getInputByLabel('Withdrawal Amount ($)').type('999.99')

    // cy.get('label').contains('I removed money from:').click()
    // cy.get('.listItem').contains('Wells Fargo').click()

    getInputByLabel('I moved money to:').type('Ando Money')

    getInputByLabel("They don't invest in fossil-fuels").click()
    getInputByLabel("They don't in student loan asset-backed securities").click()
    getInputByLabel("They're conscientious about human rights").click()
    getInputByLabel("They don't charge account fees").click()
    getInputByLabel('They offered a fairer interest rate').click()
    getInputByLabel('Other').click()

    cy.get('textarea').type('This is a pledge created by an automated test bot.')
  })
})
