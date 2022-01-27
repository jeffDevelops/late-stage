import { test } from 'uvu'
import * as assert from 'uvu/assert'
import {
  registerUser,
  EMAIL,
  queryTestUser,
} from '../../test-utils/authenticate/setup'
import { teardown } from '../../test-utils/authenticate/teardown'
import { gqlRequestInit, request } from '../../test-utils/gqlRequest'

const SEND_PASSWORD_RESET_EMAIL_MUTATION = `#graphql
mutation SendPasswordResetEmail($email: String!) {
  sendPasswordResetEmail(email: $email)
}
`

test.before.each(async () => {
  await registerUser()
})

test.after.each(async () => {
  await teardown()
})

test('SendPasswordResetEmailResolver succeeds when the email exists', async () => {
  const init = gqlRequestInit({
    query: SEND_PASSWORD_RESET_EMAIL_MUTATION,
    variables: { email: EMAIL },
  })

  const response = await request(init)

  assert.is(response.data.sendPasswordResetEmail, true)

  const user = await queryTestUser()

  assert.is.not(user?.passwordResetToken, null)
})

test('SendPasswordResetEmailResolver SILENTLY fails when the user does not exist so as not to divulge whether emails exist in the system', async () => {
  const init = gqlRequestInit({
    query: SEND_PASSWORD_RESET_EMAIL_MUTATION,
    variables: { email: 'doesntexist@gmail.com' },
  })

  const response = await request(init)

  assert.is(response.data.sendPasswordResetEmail, true)
})

test.run()
