export const amazonPrimeCompletions = (subfields: string): string => `#graphql
query AmazonPrimeCompletions (
    $where: AmazonPrimeCompletionWhereInput,
    $orderBy: [AmazonPrimeCompletionOrderByWithRelationInput!],
    $cursor: AmazonPrimeCompletionWhereUniqueInput,
    $take: Int,
    $skip: Int,
    $distinct: [AmazonPrimeCompletionScalarFieldEnum!]
) {
  amazonPrimeCompletions (
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
