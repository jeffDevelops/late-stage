export const getInputByLabel = (label: string) => {
  return cy
    .get('label')
    .contains('Withdrawal Amount ($)')
    .invoke('attr', 'for')
    .then((id) => {
      cy.get('#' + id)
    })
}
