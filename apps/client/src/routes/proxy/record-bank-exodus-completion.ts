import { buildPostEndpoint, ErrorHandler } from '../../proxy/buildPostEndpoint'
import type { GraphQLError } from '../../types/GraphQLError'

const errorHandler: ErrorHandler = (errors: GraphQLError[]) => {
  console.error({ errors })

  const MAX_SUBMISSIONS_ERROR =
    'You have exceeded the maximum number of submissions allowed per day.'

  if (errors.some(({ message }) => message === MAX_SUBMISSIONS_ERROR)) {
    return {
      statusCode: 401,
      body: {
        error: {
          message: MAX_SUBMISSIONS_ERROR,
        },
      },
    }
  }
}

export const post = buildPostEndpoint('recordBankExodusCompletion', errorHandler)
