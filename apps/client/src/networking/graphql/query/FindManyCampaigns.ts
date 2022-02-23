export const findManyCampaigns = (subfields: string): string => `#graphql
query FindManyCampaign (
  $where: CampaignWhereInput
  $orderBy: [CampaignOrderByWithRelationInput!]
  $cursor: CampaignWhereUniqueInput
  $take: Int
  $skip: Int
  $distinct: [CampaignScalarFieldEnum!]
) {
  campaigns(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    take: $take
    skip: $skip
    distinct: $distinct
  ) {
    ${subfields}
  }
}
`
