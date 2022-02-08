import type { EndpointOutput } from '@sveltejs/kit/types/endpoint'
import { buildPostEndpoint } from '../../proxy/buildPostEndpoint'
import type { GraphQLError } from '../../types/GraphQLError'

const handleGraphQLErrors = (errors: GraphQLError[]): EndpointOutput | void => {
  console.log(errors)

  if (
    errors.some(
      (error) => error.message === 'A user with that username already exists. Please try another.',
    )
  ) {
    return {
      status: 409,
      body: {
        error: {
          message: 'A user with that username already exists. Please try another.',
        },
      },
    }
  }

  return {
    status: 500,
    body: {
      error: {
        message: 'An unknown error occurred',
      },
    },
  }
}

export const post = buildPostEndpoint('registerUser', handleGraphQLErrors)
