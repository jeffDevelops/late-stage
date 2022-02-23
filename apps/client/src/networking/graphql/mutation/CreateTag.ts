export const createTag = (subfields: string): string => `#graphql
mutation CreateTag (
  $data: TagCreateInput!
) {
  createTag (
    data: $data
  ) {
    ${subfields}
  }
}
`
