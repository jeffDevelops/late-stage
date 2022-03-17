export const uniqueAmazonPrimeCompletion = (subfields: string): string => `#graphql
query UniqueAmazonPrimeCompletion($where: AmazonPrimeCompletionWhereUniqueInput!) {
  amazonPrimeCompletion(where: $where) {
    ${subfields}
  }
}
`
