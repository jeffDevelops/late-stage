import { test } from 'uvu'
import * as assert from 'uvu/assert'
import fetch from 'isomorphic-fetch'
import setCookieParser from 'set-cookie-parser'
import { gqlRequestInit, request } from '../../test-utils/gqlRequest'
import {
  EMAIL,
  PASSWORD,
  queryTestUser,
  authenticateUser,
  authenticateGQLQuery,
  registerUser,
  assertIsTestUser,
} from '../../test-utils/authenticate/setup'
import { teardown } from '../../test-utils/authenticate/teardown'
import { assertPasswordNotQueryable } from '../../test-utils/assertions/passwordNotQueryable'
import dayjs from 'dayjs'

test.before(async () => {
  assert.equal(await queryTestUser(), null)
})

test('AuthenticateUserMutation does not succeed if user not registered', async () => {
  const response = await authenticateUser(undefined, false)
  const deserialized = await response.json()

  assert.is(
    deserialized.errors.some(
      (error: any) =>
        error.message === 'Unable to find user with provided credentials.',
    ),
    true,
  )

  assert.is(deserialized.data, null)
  assert.is(Object.keys(response.headers).length, 0) // assert no cookies set
  assert.is(response.headers.get('set-cookie'), null)
})

test('AuthenticateUserMutation does not succeed if password incorrect', async () => {
  const INCORRECT_PASSWORD = 'incorrect'

  const INCORRECT_VARIABLES = {
    authenticateUserInput: {
      email: EMAIL,
      password: INCORRECT_PASSWORD,
    },
  }

  assert.is.not(PASSWORD, INCORRECT_PASSWORD)
  assert.is.not(PASSWORD, INCORRECT_VARIABLES.authenticateUserInput.password)

  await registerUser()

  assert.ok(await queryTestUser())

  const authRequestInit = gqlRequestInit({
    query: authenticateGQLQuery(),
    variables: INCORRECT_VARIABLES,
  })

  const authResponse = await request(authRequestInit, false)
  const deserialized = await authResponse.json()

  assert.is(deserialized.data, null)
  assert.is(
    deserialized.errors.some(
      (error: any) =>
        error.message === 'Unable to find user with provided credentials.',
    ),
    true,
  )
  assert.is(Object.keys(authResponse.headers).length, 0) // assert no cookies set
  assert.is(authResponse.headers.get('set-cookie'), null)
})

test('AuthenticateUserMutation succeeds if password correct', async () => {
  await registerUser()

  const testUser = await queryTestUser()
  assertIsTestUser(testUser)

  const authRequestInit = gqlRequestInit({
    query: authenticateGQLQuery(),
    variables: {
      authenticateUserInput: {
        email: EMAIL,
        password: PASSWORD,
      },
    },
  })

  const authResponse = await request(authRequestInit, false)
  const deserialized = await authResponse.json()

  assert.is(deserialized.errors, undefined)
  assert.is(true, deserialized.data.authenticateUser)

  const cookies = setCookieParser.parse(
    setCookieParser.splitCookiesString(authResponse.headers.get('set-cookie')),
  )

  const refreshCookie = cookies.find(({ name }) => name === '__Host-r')

  // Assert refresh cookie expires in 7 days with 3 seconds of leniency
  assert.is(dayjs().diff(dayjs(refreshCookie?.expires), 'days') < 7, true)

  assert.is(
    dayjs(refreshCookie?.expires).diff(dayjs(), 'seconds') >=
      // 3 seconds of leniency...
      60 * 60 * 24 * 6 + // 6 days
        60 * 60 * 23 + // 23 hours
        60 * 59 + // 59 minutes
        57, // 57 seconds
    true,
  )

  assert.is(cookies.length, 1)
  cookies.forEach(({ domain, path, secure, httpOnly }) => {
    assert.is(domain, undefined)
    assert.is(path, '/')
    assert.is(secure, true)
    assert.is(httpOnly, true)
  })
})

test.after.each(async () => {
  await teardown()
})

test.run()
