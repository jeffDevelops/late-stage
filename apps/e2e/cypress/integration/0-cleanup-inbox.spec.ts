const recurse = () => {
  cy.get('.messagelist-row-link').first().click()
  cy.get('button.delete-button').click()

  cy.wait(2000)

  cy.get('body').then(($body) => {
    if ($body.text().includes('This inbox is empty')) {
      return
    } else {
      return recurse()
    }
  })
}

describe('Clean up inbox', () => {
  before(() => {
    cy.task('getAutomatedTestUser')
      .then((user: Record<string, any> | null) => {
        console.log({ user })
        if (!user) return null
        return cy.task('disconnectTestUserAssociatedCampaignCompletions', user.id)
      })
      .then((userId: string | null) => {
        if (!userId) return null
        return cy.task('deleteTestUserAssociatedBankExodusCompletions', userId)
      })
      .then((userId: string | null) => {
        console.log({ userId })
        if (!userId) return null
        return cy.task('deleteTestUserAssociatedAmazonPrimeCompletions', userId)
      })
      .then((userId: string) => {
        if (!userId) return null
        return cy.task('deleteAutomatedTestUser', userId)
      })
      .then(() => {
        cy.visit(`https://maildrop.cc`)
        cy.wait(500)

        cy.contains('Loading...').should('not.exist')
      })
  })

  it('clears out the inbox', () => {
    cy.get('.nav-container .inboxform-container input').type(Cypress.env('emailUsername'))
    cy.get('.nav-container .inboxform-container button').contains('View Inbox').click()

    cy.wait(500)

    cy.get('body').then(($body) => {
      if ($body.text().includes('This inbox is empty')) {
        return
      } else {
        return recurse()
      }
    })
  })
})
