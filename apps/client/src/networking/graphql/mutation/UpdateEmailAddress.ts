export const updateEmailAddress = (subfields: string): string => `#graphql
mutation UpdateEmailAddress ($newEmailAddress: String!) {
  updateEmailAddress(newEmailAddress: $newEmailAddress) {
    ${subfields}
  }
}
`
