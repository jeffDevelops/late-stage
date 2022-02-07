import { buildPostEndpoint } from '../../proxy/buildPostEndpoint'
import type { ErrorHandler } from '../../proxy/buildPostEndpoint'

const handleGraphQLErrors: ErrorHandler = (errors) => {
  console.log(errors)
  if (
    errors.some(
      ({ message }) =>
        message === 'JWT expired. Please send yourself another confirmation email and try again.',
    )
  ) {
    return {
      status: 200,
      body: {
        error: {
          message:
            'Magic link expired. Please send yourself another confirmation email and try again.',
        },
      },
    }
  }
}

export const post = buildPostEndpoint('verifyEmailAddress', handleGraphQLErrors)
