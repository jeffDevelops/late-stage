import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import jwt from 'jsonwebtoken'
import sgMail from '@sendgrid/mail'

import { ErrorWithProps } from '../../utility/ErrorWithProps'
import { InputValidator } from '../../utility/InputValidator'

import { User } from '@generated/type-graphql/models/User'
import type { Context } from '../../types/Context'
import type { PrismaClient } from '@prisma/client'
import type { FastifyRequest } from 'fastify'

@Resolver()
export abstract class SendPasswordResetEmailResolver {
  @Mutation(() => Boolean, { nullable: false })
  async sendPasswordResetEmail(
    @Arg('email', {
      nullable: false,
      description: 'Email address',
      validate: true,
    })
    email: string,

    @Ctx() { req, prisma }: Context,
  ): Promise<boolean> {
    InputValidator.validateEmail(email, req)

    const user = await this.getUser(prisma, email)

    // Don't divulge whether the user exists or not to the client
    if (!user) return true

    const token = await this.issueToken(user.id, prisma)

    await this.sendResetEmail(user, token, req)

    return true
  }

  private async sendResetEmail(
    user: User,
    token: string,
    req: FastifyRequest,
  ): Promise<void> | never {
    try {
      const message = {
        to: user.email,
        from: {
          email: 'letsdothis@late-stage.com',
          name: 'Late-Stage',
        },
        templateId: 'd-6009f5f5ac6647a09201d839baf36207',
        dynamicTemplateData: {
          username: user.username,
          url: `${process.env
            .CORS_ORIGIN!}/password-reset-callback?token=${token}&email=${
            user.email
          }`,
          ipAddress: req.socket.remoteAddress,
        },
        hideWarnings: true,
      }

      sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

      /* c8 ignore start */
      if (process.env.NODE_ENV !== 'test') {
        await sgMail.send(message)
      }
    } catch (error) {
      console.error(error)
      throw new ErrorWithProps('And unknown error occurred')
    }
    /* c8 ignore stop */
  }

  private async issueToken(
    userId: string,
    prisma: PrismaClient,
  ): Promise<string> {
    const token = jwt.sign({ id: userId }, process.env.TOKEN_SECRET!, {
      expiresIn: 60 * 5, // 5 minutes
    })

    /**
     * Make token single-use by saving the token value to the user
     */
    await prisma.user.update({
      where: { id: userId },
      data: {
        passwordResetToken: token,
      },
    })

    return token
  }

  private async getUser(
    prisma: PrismaClient,
    email: string,
  ): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    })
  }
}
