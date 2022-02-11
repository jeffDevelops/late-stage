import { buildPostEndpoint } from '../../proxy/buildPostEndpoint'
import type { ErrorHandler } from '../../proxy/buildPostEndpoint'

const handleGraphQLErrors: ErrorHandler = (errors) => {
  console.log(errors)
}

export const post = buildPostEndpoint('updateEmailAddress', handleGraphQLErrors)
