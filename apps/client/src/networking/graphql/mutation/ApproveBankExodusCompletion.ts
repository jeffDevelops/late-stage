export const approveBankExodusCompletion = `#graphql
mutation ApproveBankExodusCompletion($bankExodusCompletionId: String!) {
  approveBankExodusCompletion(bankExodusCompletionId: $bankExodusCompletionId)
}
`
