import { Mutation, Resolver, Arg, Field, InputType, Ctx } from 'type-graphql'
import { User } from '@generated/type-graphql/models/User.js'
import bcrypt from 'bcryptjs'
import sgMail from '@sendgrid/mail'

import { ErrorWithProps } from '../../utility/ErrorWithProps'

import { InputValidator } from '../../utility/InputValidator'
import { Context } from '../../types/Context'
import { SendUserConfirmationEmailResolver } from '.'

@InputType()
abstract class UserRegistrationInput implements Partial<User> {
  @Field((_type) => String, { nullable: false })
  username: string

  @Field((_type) => String, { nullable: false })
  email: string

  @Field((_type) => String, { nullable: false })
  password: string
}

@Resolver()
export abstract class RegisterUserResolver {
  @Mutation(() => Boolean, { nullable: true })
  public async registerUser(
    @Arg('UserRegistrationInput', {
      nullable: false,
      description: 'Register a new user',
      validate: true,
    })
    { username, email, password }: UserRegistrationInput,

    @Ctx() context: Context,
  ): Promise<boolean> {
    const { req } = context

    InputValidator.validateUsername(username, req)
    InputValidator.validateEmail(email, req)
    InputValidator.validatePassword(password, req)

    const hash = await this.hashPassword(password)
    await this.createUser({ password: hash, email, username }, context)

    return true
  }

  private async hashPassword(password: string): Promise<string | never> {
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

  private async createUser(
    { password, email, username }: UserRegistrationInput,
    context: Context,
  ): Promise<User | null> {
    try {
      const usernameExists = await context.prisma.user.findUnique({
        where: {
          username,
        },
      })
      if (usernameExists) throw new Error('Username exists')

      const newUser = await context.prisma.user.create({
        data: {
          email,
          username,
          password,

          isAdmin: false,
          emailIsVerified: false,
          banned: false,
          cred: 0,
        },
      })

      await SendUserConfirmationEmailResolver.sendUserConfirmationEmail(
        newUser.email,
        context,
      )

      return newUser
    } catch (error: any) {
      if (error.message === 'Username exists') {
        throw new ErrorWithProps(
          'A user with that username already exists. Please try another.',
        )
      }

      if (
        error.code === 'P2002' && // Prisma unique contraint error code
        error.meta.target.includes('email')
      ) {
        const accountOwner = await context.prisma.user.findUnique({
          where: {
            email,
          },
        })

        /* c8 ignore start */

        /**
         * This isn't likely to ever happen because this db search
         * is triggered when the user exists already
         */
        if (!accountOwner) {
          throw new ErrorWithProps('An unknown error occurred')
        }

        /* c8 ignore stop */
        await this.sendDuplicateRegistrationEmail(accountOwner, context)
      }

      return null
    }
  }

  private async sendDuplicateRegistrationEmail(
    user: User,
    context: Context,
  ): Promise<void> | never {
    const { email, username } = user

    try {
      const message = {
        to: email,
        from: {
          email: 'letsdothis@late-stage.com',
          name: 'Late-Stage',
        },
        templateId: 'd-c4955d96b72a474193a686a53c839ef3',
        dynamicTemplateData: {
          username,
          ipAddress: context.req.socket.remoteAddress,
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
      throw new ErrorWithProps('An unknown error occurred')
    }
    /* c8 ignore stop */
  }
}
