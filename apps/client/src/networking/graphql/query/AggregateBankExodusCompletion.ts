export const aggregateBankExodusCompletion = (subfields: string): string => `#graphql
query AggregateBankExodusCompletion {
  aggregateBankExodusCompletion {
   ${subfields}
  }
}
`
