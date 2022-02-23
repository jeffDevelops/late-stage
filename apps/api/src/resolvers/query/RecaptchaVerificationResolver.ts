import { Resolver, Query, Arg } from 'type-graphql'
import fetch from 'isomorphic-fetch'

import { ErrorWithProps } from '../../utility/ErrorWithProps'

@Resolver()
export abstract class RecaptchaVerificationResolver {
  @Query(() => Boolean)
  async recaptchaVerification(
    @Arg('recaptchaResultToken', { nullable: false })
    recaptchaResultToken: string,
  ): Promise<boolean> {
    try {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify`,
        {
          method: 'POST',
          body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaResultToken}`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )

      const deserialized = await response.json()

      return deserialized.success
    } catch (error) {
      console.error(error)
      throw new ErrorWithProps('An unknown error occurred.')
    }
  }
}
