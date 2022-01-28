import { Ctx, Mutation, Resolver } from 'type-graphql'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dayjs from 'dayjs'

import type { Context } from '../../types/Context'
import type { PrismaClient } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { unsignCookie } from '../../utility/unsignCookie'

@Resolver()
export abstract class LogOutResolver {
  @Mutation(() => Boolean)
  public async logOut(@Ctx() { req, res, prisma }: Context): Promise<boolean> {
    return await LogOutResolver.revokeCookies(req, res, prisma)
  }

  public static async revokeCookies(
    req: FastifyRequest,
    res: FastifyReply,
    prisma: PrismaClient,
  ): Promise<boolean> {
    await LogOutResolver.revokeRefreshCookie(req, res, prisma)

    // Expire the cookie by setting the expiration date to a date in the past
    res.setCookie('__Host-a', '', {
      expires: new Date(1),
    })
    return true
  }

  private static async revokeRefreshCookie(
    req: FastifyRequest,
    res: FastifyReply,
    prisma: PrismaClient,
  ): Promise<boolean> {
    const refreshCookieValue = unsignCookie(req, '__Host-r')

    // Expire the cookie by setting the expiration date to a date in the past
    res.setCookie('__Host-r', '', {
      expires: new Date(1),
    })

    await LogOutResolver.recordArtificiallyExpiredToken(
      refreshCookieValue,
      prisma,
    )

    return true
  }

  private static async recordArtificiallyExpiredToken(
    tokenValue: string,
    prisma: PrismaClient,
  ): Promise<void> {
    let decoded: JwtPayload

    try {
      decoded = jwt.verify(tokenValue, process.env.TOKEN_SECRET!) as JwtPayload
    } catch (error) {
      return
    }

    /* c8 ignore start */
    if (!decoded.exp && process.env.NODE_ENV !== 'production') {
      throw new Error(
        'Implementation error: exp missing from JWT payload. Token does not expire.',
      )
    }
    /* c8 ignore stop */

    const actualExpiration = dayjs.unix(decoded.exp!).toDate()

    await prisma.artificiallyExpiredRefreshToken.create({
      data: {
        value: tokenValue,
        actualExpiration,
      },
    })
  }
}
