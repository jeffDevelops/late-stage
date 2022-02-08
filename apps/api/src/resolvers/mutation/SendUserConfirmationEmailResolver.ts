import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import jwt from 'jsonwebtoken'
import sgMail from '@sendgrid/mail'

import { ErrorWithProps } from '../../utility/ErrorWithProps'
import { InputValidator } from '../../utility/InputValidator'

import { User } from '@generated/type-graphql/models/User'
import type { PrismaClient } from '@prisma/client'
import type { Context } from '../../types/Context'

@Resolver()
export abstract class SendUserConfirmationEmailResolver {
  @Mutation(() => Boolean, { nullable: false })
  async sendUserConfirmationEmail(
    @Arg('email', {
      nullable: false,
      description: 'Email address',
      validate: true,
    })
    email: string,

    @Ctx() context: Context,
  ): Promise<boolean> {
    return await SendUserConfirmationEmailResolver.sendUserConfirmationEmail(
      email,
      context,
    )
  }

  public static async sendUserConfirmationEmail(
    email: string,
    { req, prisma }: Context,
  ): Promise<boolean | never> {
    InputValidator.validateEmail(email, req)

    const { id, emailIsVerified } =
      await SendUserConfirmationEmailResolver.getUser(prisma, email)

    if (emailIsVerified) return true

    const token = await SendUserConfirmationEmailResolver.issueToken(id, prisma)

    await this.sendConfirmationEmail(email, token)

    return true
  }

  private static async sendConfirmationEmail(
    email: string,
    token: string,
  ): Promise<void> | never {
    try {
      const message = {
        to: email,
        from: {
          email: 'letsdothis@late-stage.com',
          name: 'Late-Stage',
        },
        templateId: 'd-f3848f33344a403281483d08ad6c346f',
        dynamicTemplateData: {
          url: `${process.env
            .CORS_ORIGIN!}/confirm-user-callback?token=${token}&email=${email}`,
        },
        hideWarnings: true,
      }
      sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

      /* c8 ignore start */
      if (process.env.NODE_ENV !== 'test') {
        await sgMail.send(message)
      }
    } catch (error: any) {
      console.error(error)
      throw new ErrorWithProps('An unknown error occurred')
    }
    /* c8 ignore stop */
  }

  private static async issueToken(
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
      where: {
        id: userId,
      },
      data: {
        magicLinkToken: token,
      },
    })

    return token
  }

  private static async getUser(
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
}
