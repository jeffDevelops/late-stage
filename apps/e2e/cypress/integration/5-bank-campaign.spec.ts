import { isDisplayingBankCampaign } from '../support/utils'
import { checkCheckboxWithLabel, getInputByLabel } from '../support/utils'

describe('Bank Campaign', () => {
  before(() => {
    cy.visit('https://staging.late-stage.com')
    cy.wait(2000) // Wait for animation to fire

    cy.contains('Exodus from for-profit banking').click()

    cy.wait(500)

    isDisplayingBankCampaign()
  })

  it('allows the user to record their switch from Wells Fargo', () => {
    cy.get('input[type="file"]').attachFile('./withdrawal-receipt.jpeg')

    getInputByLabel('Withdrawal Amount ($)').type('999.99')

    cy.get('input#institution').click()
    cy.get('.listItem').contains('Wells Fargo').click()

    getInputByLabel('I moved money to:').type('Ando Money')

    checkCheckboxWithLabel("They don't invest in fossil-fuels")
    checkCheckboxWithLabel("They don't invest in student loan asset-backed securities (SLABS)")
    checkCheckboxWithLabel("They're conscientious about human rights")
    checkCheckboxWithLabel("They don't charge account fees")
    checkCheckboxWithLabel('They offered a fairer interest rate')
    checkCheckboxWithLabel('Other')

    cy.get('textarea#bank-campaign-other').type(
      'This is a pledge created by an automated test bot.',
    )

    // Click the RECAPTCHA
    cy.get('iframe[title="reCAPTCHA"]')
      .its('0.contentDocument')
      .should('exist')
      .its('body')
      .should('not.be.undefined')
      .then(cy.wrap)
      .find('.recaptcha-checkbox')
      .click()

    cy.get('button.primary').contains('Tally My Withdrawal').click()

    cy.contains('Thank you for your solidarity').should('be.visible')
    cy.get('.close-button').click()

    cy.get('button').contains('Feed').click()
  })
})
