import { test } from 'uvu'
import * as assert from 'uvu/assert'
import {
  assertIsTestUser,
  authenticateUser,
  registerUser,
  DEFAULT_FIELDS,
} from '../../test-utils/authenticate/setup'
import { teardown } from '../../test-utils/authenticate/teardown'
import { gqlRequestInit, request } from '../../test-utils/gqlRequest'

test.before.each(async () => {
  await registerUser()
})

test.after.each(async () => {
  await teardown()
})

const currentUserQuery = (subfields: string): string => `#graphql
query {
  currentUser {
    ${subfields}
  }
}`

const refreshAccessTokenMutation = `#graphql
mutation RefreshAccessToken {
  refreshAccessToken
}`

test('CurrentUserQuery fails when the user is not logged in', async () => {
  const init = gqlRequestInit({
    query: currentUserQuery(
      'id email emailIsVerified isAdmin createdAt username',
    ),
  })

  const response = await request(init)

  assert.is(null, response.data)
  assert.is(
    true,
    response.errors[0].message === 'Unauthorized - no __Host-a cookie',
  )
})

test('CurrentUserQuery succeeds when the user is logged in', async () => {
  const authResponse = await authenticateUser(undefined, false)
  const refreshCookie = authResponse.headers.get('set-cookie')

  const refreshInit = gqlRequestInit(
    {
      query: refreshAccessTokenMutation,
    },
    { cookie: refreshCookie },
  )

  const refreshResponse = await request(refreshInit, false)
  const deserialized = await refreshResponse.json()
  const accessCookie = refreshResponse.headers.get('set-cookie')

  assert.is(deserialized.data.refreshAccessToken, true)

  const currentUserInit = gqlRequestInit(
    {
      query: currentUserQuery(DEFAULT_FIELDS),
    },
    { cookie: accessCookie },
  )

  const currentUserResponse = await request(currentUserInit)
  assertIsTestUser(currentUserResponse.data.currentUser)
})

test('CurrentUserQuery does not expose password or token fields', async () => {
  const authResponse = await authenticateUser(undefined, false)
  const refreshCookie = authResponse.headers.get('set-cookie')

  const refreshInit = gqlRequestInit(
    {
      query: refreshAccessTokenMutation,
    },
    { cookie: refreshCookie },
  )

  const refreshResponse = await request(refreshInit, false)
  const deserialized = await refreshResponse.json()
  const accessCookie = refreshResponse.headers.get('set-cookie')

  assert.is(deserialized.data.refreshAccessToken, true)

  const currentUserInit = gqlRequestInit(
    {
      query: currentUserQuery(
        `password magicLinkToken passwordResetToken ${DEFAULT_FIELDS}`,
      ),
    },
    { cookie: accessCookie },
  )

  const currentUserResponse = await request(currentUserInit)

  assert.is(
    true,
    currentUserResponse.errors.some(
      ({ message }: { message: string }) =>
        message === 'Cannot query field "password" on type "User".',
    ),
  )
  assert.is(
    true,
    currentUserResponse.errors.some(
      ({ message }: { message: string }) =>
        message === 'Cannot query field "magicLinkToken" on type "User".',
    ),
  )
  assert.is(
    true,
    currentUserResponse.errors.some(
      ({ message }: { message: string }) =>
        message === 'Cannot query field "passwordResetToken" on type "User".',
    ),
  )
})

test.run()
