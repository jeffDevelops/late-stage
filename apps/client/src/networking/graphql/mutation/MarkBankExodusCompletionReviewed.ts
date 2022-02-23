export const markBankExodusCompletionReviewed = `#graphql
mutation MarkBankExodusCompletionReviewed($bankExodusCompletionId: String!) {
  markBankExodusCompletionReviewed(bankExodusCompletionId: $bankExodusCompletionId)
}
`
