import { test } from 'uvu'
import * as assert from 'uvu/assert'

import {
  setup,
  queryTestUser,
  refreshAccessToken,
  USERNAME,
} from '../../test-utils/authenticate/setup'
import { teardown } from '../../test-utils/authenticate/teardown'
import { gqlRequestInit, request } from '../../test-utils/gqlRequest'
import { prisma } from '../../prisma/prisma.config'

export const updateUsernameMutation = (
  subfields: string = 'id username email emailIsVerified createdAt banned isAdmin',
) => `#graphql
  mutation UpdateUsernameMutation($newUsername: String!) {
    updateUsername(newUsername: $newUsername) {
      ${subfields}
    }
  }
`

test.before.each(async () => {
  await setup()
})

test.after.each(async () => {
  await teardown()
})

test("UpdateUsername mutation updates the user's username", async () => {
  // SETUP - ensure user created and has verified email address
  const user = await queryTestUser()
  const accessCookie = await refreshAccessToken()

  const NEW_USERNAME = 'updatedUsername'

  const updateUsernameInit = gqlRequestInit(
    {
      query: updateUsernameMutation(),
      variables: {
        newUsername: NEW_USERNAME,
      },
    },
    {
      cookie: accessCookie,
    },
  )

  const response = await request(updateUsernameInit)

  assert.is(response.data.updateUsername.username, NEW_USERNAME)

  const updatedUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  })

  assert.is(updatedUser?.username, NEW_USERNAME)

  // TEARDOWN - manually teardown user, since the default query relies on the username
  await prisma.user.delete({
    where: {
      username: NEW_USERNAME,
    },
  })
})

test('UpdateUsername mutation fails if no user contextualized', async () => {
  // SETUP - ensure user created and has verified email address
  const user = await queryTestUser()

  const NEW_USERNAME = 'updatedUsername'

  const updateUsernameInit = gqlRequestInit({
    query: updateUsernameMutation(),
    variables: {
      newUsername: NEW_USERNAME,
    },
  })

  const response = await request(updateUsernameInit)

  assert.is(response.data, null)
  assert.is(
    response.errors.some(
      ({ message }: { message: string }) =>
        message === 'Unauthorized - no __Host-a cookie',
    ),
    true,
  )

  const updatedUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  })

  assert.is.not(updatedUser?.username, NEW_USERNAME)
  assert.is(updatedUser?.username, USERNAME)
})

test("UpdateUsername mutation fails if a user already has the requester's new username", async () => {
  const user1 = await queryTestUser()
  const TAKEN_USERNAME = 'TAKEN_USERNAME'

  // Create a user that has the requester's desired new username
  const user2 = await prisma.user.create({
    data: {
      username: TAKEN_USERNAME,
      email: 'user2@gmail.com',
      password: 'test',
      emailIsVerified: true,
      cred: 0,
      isAdmin: false,
    },
  })

  const updateUsernameInit = gqlRequestInit({
    query: updateUsernameMutation(),
    variables: {
      newUsername: TAKEN_USERNAME,
    },
  })

  const response = await request(updateUsernameInit)

  assert.is(response.data, null)
  assert.is(
    response.errors.some(
      ({ message }: { message: string }) =>
        message === 'Unauthorized - no __Host-a cookie',
    ),
    true,
  )

  const updatedUser = await prisma.user.findUnique({
    where: {
      id: user1?.id,
    },
  })

  assert.is.not(updatedUser?.username, TAKEN_USERNAME)
  assert.is(updatedUser?.username, USERNAME)

  // TEARDOWN - delete the user that had already taken the desired username
  await prisma.user.delete({
    where: {
      id: user2?.id,
    },
  })
})

test.run()
