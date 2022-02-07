import { test } from 'uvu'
import * as assert from 'uvu/assert'
import dayjs from 'dayjs'
import {
  registerUser,
  authenticateUser,
  queryTestUser,
} from '../../test-utils/authenticate/setup'
import { teardown } from '../../test-utils/authenticate/teardown'
import { gqlRequestInit, request } from '../../test-utils/gqlRequest'
import { prisma } from '../../prisma/prisma.config'
import setCookieParser from 'set-cookie-parser'

test.before.each(async () => {
  await registerUser()
})

test.after.each(async () => {
  await teardown()
})

const refreshAccessTokenMutation = `#graphql
mutation RefreshAccessToken {
  refreshAccessToken
}`

const logOutMutation = `#graphql
mutation LogOut {
  logOut
}
`

test('RefreshAccessTokenMutation fails if no refresh access token in cookie', async () => {
  /**
   * Don't authenticate and try the mutation.
   */

  const init = gqlRequestInit({
    query: refreshAccessTokenMutation,
  })

  const response = await request(init, false)
  const deserialized = await response.json()

  assert.is(deserialized.errors[0].message, 'Unauthorized - no refresh cookie')
})

test('RefreshAccessTokenMutation succeeds if refresh token is valid', async () => {
  /**
   * Authenticate the user. Use the refresh cookie from authentication to
   * tender an access token.
   */

  const authResponse = await authenticateUser(undefined, false)
  const refreshCookie = authResponse.headers.get('set-cookie')

  const refreshInit = gqlRequestInit(
    {
      query: refreshAccessTokenMutation,
    },
    {
      cookie: refreshCookie,
    },
  )

  const refreshResponse = await request(refreshInit)

  assert.is(refreshResponse.data.refreshAccessToken, true)
  assert.is(refreshResponse.errors, undefined)
})

test('RefreshAccessTokenMutation does not tender access tokens to banned users', async () => {
  /**
   * Log the user in. Store the refresh cookie.
   */
  const authResponse = await authenticateUser(undefined, false)
  const refreshCookie = authResponse.headers.get('set-cookie')

  /**
   * Ban the user after they're logged in.
   */

  const user = await queryTestUser()
  await prisma.user.update({
    where: { id: user!.id },
    data: { banned: true },
  })

  /**
   * Try to tender the access cookie
   */

  const init = gqlRequestInit(
    {
      query: refreshAccessTokenMutation,
    },
    { cookie: refreshCookie },
  )

  const response = await request(init, false)
  const deserialized = await response.json()

  const responseCookies = setCookieParser.splitCookiesString(
    response.headers.get('set-cookie'),
  )

  assert.is(deserialized.errors[0].message, 'Unauthorized - banned')
  assert.is(
    responseCookies.every((cookie: string) => {
      const parsed = setCookieParser.parseString(cookie)
      return dayjs(parsed.expires).isSame(
        dayjs('Thu, 01 Jan 1970 00:00:00 GMT'),
      )
    }),
    true,
  )
})

test('RefreshAccessTokenMutation does not tender access token to users that are logged out', async () => {
  /**
   * Log the user in. Store the refresh cookie.
   */

  const authResponse = await authenticateUser(undefined, false)
  const refreshCookie = authResponse.headers.get('set-cookie')

  /**
   * Furnish an access cookie for log out to work.
   */

  const refreshInit = gqlRequestInit(
    {
      query: refreshAccessTokenMutation,
    },
    { cookie: refreshCookie },
  )

  const refreshResponse1 = await request(refreshInit, false)
  const accessCookie = refreshResponse1.headers.get('set-cookie')

  /**
   * Log the user out.
   */

  const logoutInit = gqlRequestInit(
    {
      query: logOutMutation,
    },
    { cookie: [accessCookie, refreshCookie].join('; ') },
  )
  await request(logoutInit)

  /**
   * Try to refresh the cookie
   */

  const refreshResponse2 = await request(refreshInit)

  assert.is(refreshResponse2.errors[0].message, 'Unauthorized - token expired')
})

test.run()
