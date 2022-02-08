import * as assert from 'uvu/assert'
import type { Prisma, User } from '@prisma/client'
import { prisma } from '../../prisma/prisma.config'
import { gqlRequestInit, request } from '../gqlRequest'
import { teardown } from './teardown'

export const EMAIL = 'test@automatedtest.com'
export const USERNAME = 'automated_test'
export const PASSWORD = 'password123'

export const queryTestUser = async (
  username: string = USERNAME,
): Promise<Prisma.Prisma__UserClient<User | null>> =>
  await prisma.user.findUnique({
    where: {
      username,
    },
  })

export const DEFAULT_FIELDS = `id username email emailIsVerified banned isAdmin cred createdAt`

export const registrationGQLQuery = `
mutation RegisterUser($userRegistrationInput: UserRegistrationInput!) {
  registerUser(UserRegistrationInput: $userRegistrationInput)
}`

export const authenticateGQLQuery = (): string => `
mutation AuthenticateUser($authenticateUserInput: AuthenticateUserInput!) {
  authenticateUser(AuthenticateUserInput: $authenticateUserInput)
}
`

const USER_REGISTRATION_VARIABLES = {
  userRegistrationInput: {
    email: EMAIL,
    username: USERNAME,
    password: PASSWORD,
  },
}

const AUTHENTICATE_USER_VARIABLES = {
  authenticateUserInput: {
    email: EMAIL,
    password: PASSWORD,
  },
}

type UserFixture = { [key: string]: any } & Pick<User, 'email' | 'username'>

export const DEFAULT_TEST_USER: UserFixture = {
  username: 'automated_test',
  email: 'test@automatedtest.com',
  emailIsVerified: false,
  banned: false,
  isAdmin: false,
  cred: 0,
}

/**
 *
 * @param testSubject - a user object to test against the default fixture
 * @param fixture - allows tests to inject a fixture with desired values for comparison rather than the DEFAULT_TEST_USER fixture
 */
export const assertIsTestUser = (
  testSubject: null | ({ [key: string]: any } & User),
  fixture: { [key: string]: string } & Pick<
    User,
    'email' | 'username'
  > = DEFAULT_TEST_USER,
) => {
  assert.ok(testSubject)
  assert.ok(testSubject?.id) // dynamically created - would not be able to reliably test
  assert.ok(testSubject.createdAt) // dynamically created - would not be able to reliably test

  const allFieldsMatch = Object.keys(fixture).every((key: string) => {
    if (!testSubject) return false

    try {
      assert.is(testSubject[key], fixture[key])
      return true
    } catch (error) {
      return false
    }
  })

  assert.is(true, allFieldsMatch)
}

export const registerUser = async (
  fixture?: Pick<User, 'email' | 'username'>,
  deserialize = true,
) => {
  const variables = fixture
    ? {
        userRegistrationInput: {
          email: fixture.email,
          username: fixture.username,
          password: PASSWORD,
        },
      }
    : USER_REGISTRATION_VARIABLES

  const requestInit = gqlRequestInit({
    variables,
    query: registrationGQLQuery,
  })

  return await request(requestInit, deserialize)
}

export const authenticateUser = async (
  fixture?: Pick<User, 'email'>,
  deserialize = true,
) => {
  const variables = fixture
    ? {
        authenticateUserInput: {
          email: fixture.email,
          password: PASSWORD,
        },
      }
    : AUTHENTICATE_USER_VARIABLES

  const requestInit = gqlRequestInit({
    variables,
    query: authenticateGQLQuery(),
  })

  return await request(requestInit, deserialize)
}

/** Registers and logs user in, and accompanying database assertions */
export const setup = async (
  fixture: Pick<User, 'email' | 'username'> = DEFAULT_TEST_USER,
) => {
  const testUser = await queryTestUser()
  if (testUser) await teardown()

  assert.equal(testUser, null)

  await registerUser(fixture)
  await authenticateUser(fixture)

  assertIsTestUser(await queryTestUser(), fixture)
}
