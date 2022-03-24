const recursivelyDelete = () => {
  cy.get('.messagelist-row-link').first().click()
  cy.get('button.delete-button').click()

  cy.wait(2000)

  cy.get('body').then(($body) => {
    if ($body.text().includes('This inbox is empty')) {
      return
    } else {
      return recursivelyDelete()
    }
  })
}

describe('Clean up inbox', () => {
  before(() => {
    cy.visit(`https://maildrop.cc`)
    cy.wait(500)

    cy.contains('Loading...').should('not.exist')
  })

  it('clears out the inbox', () => {
    cy.get('.nav-container .inboxform-container input').type(Cypress.env('emailUsername'))
    cy.get('.nav-container .inboxform-container button').contains('View Inbox').click()

    cy.wait(500)

    cy.get('body').then(($body) => {
      if ($body.text().includes('This inbox is empty')) {
        return
      } else {
        return recursivelyDelete()
      }
    })
  })
})
