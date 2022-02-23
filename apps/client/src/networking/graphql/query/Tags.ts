export const tags = (subfields: string): string => `#graphql
query Tags (
  $where: TagWhereInput,
  $orderBy: [TagOrderByWithRelationInput!],
  $cursor: TagWhereUniqueInput,
  $take: Int,
  $skip: Int,
  $distinct: [TagScalarFieldEnum!]
) {
  tags (
    where: $where,
    orderBy: $orderBy,
    cursor: $cursor,
    take: $take,
    skip: $skip,
    distinct: $distinct
  ) {
    ${subfields}
  }
}
`
