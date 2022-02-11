import {
  Mutation,
  Resolver,
  UseMiddleware,
  Ctx,
  Authorized,
  Arg,
} from 'type-graphql'
import { User } from '@generated/type-graphql/models/User'
import { CurrentUser } from '../../middleware/CurrentUser'
import { InputValidator } from '../../utility/InputValidator'

import type { Context } from '../../types/Context'
import { ErrorWithProps } from '../../utility/ErrorWithProps'

@Resolver()
export abstract class UpdateEmailAddressResolver {
  @Mutation(() => User)
  @Authorized()
  @UseMiddleware(CurrentUser)
  public async updateEmailAddress(
    @Arg('newEmailAddress') newEmailAddress: string,
    @Ctx() { user, req, prisma }: Context,
  ): Promise<User> {
    InputValidator.validateEmail(newEmailAddress, req)

    /** c8 ignore start */

    /* This condition wouldn't ever happen and is here solely to appease TS */
    if (!user) throw new ErrorWithProps('User not found')

    /** c8 ignore end */

    const newUser = await prisma.user.update({
      where: { id: user.id },
      data: { email: newEmailAddress, emailIsVerified: false },
    })

    return newUser
  }
}
