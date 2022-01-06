/**
 * Ensure that the CreateUserResolver is present, and that it creates a User record in the db
 */

import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { prisma } from '../../prisma/prisma.config'
import type { Prisma, User } from '@prisma/client'

const EMAIL = 'test@automated_test.com'
const USERNAME = 'automated_test'
const PASSWORD = 'password123'

const queryTestUser = async (): Promise<
  Prisma.Prisma__UserClient<User | null>
> =>
  await prisma.user.findUnique({
    where: {
      username: 'automated_test',
    },
  })

test.before(async () => {
  assert.equal(await queryTestUser(), null)
})

test('CreateUserResolver exists and creates a user', async () => {
  await prisma.user.create({
    data: {
      username: USERNAME,
      email: EMAIL,
      password: PASSWORD,

      emailIsVerified: false,
      cred: 0,
    },
  })
})

test.after(async () => {
  await prisma.user.delete({
    where: {
      username: 'automated_test',
    },
  })

  assert.equal(await queryTestUser(), null)
})

test.run()
