import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'
import { Mutation, Resolver, Ctx } from 'type-graphql'

import { User } from '@generated/type-graphql/models/User'
import { ErrorWithProps } from '../../utility/ErrorWithProps'
import { LogOutResolver } from './LogOutResolver'

import type { Context } from '../../types/Context'
import type { FastifyRequest, FastifyReply } from 'fastify'
import type { CookieSerializeOptions } from 'fastify-cookie'
import type { PrismaClient } from '@prisma/client'

@Resolver()
export abstract class RefreshAccessTokenResolver {
  @Mutation(() => User)
  async refreshAccessToken(
    @Ctx() { prisma, req, res }: Context,
  ): Promise<User> {
    const refreshToken = this.unsignCookie(req, res)

    let tokenPayload
    try {
      tokenPayload = jwt.verify(refreshToken, process.env.TOKEN_SECRET!)
    } catch (error) {
      res.status(401)
      throw new ErrorWithProps('Unauthorized - invalid refresh token')
    }

    const user = await prisma.user.findUnique({
      where: {
        id: tokenPayload.id,
      },
    })

    const eligibleUser = await this.determineUserRefreshEligibility(
      user,
      req,
      res,
      prisma,
      refreshToken,
    )

    const accessToken = this.signAccessJWT(eligibleUser)

    this.issueCookie(accessToken, res)

    return eligibleUser
  }

  private unsignCookie(req: FastifyRequest, res: FastifyReply): string | never {
    const refreshCookie: undefined | string = req.cookies['__Host-r']

    if (!refreshCookie) {
      res.status(401)
      throw new ErrorWithProps('Unauthorized - no refresh cookie')
    }

    const unsigned = req.unsignCookie(refreshCookie)

    if (unsigned.valid === false) {
      res.status(401)
      throw new ErrorWithProps('Unauthorized - cookie invalid')
    }

    if (!unsigned.value) {
      res.status(401)
      throw new ErrorWithProps('Unauthorized - cookie invalid')
    }

    return unsigned.value
  }

  private async determineUserRefreshEligibility(
    user: User | null,
    req: FastifyRequest,
    res: FastifyReply,
    prisma: PrismaClient,
    refreshToken: string,
  ): Promise<User> | never {
    if (!user) {
      await LogOutResolver.revokeCookies(req, res, prisma)
      throw new ErrorWithProps('Unauthorized - user not found')
    }

    if (user.banned) {
      await LogOutResolver.revokeCookies(req, res, prisma)
      throw new ErrorWithProps('Unauthorized - banned')
    }

    const isArtificiallyExpired = await this.tokenIsArtificiallyExpired(
      refreshToken,
      prisma,
    )

    if (isArtificiallyExpired) {
      res.clearCookie('__Host-r')
      res.clearCookie('__Host-a')

      throw new ErrorWithProps('Unauthorized - token expired')
    }

    return user
  }

  private async tokenIsArtificiallyExpired(
    refreshToken: string,
    prisma: PrismaClient,
  ): Promise<boolean> {
    return (
      (
        await prisma.artificiallyExpiredRefreshToken.findMany({
          where: {
            value: refreshToken,
          },
        })
      ).length > 0
    )
  }

  private signAccessJWT(user: User) {
    return this.signJWT(user.id, 10)
  }

  private signJWT(id: string, expiresIn: number) {
    return jwt.sign({ id }, process.env.TOKEN_SECRET!, {
      expiresIn,
    })
  }

  private issueCookie(accessToken: string, res: FastifyReply) {
    const options: CookieSerializeOptions = {
      httpOnly: true,
      secure: true,
      path: '/',
      signed: true,
    }

    res.setCookie('__Host-a', accessToken, {
      ...options,
      expires: dayjs().add(10, 'second').toDate(),
    })
  }
}
