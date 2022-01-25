import jwt from 'jsonwebtoken'

import { ErrorWithProps } from '../utility/ErrorWithProps'
import { unsignCookie } from '../utility/unsignCookie'

import type { PrismaClient } from '@prisma/client'
import type { AuthChecker, ResolverData } from 'type-graphql'
import type { Context } from '../types/Context'

/**
 * Here, "checkAuthorization" refers to checking the role(s)
 * required to perform a mutation / query / field resolver.
 *
 * @param userId - The user id from the token payload
 * @param roles - The roles required by the @Authorized() decorator
 * @param prisma - The ORM instance
 * @returns boolean
 */
const checkAuthorization = async (
  userId: string,
  roles: string[],
  prisma: PrismaClient,
): Promise<boolean> => {
  if (roles.length === 0) return true

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (roles.includes('ADMIN') && !user?.isAdmin) return false

  return true
}

export const isAuthorized: AuthChecker<Context> = async (
  { context }: ResolverData<Context>,
  roles: string[], // The roles passed into the @Authorized() decorator
): Promise<boolean> => {
  const { req, prisma } = context

  const accessCookie = unsignCookie(req, '__Host-a')

  try {
    const { id } = jwt.verify(accessCookie, process.env.TOKEN_SECRET!)

    // Make the userId available in Context
    context.userId = id

    return await checkAuthorization(id, roles, prisma)
  } catch (error) {
    throw new ErrorWithProps('Unauthorized - invalid access token')
  }
}
