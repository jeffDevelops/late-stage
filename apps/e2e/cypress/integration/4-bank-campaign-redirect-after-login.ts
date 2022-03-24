export const isDisplayingBankCampaign = () => {
  cy.contains('Outcomes and Impact').should('be.visible')
  cy.contains('Exodus from for-profit banking').should('be.visible')
  cy.contains('Why?').should('be.visible')
  cy.contains('What').should('be.visible')
}

describe('Bank Campaign Redirect After Login', () => {
  beforeEach(() => {
    cy.visit('https://staging.late-stage.com')
    cy.wait(2000) // Wait for animation to fire
  })

  it('redirects to the bank campaign after logging in', () => {
    cy.contains('Exodus from for-profit banking').click()

    cy.wait(1000)

    isDisplayingBankCampaign()

    // Interacting with the form triggers the "You need to be logged in" modal
    cy.get('.custom-file-upload').click()
    cy.wait(1000)
    cy.get('.modal .content h2').contains("You'll need to log in first", { timeout: 10000 })
    cy.get('.modal .actions button').contains('Log In').click()

    // Log In
    cy.get('#log-in-username').type(Cypress.env('username'))
    cy.get('#log-in-password').type(Cypress.env('password'))
    cy.get('button.primary').contains('Log In').click()

    // It redirects to the bank campaign after logging in
    isDisplayingBankCampaign()
  })
})
