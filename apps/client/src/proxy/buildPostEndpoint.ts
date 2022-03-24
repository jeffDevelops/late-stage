import fetch from 'isomorphic-fetch'
import setCookieParser from 'set-cookie-parser'

import { gqlRequest } from './gqlRequest'
import { refreshAccessToken } from '../networking/graphql/mutation/RefreshAccessToken'

import type { RequestHandler, EndpointOutput } from '@sveltejs/kit/types/endpoint'
import type { RequestEvent } from '@sveltejs/kit/types/hooks'
import type { GraphQLError } from '../types/GraphQLError'
import type { ResponseHeaders } from '@sveltejs/kit/types/helper'

export type ErrorHandler = (errors: GraphQLError[]) => EndpointOutput | void

export type PostEndpointBuilder = (
  accessor: string,
  errorHandler?: ErrorHandler,
  shouldRetryAfterTokenRefresh?: boolean,
) => RequestHandler

/**
 * @title buildPostEndpoint
 * 
 * @description 
 * Generally endpoints for GraphQL data are all structured the same: they all require
 * a POST request with `query` and  `variables` in the body. After the fetch is executed and deserialized,
 * data is always available via response.data[accessor], and errors are expressed as an array on
 * response.errors.
 *
 * As a result you can easily dynamically build a SvelteKit with a one-liner and an (optional) error handler.
 *
 * The error handler should handle any specific errors as you see fit (potentially sending a redirect or a
 * specific response body to relay the error to the user with a user-friendly, client-safe message). Don't
 * expose potentially sensitive error messages.
 *
 * Your error handler can safely fallthrough without returning an EndpointOutput. The endpoint will return
 * a generic "An unknown error occurred" body with a 500 error code in this case.
 *
 * @example export const post = buildPostEndpoint('authenticateUser')
 *
 * @example
 * const errorHandler = (errors: GraphQLError[]): EndpointOutput | void => {
 *   if (errors.some((error) => error.message === 'Username taken')) {
 *      return {
 *        status: 409, // Conflict error code
 *        body: 'A user with this username already exists. Select another username and try again.'
 *      }
 *   }

 *   // Fallthrough
 *   // Error handler returns void
 *   // Endpoint returns 500 with generic "An unknown error occurred" message
 * }
 *
 * @param accessor - the accessor for response.data on success (different for each GraphQL request)
 * @param errorHandler - (optional) uniquely handle errors per request
 * @returns RequestHandler
 */
export const buildPostEndpoint: PostEndpointBuilder = (
  accessor,
  errorHandler,
  shouldRetryAfterTokenRefresh = true,
) =>
  async function post<Body extends Record<string, unknown>>(
    requestEvent: RequestEvent,
  ): Promise<EndpointOutput> {
    const { request: endpointRequest } = requestEvent

    const body = await endpointRequest.json()

    /**
     * Try to make the original request
     */

    const { deserialized: originalDeserialized } = await makeRequest(body, {
      cookie: endpointRequest.headers.get('cookie'),
    })

    /**
     * Return a success EndpointOutput with the data if successful
     */

    if (!originalDeserialized.errors) return success(originalDeserialized.data[accessor])

    const unauthorized = originalDeserialized.errors.some(({ message }) =>
      message.startsWith('Unauthorized'),
    )

    /**
     * Retry the request after trying to tender an access token
     */

    if (shouldRetryAfterTokenRefresh && unauthorized) {
      return await retryAfterTokenRefresh(requestEvent, body, accessor, errorHandler)
    }

    return runCallsiteErrorHandler(errorHandler, originalDeserialized.errors)
  }

async function retryAfterTokenRefresh<Body extends Record<string, unknown>>(
  requestEvent: RequestEvent,
  body: Body,
  accessor: string,
  errorHandler: ErrorHandler,
): Promise<EndpointOutput> {
  /**
   * Request a token refresh
   */

  const { response: refreshResponse, deserialized: refreshDeserialized } = await refreshToken(
    requestEvent,
  )

  if (!refreshDeserialized.errors) {
    /**
     * Sort the cookies so they can be used in the retry, and so that newly obtained access token
     * can be sent to the client.
     */

    const { merged, accessCookie } = mergeCookies(refreshResponse, requestEvent.request)

    /**
     * Retry the request after obtaining the access token, passing the access token to the server
     */

    const { deserialized: retriedDeserialized } = await makeRequest(body, {
      cookie: merged,
    })

    if (!retriedDeserialized.errors)
      return success(retriedDeserialized.data[accessor], {
        'Set-Cookie': accessCookie, // The client already has the refresh cookie, send the access cookie
      })

    return runCallsiteErrorHandler(errorHandler, retriedDeserialized.errors)
  }

  return runCallsiteErrorHandler(errorHandler, refreshDeserialized.errors)
}

function mergeCookies(refreshResponse: Response, endpointRequest: Request) {
  const [accessCookie] = setCookieParser.splitCookiesString(
    refreshResponse.headers.get('set-cookie'),
  )
  const refreshCookie = endpointRequest.headers.get('cookie')
  const cookies = [accessCookie, refreshCookie].join(', ')

  return {
    accessCookie,
    refreshCookie,
    merged: cookies,
  }
}

function runCallsiteErrorHandler(
  errorHandler: ErrorHandler,
  errors: GraphQLError[],
): EndpointOutput {
  if (errorHandler) {
    const output = errorHandler(errors)
    if (output) return output
  }

  return genericErrorOutput()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function success(body: any, headers: Partial<ResponseHeaders> = undefined): EndpointOutput {
  return {
    status: 200,
    body,
    headers,
  }
}

function genericErrorOutput(): EndpointOutput {
  return {
    status: 500,
    body: {
      error: {
        message: 'An unknown error occurred',
      },
    },
  }
}

async function makeRequest<Body extends Record<string, unknown>>(body: Body, headers: HeadersInit) {
  const response = await fetch(...gqlRequest(body, headers))
  const deserialized = await response.json()

  return {
    response,
    deserialized,
  }
}

async function refreshToken({ request, locals }: RequestEvent) {
  const refreshResponse = await fetch(
    ...gqlRequest(
      {
        query: refreshAccessToken,
      },
      {
        cookie: request.headers.get('cookie'),
      },
    ),
  )

  const deserialized: { errors?: GraphQLError[]; data: { refreshAccessToken: unknown } } =
    await refreshResponse.json()

  if (!deserialized.errors) {
    locals.user = deserialized.data.refreshAccessToken
  }

  return {
    response: refreshResponse,
    deserialized,
  }
}
