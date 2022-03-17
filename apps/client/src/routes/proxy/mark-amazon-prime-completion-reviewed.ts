import { buildPostEndpoint } from '../../proxy/buildPostEndpoint'
import type { GraphQLError } from '../../types/GraphQLError'

const errorHandler = (error: GraphQLError[]) => {
  console.error({ error })
}

export const post = buildPostEndpoint('markAmazonPrimeCompletionReviewed', errorHandler)
