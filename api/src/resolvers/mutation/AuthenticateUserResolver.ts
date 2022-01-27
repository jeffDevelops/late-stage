import { Mutation, Resolver, Arg, Field, InputType, Ctx } from 'type-graphql'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'
import { ErrorWithProps } from '../../utility/ErrorWithProps'

import { User } from '@generated/type-graphql/models/User'
import type { Context } from '../../types/Context'
import type { PrismaClient } from '@prisma/client'
import type { FastifyReply } from 'fastify'
import type { CookieSerializeOptions } from 'fastify-cookie'

@InputType()
abstract class AuthenticateUserInput implements Partial<User> {
  @Field((_type) => String, { nullable: false })
  email: string

  @Field((_type) => String, { nullable: false })
  password: string
}

@Resolver()
export abstract class AuthenticateUserResolver {
  @Mutation(() => Boolean, { nullable: false })
  async authenticateUser(
    @Arg('AuthenticateUserInput', {
      nullable: false,
      description: 'Authenticate user',
      validate: true,
    })
    { email, password }: AuthenticateUserInput,
    @Ctx() { prisma, res }: Context,
  ): Promise<boolean> {
    const user = await this.getUser(prisma, email)

    /* c8 ignore start */

    /** Not sure this would ever happen - password is not
     * nullable in the database, but Prisma marks it as
     * string | undefined, likely because it is omitted
     * from the SDL schema
     */
    if (!user.password) {
      console.error('Hash undefined')
      throw new ErrorWithProps('An unknown error occurred')
    }
    /* c8 ignore stop */

    await this.comparePasswords(password, user.password)

    const refreshToken = this.signRefreshJWT(user)

    this.issueCookie(refreshToken, res)

    return true
  }

  private async getUser(
    prisma: PrismaClient,
    email: string,
  ): Promise<User> | never {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new ErrorWithProps('Unable to find user with provided credentials.')
    }

    return user
  }

  private async comparePasswords(
    input: string,
    hash: string,
  ): Promise<true> | never {
    const passwordMatches = await bcrypt.compare(input, hash)

    if (!passwordMatches) {
      throw new ErrorWithProps('Unable to find user with provided credentials.')
    }

    return true
  }

  private signRefreshJWT(user: User) {
    return this.signJWT(user.id, 60 * 60 * 24 * 7)
  }

  private signJWT(id: string, expiresIn: number) {
    return jwt.sign({ id }, process.env.TOKEN_SECRET!, {
      expiresIn,
    })
  }

  private issueCookie(refreshToken: string, res: FastifyReply) {
    const options: CookieSerializeOptions = {
      httpOnly: true,
      secure: true,
      path: '/',
      signed: true,
    }

    res.setCookie('__Host-r', refreshToken, {
      ...options,
      expires: dayjs().add(7, 'day').toDate(),
    })
  }
}
