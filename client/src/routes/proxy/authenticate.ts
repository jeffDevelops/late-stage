import fetch from 'isomorphic-fetch'
import setCookieParser from 'set-cookie-parser'

import type { RequestHandler, EndpointOutput } from '@sveltejs/kit/types/endpoint'
import { gqlRequest } from '../../proxy/gqlRequest'

import type { ErrorHandler } from '../../proxy/buildPostEndpoint'

const handleGraphQLErrors: ErrorHandler = (errors) => {
  console.log({ errors })

  if (errors.some(({ message }) => message === 'Unable to find user with provided credentials.')) {
    return {
      status: 401,
      body: {
        error: {
          message: 'Unable to find user with provided credentials.',
        },
      },
    }
  }
}

export const post: RequestHandler = async ({ request }): Promise<EndpointOutput> => {
  console.log('authenticate endpoint')

  const body = await request.json()

  try {
    const response = await fetch(...gqlRequest(body))
    const deserialized = await response.json()

    console.log({ deserialized })

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
      body: deserialized.data.authenticateUser,
    }
  } catch (error) {
    console.error(error)

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
