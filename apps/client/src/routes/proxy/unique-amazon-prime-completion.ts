import { buildPostEndpoint } from '../../proxy/buildPostEndpoint'

import type { ErrorHandler } from '../../proxy/buildPostEndpoint'
import type { GraphQLError } from '../../types/GraphQLError'

const errorHandler: ErrorHandler = (errors: GraphQLError[]) => {
  console.log('unique amazon prime completion errorHandler')
  console.error(errors)
}

export const post = buildPostEndpoint('amazonPrimeCompletion', errorHandler)
