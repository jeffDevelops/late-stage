export const uniqueBankExodusCompletion = (subfields: string): string => `#graphql
query UniqueBankExodusCompletion($where: BankExodusCompletionWhereUniqueInput!) {
  bankExodusCompletion(where: $where) {
    ${subfields}
  }
}
`
