const recursivelyCheckEmail = () => {
  cy.get('body').then(($body) => {
    console.log($body.text())

    if ($body.text().includes('This inbox is empty.')) {
      cy.get('button').contains('Reload').click()
      cy.wait(1000)
      return recursivelyCheckEmail()
    } else {
      cy.wait(500)
      cy.contains('Confirm your email address').click()

      cy.wait(1000)

      cy.get('iframe.messagedata-iframe')
        .its('0.contentDocument.body')
        .should('be.visible')
        .then(cy.wrap)
        .find('a#confirm-email-address-button')
        .should('have.text', 'CONFIRM EMAIL ADDRESS')
        .click()
      return
    }
  })
}

describe('Confirm email', () => {
  before(() => {
    cy.visit(`https://maildrop.cc`)
    cy.wait(500)
  })

  it('sends a confirmation email to the specified email address', () => {
    cy.get('.nav-container .inboxform-container input').type(Cypress.env('emailUsername'))
    cy.get('.nav-container .inboxform-container button').contains('View Inbox').click()

    cy.wait(1000)

    recursivelyCheckEmail()
  })
})
