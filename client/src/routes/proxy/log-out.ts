import fetch from 'isomorphic-fetch'
import setCookieParser from 'set-cookie-parser'
import { gqlRequest } from '../../proxy/gqlRequest'

import type { ErrorHandler } from '../../proxy/buildPostEndpoint'
import type { RequestHandler, EndpointOutput } from '@sveltejs/kit/types'
import type { GraphQLError } from 'src/types/GraphQLError'

const handleGraphQLErrors: ErrorHandler = (errors: GraphQLError[]): void | EndpointOutput => {
  console.log({ errors })
}

export const post: RequestHandler = async ({ request }): Promise<EndpointOutput> => {
  const body = await request.json()

  try {
    const response = await fetch(
      ...gqlRequest(body, {
        cookie: request.headers.get('cookie'),
      }),
    )
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
