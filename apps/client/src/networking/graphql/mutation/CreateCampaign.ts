export const createCampaign = (subfields: string): string => `#graphql
mutation CreateCampaign($data: CampaignCreateInput!) {
  createCampaign(data: $data) {
    ${subfields}
  }
}
`
