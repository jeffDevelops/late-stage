export const recordAmazonPrimeCompletion = `#graphql
mutation RecordAmazonPrimeCompletion($RecordAmazonPrimeCompletionInput: RecordAmazonPrimeCompletionInput!) {
  recordAmazonPrimeCompletion(RecordAmazonPrimeCompletionInput: $RecordAmazonPrimeCompletionInput) {
    id
  }
}
`
