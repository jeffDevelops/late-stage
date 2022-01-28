import { queryTestUser } from './setup'
import { prisma } from '../../prisma/prisma.config'
import { User } from '@generated/type-graphql/models/User'

export const teardown = async (user?: User) => {
  const testUser = user ? user : await queryTestUser()

  if (testUser) {
    await prisma.user.delete({
      where: {
        id: testUser.id,
      },
    })
  }
}
