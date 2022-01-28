import setCookieParser from 'set-cookie-parser'

import { gqlRequest } from '../../proxy/gqlRequest'

import type { EndpointOutput, RequestHandler } from '@sveltejs/kit'
import type { GraphQLError } from '../../types/GraphQLError'

const handleGraphQLErrors = (errors: GraphQLError[]): void | EndpointOutput => {
  console.log({ errors })

  if (
    errors.some(
      ({ message }) =>
        message === 'JWT expired. Please send yourself another confirmation email and try again.',
    )
  ) {
    return {
      status: 401,
      body: {
        error: {
          message:
            'The magic link you used has expired. Magic links expire after 5 minutes for your security.',
        },
      },
    }
  }

  if (
    errors.some(
      ({ message }) =>
        message === 'Token in magic link does not match the one that was most recently issued',
    )
  ) {
    return {
      status: 401,
      body: {
        error: {
          message: 'Token in magic link does not match the one that was most recently issued',
        },
      },
    }
  }

  if (errors.some(({ message }) => message === 'Token in magic link was used already')) {
    return {
      status: 401,
      body: {
        error: {
          message: 'Magic links are single use. Please request a new one.',
        },
      },
    }
  }
}

export const post: RequestHandler = async ({ request }): Promise<EndpointOutput> => {
  const body = await request.json()

  try {
    const response = await fetch(...gqlRequest(body))
    const deserialized = await response.json()

    if (deserialized.errors) {
      const output = handleGraphQLErrors(deserialized.errors)
      if (output) return output

      return {
        status: 500,
        body: {
          error: {
            message: 'An unknown error occurred',
          },
        },
      }
    }

    return {
      status: 200,
      headers: {
        'Set-Cookie': setCookieParser.splitCookiesString(response.headers.get('set-cookie')),
      },
      body: deserialized.data.updatePassword,
    }
  } catch (error) {
    return {
      status: 500,
      body: {
        error: {
          message: 'An unknown error occurred',
        },
      },
    }
  }
}
