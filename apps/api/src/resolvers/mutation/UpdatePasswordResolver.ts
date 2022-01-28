import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'

import { ErrorWithProps } from '../../utility/ErrorWithProps'
import { InputValidator } from '../../utility/InputValidator'

import { User } from '@generated/type-graphql/models/User'
import type { PrismaClient } from '@prisma/client'
import type { Context } from '../../types/Context'
import type { FastifyReply } from 'fastify'
import type { CookieSerializeOptions } from 'fastify-cookie'

@Resolver()
export abstract class UpdatePasswordResolver {
  @Mutation(() => Boolean, { nullable: false })
  async updatePassword(
    @Arg('email', {
      nullable: false,
      description: 'The email address to verify',
      validate: true,
    })
    email: string,

    @Arg('token', {
      nullable: false,
      description:
        'The JWT encoded for use in the email address confirmation email',
      validate: true,
    })
    token: string,

    @Arg('password', {
      nullable: false,
      description: 'The new password',
      validate: true,
    })
    password: string,

    @Ctx()
    { prisma, req, res }: Context,
  ): Promise<boolean> {
    /**
     * Format validation
     */

    InputValidator.validateEmail(email, req)
    const tokenPayload = InputValidator.verifyJWT(token, req)

    const userToUpdate = await prisma.user.findUnique({
      where: {
        id: tokenPayload.id,
      },
    })

    try {
      this.validateInput(userToUpdate, token, email)
      const user = await this.updateUser(tokenPayload, password, prisma)

      const refreshToken = this.signRefreshJWT(user)
      this.issueCookie(refreshToken, res)

      await this.invalidateSingleUseToken(user, prisma)

      return true
    } catch (error: any) {
      /**
       * If a user can be identified, ensure they can only use this
       * mutation once before going back and having to reissue
       * themselves another token.
       */
      if (userToUpdate) this.invalidateSingleUseToken(userToUpdate, prisma)

      throw new ErrorWithProps(error.message)
    }
  }

  private validateInput(
    userToUpdate: User | null,
    token: string,
    email: string,
  ): void | never {
    if (!userToUpdate) {
      throw new Error(
        `Unable to find user specified in magic link. Was the user deleted recently?`,
      )
    }

    if (!userToUpdate.passwordResetToken) {
      throw new Error('Token in magic link was used already')
    }

    if (userToUpdate.email !== email) {
      throw new Error(
        'User from the provided token and email address do not match.',
      )
    }

    if (token !== userToUpdate.passwordResetToken) {
      throw new Error(
        'Token in magic link does not match the one that was most recently issued',
      )
    }
  }

  private async invalidateSingleUseToken(
    user: User,
    prisma: PrismaClient,
  ): Promise<void> {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordResetToken: null,
      },
    })
  }

  /**
   *
   * @param tokenPayload
   * @param email
   * @param prisma
   *
   * @description Ensure the user from the email address arg and the token
   * payload is one and the same.
   */
  private async updateUser(
    tokenPayload: any,
    password: string,
    prisma: PrismaClient,
  ): Promise<User> {
    // Hash the password
    const hash = await this.hashPassword(password)

    return await prisma.user.update({
      where: {
        id: tokenPayload.id,
      },
      data: {
        // The user has verified their email address within this step, so if they forgot their password prior to verifying, update this field
        emailIsVerified: true,
        password: hash,
      },
    })
  }

  private async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      return hash
      /* c8 ignore start */
    } catch (error) {
      throw new ErrorWithProps(`Password error: ${error}`)
    }
    /* c8 ignore stop */
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
