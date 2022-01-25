import fetch from 'isomorphic-fetch'
import setCookieParser from 'set-cookie-parser'

import { currentUser } from '../../networking/graphql/query/CurrentUser'
import { gqlRequest } from '../../proxy/gqlRequest'
import { isPageRequest } from '../utility/isPageRequest'
import { refreshAccessToken } from '../../networking/graphql/mutation/RefreshAccessToken'

import type { Handle, RequestEvent } from '@sveltejs/kit/types/hooks'
import type { ResponseHeaders } from '@sveltejs/kit/types/helper'
import type { GraphQLError } from '../../types/GraphQLError'
import type { User } from '../../types/User'
import type { HandleInput } from './'
import type { LocalsImpl } from '../'

export const getCurrentUser: Handle<LocalsImpl> = async ({
  event,
  resolve,
}: HandleInput<LocalsImpl>): Promise<Response> => {
  if (!isPageRequest(event)) return await resolve(event)

  /** If the healthcheck fails, there's no point in trying */
  if (!event.locals.apiHealthy) return await resolve(event)

  console.log('getCurrentUser handle hook')

  const { deserialized: originalDeserialized, response: originalResponse } = await makeRequest({
    cookie: event.request.headers.get('cookie'),
  })

  console.log({ originalResponse, originalDeserialized })

  if (!originalDeserialized.errors) {
    event.locals.user = originalDeserialized.user
    return await resolve(event)
  }

  const unauthorized = originalDeserialized.errors.some(({ message }) =>
    message.startsWith('Unauthorized'),
  )

  /**
   * Retry the request after trying to tender an access token
   */

  if (unauthorized) {
    return await retryAfterTokenRefresh({ event, resolve })
  }

  if (originalDeserialized.errors) {
    console.log(originalDeserialized.errors)
    return await invalidateSession({ event, resolve })
  }

  return await success({ event, resolve }, originalDeserialized.user)
}

async function makeRequest(headers: HeadersInit) {
  const response = await fetch(
    ...gqlRequest(
      {
        query: currentUser(`
          id
          username
          email
          emailIsVerified
          banned
          createdAt
          cred
          isAdmin
        `),
      },
      headers,
    ),
  )

  const deserialized = await response.json()

  return {
    response,
    deserialized,
  }
}

async function retryAfterTokenRefresh({ event, resolve }) {
  /**
   * Request a token refresh
   */

  const { response: refreshResponse, deserialized: refreshDeserialized } = await refreshToken(event)

  if (!refreshDeserialized.errors) {
    /**
     * Sort the cookies so they can be used in the retry, and so that newly obtained access token
     * can be sent to the client.
     */

    const { merged, accessCookie } = mergeCookies(refreshResponse, event.request)

    /**
     * Retry the request after obtaining the access token, passing the access token to the server
     */

    const { deserialized: retriedDeserialized } = await makeRequest({
      cookie: merged,
    })

    if (!retriedDeserialized.errors)
      return success({ event, resolve }, retriedDeserialized.data.currentUser, {
        'Set-Cookie': accessCookie, // The client already has the refresh cookie, send the access cookie
      })

    return await invalidateSession({ event, resolve })
  }

  return await invalidateSession({ event, resolve })
}

async function invalidateSession({ event, resolve }: HandleInput<LocalsImpl>): Promise<Response> {
  event.locals.user = null
  return await resolve(event)
}

async function refreshToken({ request, locals }: RequestEvent) {
  const refreshResponse = await fetch(
    ...gqlRequest(
      {
        query: refreshAccessToken(`
            id
            email
            username
            emailIsVerified
            banned
            createdAt
          `),
      },
      {
        cookie: request.headers.get('cookie'),
      },
    ),
  )

  const deserialized: { errors?: GraphQLError[]; data: { refreshAccessToken: unknown } } =
    await refreshResponse.json()

  if (!deserialized.errors) {
    console.log(deserialized.data)
    locals.user = deserialized.data.refreshAccessToken
  }

  return {
    response: refreshResponse,
    deserialized,
  }
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function success(
  { event, resolve }: HandleInput<LocalsImpl>,
  user: User | null,
  headers: Partial<ResponseHeaders> = undefined,
): Promise<Response> {
  // Populate the session
  event.locals.user = user

  const response = await resolve(event)

  // Add the access cookie to the response headers
  Object.keys(headers).forEach((key) => {
    response.headers.set(key, headers[key] as string)
  })

  return response
}
