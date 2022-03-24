/// <reference types="cypress" />

describe('Register User', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.wait(2000) // Wait for animation to fire
  })

  it('allows the user to navigate to the registration page', () => {
    cy.get('#controls .navigation-button .fab').should('be.visible').click()
    cy.get('a[href="/register"]').should('be.visible').click()
    cy.wait(200)
    cy.contains('Know the risks.').click()
    cy.contains('I understand the risks').click()
    cy.get('#register-username').type(Cypress.env('username'))
    cy.get('#register-email').type(`${Cypress.env('emailUsername')}@${Cypress.env('emailDomain')}`)
    cy.get('#register-password').type(Cypress.env('password'))
    cy.get('button.primary').contains('Register').click()
    cy.contains('Check Your Email').should('be.visible')
  })
})
