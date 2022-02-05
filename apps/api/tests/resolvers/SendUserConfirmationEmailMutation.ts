import { test } from 'uvu'
import * as assert from 'uvu/assert'
import jwt from 'jsonwebtoken'

import {
  queryTestUser,
  setup,
  EMAIL,
} from '../../test-utils/authenticate/setup'
import { teardown } from '../../test-utils/authenticate/teardown'
import { request, gqlRequestInit } from '../../test-utils/gqlRequest'
import { verifyEmailAddressMutation } from './VerifyEmailAddressMutation'

const sendUserConfirmationEmailQuery = (): string => `
mutation SendUserConfirmationEmail ($email: String!) {
  sendUserConfirmationEmail(email: $email)
}
`

const makeRequest = async () => {
  const requestInit = gqlRequestInit({
    query: sendUserConfirmationEmailQuery(),
    variables: {
      email: EMAIL,
    },
  })

  return await request(requestInit)
}

test.before.each(async () => {
  assert.equal(await queryTestUser(), null)
})

test('SendUserConfirmationEmailMutation fails if user not registered', async () => {
  const response = await makeRequest()

  assert.is(response.data, null)
  assert.is(
    true,
    response.errors.some(
      (error: any) =>
        error.message === 'Unable to find user with provided credentials.',
    ),
  )
})

test('SendUserConfirmationEmailMutation succeeds under normal circumstances', async () => {
  await setup()

  const response = await makeRequest()

  assert.equal(response.data, {
    sendUserConfirmationEmail: true,
  })
  assert.is(undefined, response.errors)
})

test('SendUserConfirmationEmailMutation fails if the user has already verified their email', async () => {
  await setup()

  const response = await makeRequest()

  assert.equal(response.data, {
    sendUserConfirmationEmail: true,
  })
  assert.is(undefined, response.errors)

  /**
   * Verify the user
   */

  const verifyEmailRequestInit = gqlRequestInit({
    query: verifyEmailAddressMutation(),
    variables: {
      email: EMAIL,
      token: jwt.sign(
        { id: (await queryTestUser())!.id },
        process.env.TOKEN_SECRET!,
        {
          expiresIn: 60 * 5,
        },
      ),
    },
  })

  const verifyResponse = await request(verifyEmailRequestInit)
  console.log({ verifyResponse })

  const secondTry = await makeRequest()

  assert.is(secondTry.data, null)
  assert.is(
    true,
    secondTry.errors.some(
      (error: any) =>
        error.message === 'User email address is already verified',
    ),
  )
})

test.after.each(async () => {
  await teardown()
})

test.run()
