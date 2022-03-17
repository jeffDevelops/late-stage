export const markAmazonPrimeCompletionReviewed = `#graphql
mutation MarkAmazonPrimeCompletionReviewed($amazonPrimeCompletionId: String!) {
  markAmazonPrimeCompletionReviewed(amazonPrimeCompletionId: $AmazonPrimeCompletionId)
}
`
