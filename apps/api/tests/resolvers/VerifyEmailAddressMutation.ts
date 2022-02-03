import { test } from 'uvu'
import * as assert from 'uvu/assert'
import jwt from 'jsonwebtoken'
import {
  setup,
  USERNAME,
  EMAIL,
  queryTestUser,
  registerUser,
  DEFAULT_FIELDS,
} from '../../test-utils/authenticate/setup'
import { teardown } from '../../test-utils/authenticate/teardown'
import { assertPasswordNotQueryable } from '../../test-utils/assertions/passwordNotQueryable'
import { gqlRequestInit, request } from '../../test-utils/gqlRequest'
import { wait } from '../../test-utils/wait'
import { prisma } from '../../prisma/prisma.config'

export const verifyEmailAddressMutation = (
  subfields: string = DEFAULT_FIELDS,
): string => `#graphql
mutation VerifyEmailAddress ($email: String!, $token: String!) {
  verifyEmailAddress(email: $email, token: $token) {
    ${subfields}
  }
}
`

test.before.each(async () => await setup())

test.after.each(async () => {
  await teardown()
})

test("VerifyEmailAddressResolver succeeds and updates the user's emailIsVerified field to true", async () => {
  const token = jwt.sign(
    { id: (await queryTestUser())!.id },
    process.env.TOKEN_SECRET!,
  )

  /**
   * Simulate the single-use token mechanism of saving the magic link token
   * by updating the user with the test token value.
   */
  await prisma.user.update({
    where: {
      email: EMAIL,
    },
    data: {
      magicLinkToken: token,
    },
  })

  const requestInit = gqlRequestInit({
    query: verifyEmailAddressMutation(),
    variables: {
      token,
      email: EMAIL,
    },
  })

  const response = await request(requestInit)

  assert.is(undefined, response.errors)

  const {
    username,
    email,
    emailIsVerified,
    banned,
    isAdmin,
    cred,
    createdAt,
    id,
  } = response.data.verifyEmailAddress

  assert.ok(id)
  assert.ok(createdAt)
  assert.is(USERNAME, username)
  assert.is(EMAIL, email)
  assert.is(true, emailIsVerified)
  assert.is(false, banned)
  assert.is(0, cred)
  assert.is(false, isAdmin)
})

test('VerifyEmailAddressResolver does not expose password in its User subfields', async () => {
  const requestInit = gqlRequestInit({
    query: verifyEmailAddressMutation('password'), // TRY TO QUERY PASSWORD
    variables: {
      email: EMAIL,
      token: jwt.sign(
        { id: (await queryTestUser())!.id },
        process.env.TOKEN_SECRET!,
      ),
    },
  })

  const response = await request(requestInit)
  assertPasswordNotQueryable(response)
})

test('VerifyEmailAddressResolver throws if jwt malformed', async () => {
  const requestInit = gqlRequestInit({
    query: verifyEmailAddressMutation(),
    variables: {
      email: EMAIL,
      token: 'INVALID FORMAT',
    },
  })

  const response = await request(requestInit)

  assert.is(
    true,
    response.errors.some(
      (error: { message: string }) => error.message === 'JWT malformed',
    ),
  )

  assert.is(null, response.data)
})

test('VerifyEmailAddressResolver throws if jwt invalid', async () => {
  const requestInit = gqlRequestInit({
    query: verifyEmailAddressMutation(),
    variables: {
      email: EMAIL,
      token: 'j.w.t',
    },
  })

  const response = await request(requestInit)

  assert.is(
    true,
    response.errors.some(
      (error: { message: string }) => error.message === 'JWT invalid',
    ),
  )

  assert.is(null, response.data)
})

test('VerifyEmailAddressResolver throws if jwt string empty', async () => {
  const requestInit = gqlRequestInit({
    query: verifyEmailAddressMutation(),
    variables: {
      email: EMAIL,
      token: '',
    },
  })

  const response = await request(requestInit)

  assert.is(
    true,
    response.errors.some(
      (error: { message: string }) =>
        error.message === 'JWT was not provided; received empty string',
    ),
  )

  assert.is(null, response.data)
})

test('VerifyEmailAddressResolver throws if jwt expired', async () => {
  const requestInit = gqlRequestInit({
    query: verifyEmailAddressMutation(),
    variables: {
      email: EMAIL,
      token: jwt.sign(
        { id: (await queryTestUser())!.id },
        process.env.TOKEN_SECRET!,
        {
          expiresIn: 0, // ISSUE EXPIRED TOKEN
        },
      ),
    },
  })

  const response = await request(requestInit)

  assert.is(
    true,
    response.errors.some(
      (error: { message: string }) =>
        error.message ===
        'JWT expired. Please send yourself another confirmation email and try again.',
    ),
  )

  assert.is(null, response.data)
})

test('VerifyEmailAddressResolver throws if JWT signature invalid', async () => {
  const BAD_ACTOR_USERNAME = 'bad.actor'

  // Bad actor creates a new user
  await registerUser({
    email: 'badactor@automatedtest.com',
    username: BAD_ACTOR_USERNAME,
  })
  const badActorUser = await queryTestUser(BAD_ACTOR_USERNAME)

  // Bad actor tries to sign JWT with their id, but doesn't have secret
  const tamperedToken = jwt.sign({ id: badActorUser!.id }, 'INVALID_SECRET')

  const requestInit = gqlRequestInit({
    query: verifyEmailAddressMutation(),
    variables: {
      email: EMAIL,
      token: tamperedToken,
    },
  })

  const response = await request(requestInit)

  assert.is(null, response.data)
  assert.is(
    true,
    response.errors.some(
      (error: { message: string }) => error.message === 'JWT signature invalid',
    ),
  )

  await teardown(badActorUser!)
})

test('VerifyEmailAddressResolver throws if email from query is invalid format', async () => {
  const requestInit = gqlRequestInit({
    query: verifyEmailAddressMutation(),
    variables: {
      email: 'INVALID EMAIL ADDRESS FORMAT',
      token: jwt.sign(
        { id: (await queryTestUser())!.id },
        process.env.TOKEN_SECRET!,
      ),
    },
  })

  const response = await request(requestInit)

  assert.is(null, response.data)
  assert.is(
    true,
    response.errors.some(
      (error: { message: string }) =>
        error.message ===
        'Email address format invalid: received "INVALID EMAIL ADDRESS FORMAT"',
    ),
  )
})

test('VerifyEmailAddressResolver throws if email from query does not match the email of the JWT user', async () => {
  /**
   * This scenario could occur if changing email functionality is introduced,
   * or if a bad actor tries to verify their email with another user's JWT
   */

  const INVALID_EMAIL = 'invalid@automatedtest.com'

  /**
   * Simulate the single-use token mechanism of saving the magic link token
   * by updating the user with the test token value. (It'll fail for this reason
   * before failing for mismatched emails).
   */

  const token = jwt.sign(
    { id: (await queryTestUser())!.id },
    process.env.TOKEN_SECRET!,
  )

  await prisma.user.update({
    where: {
      email: EMAIL,
    },
    data: {
      magicLinkToken: token,
    },
  })

  const requestInit = gqlRequestInit({
    query: verifyEmailAddressMutation(),
    variables: {
      email: INVALID_EMAIL,
      token,
    },
  })

  const response = await request(requestInit)

  assert.is(null, response.data)
  assert.is(
    true,
    response.errors.some(
      (error: { message: string }) =>
        error.message ===
        'User from the provided token and email address do not match.',
    ),
  )
})

test('VerifyEmailAddressResolver ensures the magic link token is single-use', async () => {
  /**
   * It doesn't matter what a bad actor (or a user not following the happy path)
   * is trying to do, but for this test, the user fails initially because the email
   * doesn't match the one associated with the JWT in the database.
   *
   * What matters is that the request fails the second time because the token was used
   * already.
   */

  const INVALID_EMAIL = 'invalid@automatedtest.com'

  const token = jwt.sign(
    { id: (await queryTestUser())!.id },
    process.env.TOKEN_SECRET!,
  )

  await prisma.user.update({
    where: {
      email: EMAIL,
    },
    data: {
      magicLinkToken: token,
    },
  })

  const requestInit = gqlRequestInit({
    query: verifyEmailAddressMutation(),
    variables: {
      email: INVALID_EMAIL,
      token,
    },
  })

  const response = await request(requestInit)

  assert.is(null, response.data)
  assert.is(
    true,
    response.errors.some(
      (error: { message: string }) =>
        error.message ===
        'User from the provided token and email address do not match.',
    ),
  )

  /**
   * Try making a valid call with a token that has already been used.
   */

  const alreadyUsedInit = gqlRequestInit({
    query: verifyEmailAddressMutation(),
    variables: {
      email: EMAIL, // VALID EMAIL, THIS TIME
      token, // SAME TOKEN THAT WAS USED BEFORE
    },
  })

  const alreadyUsedResponse = await request(alreadyUsedInit)

  assert.is(null, alreadyUsedResponse.data)
  assert.is(
    true,
    alreadyUsedResponse.errors.some(
      (error: { message: string }) =>
        error.message === 'Token in magic link was used already',
    ),
  )
})

test('VerifyEmailAddressResolver throws if called after user no longer exists', async () => {
  /**
   * This scenario could occur if functionality is introduced to delete users
   */

  const id = (await queryTestUser())!.id
  await teardown()

  const requestInit = gqlRequestInit({
    query: verifyEmailAddressMutation(),
    variables: {
      email: EMAIL,
      token: jwt.sign({ id }, process.env.TOKEN_SECRET!),
    },
  })

  const response = await request(requestInit)

  assert.is(null, response.data)
  assert.is(
    true,
    response.errors.some(
      (error: { message: string }) =>
        error.message ===
        'Unable to find user specified in magic link. Was the user deleted recently?',
    ),
  )
})

test('VerifyEmailAddressResolver throws if everything is valid, except that the token does not match the one most recently issued', async () => {
  const token = jwt.sign(
    { id: (await queryTestUser())!.id },
    process.env.TOKEN_SECRET!,
    {
      expiresIn: 60 * 5, // 5 minutes
    },
  )

  /**
   * Wait to issue a new token; the encoding will be different with the different issuedAt time
   */
  await wait(2000)
  const badToken = jwt.sign(
    { id: (await queryTestUser())!.id },
    process.env.TOKEN_SECRET!,
    {
      expiresIn: 60 * 5, // 5 minutes
    },
  )

  await prisma.user.update({
    where: {
      email: EMAIL,
    },
    data: {
      magicLinkToken: token,
    },
  })

  const requestInit = gqlRequestInit({
    query: verifyEmailAddressMutation(),
    variables: {
      email: EMAIL,
      token: badToken,
    },
  })

  const response = await request(requestInit)

  assert.is(response.data, null)
  assert.is(
    true,
    response.errors.some(
      ({ message }: { message: string }) =>
        message ===
        'Token in magic link does not match the one that was most recently issued',
    ),
  )
})

test.run()
