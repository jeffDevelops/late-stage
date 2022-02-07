export const userWhereUniqueInput = (subfields: string): string => `#graphql
query UserWhereUniqueInput ($where: UserWhereUniqueInput!) {
  user(where: $where ) {
    ${subfields}
  }
}
`
