import { buildPostEndpoint, ErrorHandler } from '../../proxy/buildPostEndpoint'
import type { GraphQLError } from '../../types/GraphQLError'

const errorHandler: ErrorHandler = (errors: GraphQLError[]) => {
  console.error({ errors })

  const ALREADY_SUBMITTED_ERROR = 'You have already recorded your participation in this campaign.'

  if (errors.some(({ message }) => message === ALREADY_SUBMITTED_ERROR)) {
    return {
      statusCode: 401,
      body: {
        error: {
          message: ALREADY_SUBMITTED_ERROR,
        },
      },
    }
  }
}

export const post = buildPostEndpoint('recordAmazonPrimeCompletion', errorHandler)
