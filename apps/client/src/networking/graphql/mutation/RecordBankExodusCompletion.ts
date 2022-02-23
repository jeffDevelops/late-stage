export const recordBankExodusCompletion = `#graphql
mutation RecordBankExodusCompletion($RecordBankExodusCompletionInput: RecordBankExodusCompletionInput!) {
  recordBankExodusCompletion(RecordBankExodusCompletionInput: $RecordBankExodusCompletionInput) {
    id
  }
}
`
