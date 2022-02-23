import { buildPostEndpoint, ErrorHandler } from '../../proxy/buildPostEndpoint'
import type { GraphQLError } from '../../types/GraphQLError'

const errorHandler: ErrorHandler = (errors: GraphQLError[]) => {
  console.error({ errors })
}

export const post = buildPostEndpoint('bankExodusCompletions', errorHandler)
