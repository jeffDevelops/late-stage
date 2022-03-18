export const createWorkCited = (subfields: string): string => `#graphql
mutation CreateWorkCited($data: WorkCitedCreateInput!) {
  createWorkCited(data: $data) {
    ${subfields}
  }
}
`
