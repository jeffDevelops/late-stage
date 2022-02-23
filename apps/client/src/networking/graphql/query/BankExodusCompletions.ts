export const bankExodusCompletions = (subfields: string): string => `#graphql
query BankExodusCompletions (
  $where: BankExodusCompletionWhereInput,
  $orderBy: [BankExodusCompletionOrderByWithRelationInput!],
  $cursor: BankExodusCompletionWhereUniqueInput,
  $take: Int,
  $skip: Int,
  $distinct: [BankExodusCompletionScalarFieldEnum!]
) {
  bankExodusCompletions (
    where: $where,
    orderBy: $orderBy,
    cursor: $cursor,
    take: $take,
    skip: $skip,
    distinct: $distinct,
  ) {
    ${subfields}
  }
}
`
