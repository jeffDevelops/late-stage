export const currentUser = (subfields: string): string => `#graphql
query CurrentUser {
  currentUser {
    ${subfields}
  }
}
`
