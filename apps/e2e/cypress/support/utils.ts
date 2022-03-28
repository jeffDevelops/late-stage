export const getInputByLabel = (label: string) => {
  return cy
    .get('label')
    .contains(label)
    .invoke('attr', 'for')
    .then((id) => {
      cy.get('#' + id)
    })
}

export const checkCheckboxWithLabel = (label: string) => {
  cy.contains(label).within(() => {
    cy.get('input[type="checkbox"]').check({ force: true })
  })
}

export const isDisplayingBankCampaign = () => {
  cy.contains('Outcomes and Impact').should('be.visible')
  cy.contains('Exodus from for-profit banking').should('be.visible')
  cy.contains('Why?').should('be.visible')
  cy.contains('What').should('be.visible')
}
