import { test } from 'uvu'
import * as assert from 'uvu/assert'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {
  registerUser,
  EMAIL,
  queryTestUser,
} from '../../test-utils/authenticate/setup'
import { teardown } from '../../test-utils/authenticate/teardown'
import { gqlRequestInit, request } from '../../test-utils/gqlRequest'
import { wait } from '../../test-utils/wait'

test.before.each(async () => {
  await registerUser()
})

test.after.each(async () => {
  await teardown()
})

const UPDATE_PASSWORD_MUTATION = `#graphql
mutation UpdatePassword($email: String!, $token: String!, $password: String!) {
  updatePassword(email: $email, token: $token, password: $password)
}`

const SEND_PASSWORD_RESET_EMAIL_MUTATION = `#graphql
mutation SendPasswordResetEmail($email: String!) {
  sendPasswordResetEmail(email: $email)
}`

test('UpdatePasswordResolver fails if the email does not match the JWT identified user', async () => {
  /**
   * We don't have access to the token from the email in the tests, so in order
   * to ensure that the same JWT is used in the test subject mutation, we need
   * to fire off the SendPasswordResetEmail mutation first, and query the test
   * user's passwordResetToken.
   */

  const sendPasswordResetEmailInit = gqlRequestInit({
    query: SEND_PASSWORD_RESET_EMAIL_MUTATION,
    variables: {
      email: EMAIL,
    },
  })

  const sendPasswordResetEmailResponse = await request(
    sendPasswordResetEmailInit,
  )

  assert.is(true, sendPasswordResetEmailResponse.data.sendPasswordResetEmail)

  const resetToken = (await queryTestUser())?.passwordResetToken

  assert.ok(resetToken)

  const init = gqlRequestInit({
    query: UPDATE_PASSWORD_MUTATION,
    variables: {
      email: 'not_the_test_user_email@address.com',
      token: resetToken,
      password: 'new_password',
    },
  })

  const response = await request(init)

  assert.is(response.data, null)
  assert.is(
    response.errors.some(
      ({ message }: { message: string }) =>
        message ===
        'User from the provided token and email address do not match.',
    ),
    true,
  )
})

test('UpdatePasswordResolver fails when used twice in a row with valid inputs', async () => {
  const sendPasswordResetEmailInit = gqlRequestInit({
    query: SEND_PASSWORD_RESET_EMAIL_MUTATION,
    variables: {
      email: EMAIL,
    },
  })

  const sendPasswordResetEmailResponse = await request(
    sendPasswordResetEmailInit,
  )

  assert.is(true, sendPasswordResetEmailResponse.data.sendPasswordResetEmail)

  const resetToken = (await queryTestUser())?.passwordResetToken

  assert.ok(resetToken)

  const init = gqlRequestInit({
    query: UPDATE_PASSWORD_MUTATION,
    variables: {
      email: EMAIL,
      token: resetToken,
      password: 'new_password',
    },
  })

  const response = await request(init)

  assert.is(response.data.updatePassword, true)

  const init2 = gqlRequestInit({
    query: UPDATE_PASSWORD_MUTATION,
    variables: {
      email: EMAIL,
      token: resetToken,
      password: 'new_password',
    },
  })

  const response2 = await request(init2)

  assert.is(response2.data, null)
  assert.is(
    response2.errors.some(
      ({ message }: { message: string }) =>
        message === 'Token in magic link was used already',
    ),
    true,
  )
})

test('UpdatePasswordResolver fails when the JWT does not match the one issued in the email', async () => {
  const sendPasswordResetEmailInit = gqlRequestInit({
    query: SEND_PASSWORD_RESET_EMAIL_MUTATION,
    variables: {
      email: EMAIL,
    },
  })

  const sendPasswordResetEmailResponse = await request(
    sendPasswordResetEmailInit,
  )

  assert.is(true, sendPasswordResetEmailResponse.data.sendPasswordResetEmail)

  const testUser = await queryTestUser()

  const actualRefreshToken = testUser?.passwordResetToken
  assert.ok(actualRefreshToken)

  await wait(1000)

  const fakeRefreshToken = jwt.sign(
    { id: testUser!.id },
    process.env.TOKEN_SECRET!,
  )

  assert.not.equal(actualRefreshToken, fakeRefreshToken)

  const init = gqlRequestInit({
    query: UPDATE_PASSWORD_MUTATION,
    variables: {
      email: EMAIL,
      token: fakeRefreshToken,
      password: 'new_password',
    },
  })

  const response = await request(init)

  assert.is(response.data, null)
  assert.is(
    response.errors.some(
      ({ message }: { message: string }) =>
        message ===
        'Token in magic link does not match the one that was most recently issued',
    ),
    true,
  )
})

test("UpdatePasswordResolver succeeds when provided valid inputs; it updates the user's password, and verifies the user's email", async () => {
  const sendPasswordResetEmailInit = gqlRequestInit({
    query: SEND_PASSWORD_RESET_EMAIL_MUTATION,
    variables: {
      email: EMAIL,
    },
  })

  const sendPasswordResetEmailResponse = await request(
    sendPasswordResetEmailInit,
  )

  assert.is(true, sendPasswordResetEmailResponse.data.sendPasswordResetEmail)

  const resetToken = (await queryTestUser())?.passwordResetToken

  assert.ok(resetToken)

  const init = gqlRequestInit({
    query: UPDATE_PASSWORD_MUTATION,
    variables: {
      email: EMAIL,
      token: resetToken,
      password: 'new_password',
    },
  })

  const response = await request(init)

  assert.is(response.data.updatePassword, true)

  const updatedUser = await queryTestUser()

  assert.is(updatedUser?.emailIsVerified, true)
  assert.is(true, bcrypt.compareSync('new_password', updatedUser?.password!))
})

test('UpdatePasswordResolver fails if user deleted before password is updated', async () => {
  const sendPasswordResetEmailInit = gqlRequestInit({
    query: SEND_PASSWORD_RESET_EMAIL_MUTATION,
    variables: {
      email: EMAIL,
    },
  })

  const sendPasswordResetEmailResponse = await request(
    sendPasswordResetEmailInit,
  )

  assert.is(true, sendPasswordResetEmailResponse.data.sendPasswordResetEmail)

  const resetToken = (await queryTestUser())?.passwordResetToken

  assert.ok(resetToken)

  await teardown()

  const init = gqlRequestInit({
    query: UPDATE_PASSWORD_MUTATION,
    variables: {
      email: EMAIL,
      token: resetToken,
      password: 'new_password',
    },
  })

  const response = await request(init)

  assert.is(response.data, null)
  assert.is(
    response.errors.some(
      ({ message }: { message: string }) =>
        message ===
        'Unable to find user specified in magic link. Was the user deleted recently?',
    ),
    true,
  )
})

test.run()
