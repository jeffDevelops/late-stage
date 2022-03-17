export const unmarkAmazonPrimeCompletionReviewed = `#graphql
mutation UnmarkAmazonPrimeCompletionReviewed($amazonPrimeCompletionId: String!) {
  unmarkAmazonPrimeCompletionReviewed(amazonPrimeCompletionId: $amazonPrimeCompletionId)
}
`
