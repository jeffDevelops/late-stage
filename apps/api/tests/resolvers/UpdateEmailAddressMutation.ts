import { test } from 'uvu'
import * as assert from 'uvu/assert'
import jwt from 'jsonwebtoken'

import {
  setup,
  queryTestUser,
  EMAIL,
  refreshAccessToken,
} from '../../test-utils/authenticate/setup'
import { teardown } from '../../test-utils/authenticate/teardown'
import { gqlRequestInit, request } from '../../test-utils/gqlRequest'
import { verifyEmailAddressMutation } from './VerifyEmailAddressMutation'
import { prisma } from '../../prisma/prisma.config'

export const updateEmailAddressMutation = (
  subfields: string = 'id username email emailIsVerified createdAt banned isAdmin',
) => `#graphql
mutation UpdateEmailAddressMutation($newEmailAddress: String!) {
  updateEmailAddress(newEmailAddress: $newEmailAddress) {
    ${subfields}
  }
}`

test.before.each(async () => {
  await setup()
})

test.after.each(async () => {
  await teardown()
})

test("UpdateEmailAddress mutation updates the user's email address and sets the verification field back to false", async () => {
  // SETUP - ensure user created and has verified email address
  const user = await queryTestUser()

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

  assert.is(user?.email, EMAIL)
  assert.is(user?.emailIsVerified, false)

  const verifyUserInit = gqlRequestInit({
    query: verifyEmailAddressMutation(),
    variables: {
      token,
      email: EMAIL,
    },
  })

  await request(verifyUserInit)
  assert.is((await queryTestUser())?.emailIsVerified, true)

  const accessCookie = await refreshAccessToken()

  const NEW_EMAIL = 'newEmailAddress@gmail.com'

  const updateEmailAddressInit = gqlRequestInit(
    {
      query: updateEmailAddressMutation(),
      variables: {
        newEmailAddress: NEW_EMAIL,
      },
    },
    {
      cookie: accessCookie,
    },
  )

  const response = await request(updateEmailAddressInit)

  assert.is(response.errors, undefined)

  assert.is(response.data.updateEmailAddress.email, NEW_EMAIL)
  assert.is(response.data.updateEmailAddress.emailIsVerified, false)

  const updatedUser = await queryTestUser()

  assert.is(updatedUser?.emailIsVerified, false)
  assert.is(updatedUser?.email, NEW_EMAIL)
})

test('UpdateEmailAddressMutation fails when user cannot be contextualized', async () => {
  // SETUP - ensure user created and has verified email address
  const user = await queryTestUser()

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

  assert.is(user?.email, EMAIL)
  assert.is(user?.emailIsVerified, false)

  const verifyUserInit = gqlRequestInit({
    query: verifyEmailAddressMutation(),
    variables: {
      token,
      email: EMAIL,
    },
  })

  await request(verifyUserInit)
  assert.is((await queryTestUser())?.emailIsVerified, true)

  const NEW_EMAIL = 'newEmailAddress@gmail.com'

  const updateEmailAddressInit = gqlRequestInit({
    query: updateEmailAddressMutation(),
    variables: {
      newEmailAddress: NEW_EMAIL,
    },
  })

  const response = await request(updateEmailAddressInit)

  assert.is(
    response.errors.some(
      ({ message }: { message: string }) =>
        message === 'Unauthorized - no __Host-a cookie',
    ),
    true,
  )

  assert.is(response.data, null)

  const updatedUser = await queryTestUser()

  assert.is(updatedUser?.emailIsVerified, true)
  assert.is(updatedUser?.email, EMAIL)
})

test('UpdateEmailAddress mutation fails on invalid email address', async () => {
  // SETUP - ensure user created and has verified email address
  const user = await queryTestUser()

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

  assert.is(user?.email, EMAIL)
  assert.is(user?.emailIsVerified, false)

  const verifyUserInit = gqlRequestInit({
    query: verifyEmailAddressMutation(),
    variables: {
      token,
      email: EMAIL,
    },
  })

  await request(verifyUserInit)
  assert.is((await queryTestUser())?.emailIsVerified, true)

  const accessCookie = await refreshAccessToken()

  const NEW_EMAIL = 'invalidEmailAddress'

  const updateEmailAddressInit = gqlRequestInit(
    {
      query: updateEmailAddressMutation(),
      variables: {
        newEmailAddress: NEW_EMAIL,
      },
    },
    {
      cookie: accessCookie,
    },
  )

  const response = await request(updateEmailAddressInit)

  assert.is(
    response.errors.some(
      ({ message }: { message: string }) =>
        message === `Email address format invalid: received \"${NEW_EMAIL}\"`,
    ),
    true,
  )

  assert.is(response.data, null)

  const updatedUser = await queryTestUser()

  assert.is(updatedUser?.emailIsVerified, true)
  assert.is(updatedUser?.email, EMAIL)
})

test.run()
