import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { prisma } from '../../prisma/prisma.config'
import { gqlRequestInit, request } from '../../test-utils/gqlRequest'
import dayjs from 'dayjs'
import bcrypt from 'bcryptjs'
import {
  assertIsTestUser,
  queryTestUser,
} from '../../test-utils/authenticate/setup'
import { teardown } from '../../test-utils/authenticate/teardown'

const EMAIL = 'test@automatedtest.com'
const USERNAME = 'automated_test'
const PASSWORD = 'password123'

const gqlQuery = `
mutation RegisterUser($userRegistrationInput: UserRegistrationInput!) {
  registerUser(UserRegistrationInput: $userRegistrationInput)
}`

const VARIABLES = {
  userRegistrationInput: {
    email: EMAIL,
    username: USERNAME,
    password: PASSWORD,
  },
}

test.before.each(async () => {
  assert.equal(await queryTestUser(), null)
})

test.after.each(async () => {
  await teardown()
})

test('RegisterUserMutation creates a user', async () => {
  const requestInit = gqlRequestInit({
    query: gqlQuery,
    variables: VARIABLES,
  })

  const {
    data: { registerUser: response },
  } = await request(requestInit)

  const dbUser = await queryTestUser()

  assert.is(dbUser?.email, EMAIL)
  assert.is(dbUser?.username, USERNAME)

  // Password
  assert.is.not(dbUser?.password, PASSWORD)
  assert.is(bcrypt.compareSync(PASSWORD, dbUser?.password as string), true)
  assert.is(response.password, undefined)

  assert.ok(dbUser?.id)
  assert.is(dbUser?.isAdmin, false)
  assert.is(dbUser?.emailIsVerified, false)
  assert.is(dbUser?.banned, false)
  assert.equal(dbUser?.cred, 0)
  assert.is(dayjs().diff(dayjs(dbUser?.createdAt), 'minute') <= 1, true)

  await prisma.user.delete({
    where: {
      username: USERNAME,
    },
  })
  assert.equal(await queryTestUser(), null)
})

test('registerUser fails if the username already exists', async () => {
  /**
   * Create the original user
   */
  const requestInit = gqlRequestInit({
    query: gqlQuery,
    variables: VARIABLES,
  })

  const response = await request(requestInit)

  assert.is(true, response.data.registerUser)
  assert.is(undefined, response.errors)

  /**
   * Create another user with the same username
   */

  const DUPLICATE_ACCOUNT_EMAIL = 'differentemail@automatedtest.com'

  const duplicateUsernameRequestInit = gqlRequestInit({
    query: gqlQuery,
    variables: {
      userRegistrationInput: {
        ...VARIABLES.userRegistrationInput,
        email: DUPLICATE_ACCOUNT_EMAIL,
      },
    },
  })

  const duplicateUsernameResponse = await request(duplicateUsernameRequestInit)

  assert.is(null, duplicateUsernameResponse.data.registerUser)
  assert.is(
    true,
    duplicateUsernameResponse.errors.some(
      ({ message }: { message: string }) =>
        message ===
        'A user with that username already exists. Please try another.',
    ),
  )

  /**
   * Ensure the duplicate user is not created
   */

  const duplicateUser = await prisma.user.findUnique({
    where: {
      email: DUPLICATE_ACCOUNT_EMAIL,
    },
  })

  assert.is(null, duplicateUser)
})

test('registerUser opaquely SUCCEEDS if duplicate email provided so as not to let an attacker know that an email address exists as a user in the system', async () => {
  /**
   * Create the original user
   */
  const requestInit = gqlRequestInit({
    query: gqlQuery,
    variables: VARIABLES,
  })

  const response = await request(requestInit)

  assert.is(true, response.data.registerUser)
  assert.is(undefined, response.errors)

  /**
   * Create another user with the same email address
   */

  const DUPLICATE_ACCOUNT_USERNAME = 'different_username'

  const duplicateEmailRequestInit = gqlRequestInit({
    query: gqlQuery,
    variables: {
      userRegistrationInput: {
        ...VARIABLES.userRegistrationInput,
        username: DUPLICATE_ACCOUNT_USERNAME,
      },
    },
  })

  const duplicateEmailResponse = await request(duplicateEmailRequestInit)

  assert.is(true, duplicateEmailResponse.data.registerUser)
  assert.is(undefined, duplicateEmailResponse.errors)

  /**
   * Ensure the duplicate user is not created
   */

  const duplicateUser = await prisma.user.findUnique({
    where: {
      username: DUPLICATE_ACCOUNT_USERNAME,
    },
  })

  assert.is(null, duplicateUser)
})

test.run()
