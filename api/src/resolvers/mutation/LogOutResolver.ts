import { Ctx, Mutation, Resolver } from 'type-graphql'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dayjs from 'dayjs'

import type { Context } from '../../types/Context'
import type { PrismaClient } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'

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
    res.setCookie('__Host-a', 'expired', {
      expires: new Date(1),
    })
    return true
  }

  private static async revokeRefreshCookie(
    req: FastifyRequest,
    res: FastifyReply,
    prisma: PrismaClient,
  ): Promise<boolean> {
    const refreshCookie: undefined | string = req.cookies['__Host-r']

    if (!refreshCookie) return true

    // Expire the cookie by setting the expiration date to a date in the past
    res.setCookie('__Host-r', 'expired', {
      expires: new Date(1),
    })

    const { value } = req.unsignCookie(refreshCookie)
    if (!value) return true

    await LogOutResolver.recordArtificiallyExpiredToken(value, prisma)

    return true
  }

  private static async recordArtificiallyExpiredToken(
    tokenValue: string,
    prisma: PrismaClient,
  ): Promise<void> {
    let decoded: JwtPayload

    try {
      decoded = jwt.verify(tokenValue, process.env.TOKEN_SECRET!)
    } catch (error) {
      return
    }

    const actualExpiration = dayjs(decoded.exp).toDate()

    console.log({ actualExpiration })

    await prisma.artificiallyExpiredRefreshToken.create({
      data: {
        value: tokenValue,
        actualExpiration,
      },
    })
  }
}
