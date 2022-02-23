import { buildPostEndpoint } from '../../proxy/buildPostEndpoint'

import type { ErrorHandler } from '../../proxy/buildPostEndpoint'
import type { GraphQLError } from '../../types/GraphQLError'

const errorHandler: ErrorHandler = (errors: GraphQLError[]) => {
  console.log('unique bank exodus completioon errorHandler')
  console.error(errors)
}

export const post = buildPostEndpoint('bankExodusCompletion', errorHandler)
