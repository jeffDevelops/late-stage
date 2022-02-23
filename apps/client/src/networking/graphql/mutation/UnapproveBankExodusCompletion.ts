export const unapproveBankExodusCompletion = `#graphql
mutation UnapproveBankExodusCompletion($bankExodusCompletionId: String!) {
  unapproveBankExodusCompletion(bankExodusCompletionId: $bankExodusCompletionId)
}
`
