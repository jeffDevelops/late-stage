export const campaignWhereUniqueInput = (subfields: string): string => `#graphql
query CampaignWhereUniqueInput($where: CampaignWhereUniqueInput!) {
  campaign(where: $where) {
    ${subfields}
  }
}
`
