import { buildPostEndpoint, ErrorHandler } from '../../proxy/buildPostEndpoint'

const handleGraphQLErrors: ErrorHandler = (errors) => {
  console.log({ errors })
}

export const post = buildPostEndpoint('currentUser', handleGraphQLErrors)
