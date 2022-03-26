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

    cy.get('.recaptcha-checkbox').click()
  })
})
