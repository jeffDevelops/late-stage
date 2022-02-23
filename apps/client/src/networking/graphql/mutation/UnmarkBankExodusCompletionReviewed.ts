export const unmarkBankExodusCompletionReviewed = `#graphql
mutation UnmarkBankExodusCompletionReviewed($bankExodusCompletionId: String!) {
  unmarkBankExodusCompletionReviewed(bankExodusCompletionId: $bankExodusCompletionId)
}
`
