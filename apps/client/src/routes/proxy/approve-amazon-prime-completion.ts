import { buildPostEndpoint } from '../../proxy/buildPostEndpoint'
import type { GraphQLError } from '../../types/GraphQLError'

const errorHandler = (errors: GraphQLError[]) => {
  console.error({ errors })
}

export const post = buildPostEndpoint('approveAmazonPrimeCompletion', errorHandler)
