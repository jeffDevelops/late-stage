export const aggregateAmazonPrimeCompletion = (subfields: string): string => `#graphql
query AggregateAmazonPrimeCompletion {
  aggregateAmazonPrimeCompletion {
   ${subfields}
  }
}
`
