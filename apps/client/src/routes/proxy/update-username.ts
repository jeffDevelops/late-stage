import { buildPostEndpoint } from '../../proxy/buildPostEndpoint'
import type { ErrorHandler } from '../../proxy/buildPostEndpoint'

const handleGraphQLErrors: ErrorHandler = (errors) => {
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
}

export const post = buildPostEndpoint('updateUsername', handleGraphQLErrors)
